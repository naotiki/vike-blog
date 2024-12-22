import { eq } from "drizzle-orm";
import type { dbSqlite } from "../db";
import { userTable } from "../schema/lucia-auth";
import { postTable } from "../schema/posts";
import type { Post, PostAbstract } from "@/model/post";

export function insertPost(db: ReturnType<typeof dbSqlite>, title: string, content: string, userId: string) {
  return db.insert(postTable).values({ title, content, userId });
}

export function getPost(db: ReturnType<typeof dbSqlite>, id: number) {
  return db.select(
    {
      id: postTable.id,
      title: postTable.title,
      content: postTable.content,
      user: {
        id: userTable.id,
        username: userTable.username,
      },
    } satisfies Record<keyof Post, unknown>
  ).from(postTable).where(eq(postTable.id, id)).innerJoin(userTable, eq(postTable.userId, userTable.id),).get();
}

export function getAllPostAbstracts(db: ReturnType<typeof dbSqlite>) {
  return db.select(
    {
      id: postTable.id,
      title: postTable.title,
      user: {
        id: userTable.id,
        username: userTable.username,
      },
    } satisfies Record<keyof PostAbstract, unknown>
  ).from(postTable).innerJoin(userTable, eq(postTable.userId, userTable.id),).all();
}

export function getUserPostAbstracts(db: ReturnType<typeof dbSqlite>, userId: string) {
  return db.select(
    {
      id: postTable.id,
      title: postTable.title,
      user: {
        id: userTable.id,
        username: userTable.username,
      },
    } satisfies Record<keyof PostAbstract, unknown>
  ).from(postTable).where(eq(postTable.userId, userId)).innerJoin(userTable, eq(postTable.userId, userTable.id),).all();
}