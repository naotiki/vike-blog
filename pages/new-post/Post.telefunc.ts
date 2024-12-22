import { getContext } from "telefunc";
import * as drizzleQueries from "../../database/drizzle/queries/posts";
export async function onCreatePost({ title, content }: { title: string, content: string }) {
  const {session,db,lucia} = getContext();
  if (!session) {
    return {not_logged_in: true}
  }
  const result = await lucia.validateSession(session.id);
  if (!result) {
    return {not_logged_in: true}
  }
  await drizzleQueries.insertPost(db, title,content, session.userId);
}