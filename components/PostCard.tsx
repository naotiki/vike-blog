import type { PostAbstract } from "@/model/post";
import { Link } from "./Link";
import { Card, CardHeader, CardTitle, CardFooter } from "./ui/card";

export function PostCard({ post }: { post: PostAbstract }) {
  return (
    <Card>
      <CardHeader>
        <Link href={`/posts/${post.id}`}>
          <CardTitle className="hover:underline">{post.title}</CardTitle>
        </Link>
      </CardHeader>
      <CardFooter>
        <p>
          by{" "}
          <Link
            href={`/users/${post.user.username}`}
            className="text-blue-400 hover:underline"
          >
            {post.user.username}
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
