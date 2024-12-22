import { useData } from "vike-react/useData";
import type { Data } from "./+data";
import {
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Link } from "@/components/Link";

export default function Page() {
  const { posts } = useData<Data>();
  return (
    <>
      <h1 className={"font-bold text-3xl pb-4"}>My Vike app</h1>
      {posts.map((post) => (
        <Link href={`/posts/${post.id}`} key={post.id}>
          <Card className="hover:bg-gray-100 hover:underline">
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
            </CardHeader>
            <CardFooter>
              <p>{post.user.username}</p>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </>
  );
}
