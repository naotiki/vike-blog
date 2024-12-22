import { dbSqlite } from "@/database/drizzle/db";
import * as drizzleQueries from "@/database/drizzle/queries/lucia-auth";
import { getUserPostAbstracts } from "@/database/drizzle/queries/posts";
import type { OnBeforePrerenderStartAsync } from "vike/types";
export async function onBeforePrerenderStart(): ReturnType<OnBeforePrerenderStartAsync> { 
  const db = dbSqlite();
  const users = await drizzleQueries.getAllUsers(db)
  return await Promise.all(users.map(async user => ({
    url: `/users/${user.username}`,
    pageContext: {
      data:{
        posts: await getUserPostAbstracts(db, user.id)
      }
    }
  })))
}