import type { PageContext } from "vike/types"
import * as drizzleQueries from "@/database/drizzle/queries/posts";
import { render } from "vike/abort";
export async function data(pageContext:PageContext) {
  const post = await drizzleQueries.getPost(pageContext.db,Number.parseInt(pageContext.routeParams.id))
  if(!post) {
    throw render(404)
  }
  return {
    post
  }
}
export type Data = Awaited<ReturnType<typeof data>>