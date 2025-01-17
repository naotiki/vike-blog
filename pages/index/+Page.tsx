import { useData } from "vike-react/useData";
import type { Data } from "./+data";
import { PostCard } from "@/components/PostCard";

export default function Page() {
  const { posts } = useData<Data>();
  return (
    <>
      <h1 className={"font-bold text-3xl pb-4"}>All Posts</h1>
      {posts.map((post) => (
        <PostCard post={post} key={post.id} />
      ))}
    </>
  );
}
