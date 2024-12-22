import type { User } from "lucia";

export type Post = {
  id: string;
  title: string;
  content: string;
  user: {
    id: string;
    username: string;
  }
}

export type PostAbstract = Pick<Post, "id" | "title" | "user">;