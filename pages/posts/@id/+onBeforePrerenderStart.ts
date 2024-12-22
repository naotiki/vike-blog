import { dbSqlite } from "@/database/drizzle/db";
import * as drizzleQueries from "@/database/drizzle/queries/posts";
import type { OnBeforePrerenderStartAsync } from "vike/types";
export async function onBeforePrerenderStart(): ReturnType<OnBeforePrerenderStartAsync> {
  const db = dbSqlite();
  const posts = await drizzleQueries.getAllPostAbstracts(db)
  return await Promise.all(posts.map(async post => ({
    url: `/posts/${post.id}`,
    pageContext: {
      data: {
        post: await drizzleQueries.getPost(db, post.id)
      }
    }
  })))
}