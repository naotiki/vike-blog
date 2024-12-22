import type { PageContext } from "vike/types"
import * as drizzleQueries from "@/database/drizzle/queries/posts";
import { render } from "vike/abort";
import { getExistingUser } from "@/database/drizzle/queries/lucia-auth";
export async function data(pageContext:PageContext) {
  const username = pageContext.routeParams.username
  const user = await getExistingUser(pageContext.db,username)
  if(!user) {
    throw render(401)
  }
  const posts = await drizzleQueries.getUserPostAbstracts(pageContext.db,user.id)
  return {
    posts
  }
}
export type Data = Awaited<ReturnType<typeof data>>