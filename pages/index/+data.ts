import type { PageContext } from "vike/types"
import * as drizzleQueries from "../../database/drizzle/queries/posts";
export async function data(pageContext:PageContext) {
  const posts = await drizzleQueries.getAllPostAbstracts(pageContext.db)
  return {
    posts
  }
}
export type Data = Awaited<ReturnType<typeof data>>