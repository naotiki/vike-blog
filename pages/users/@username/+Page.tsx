import { useData } from "vike-react/useData";
import type { Data } from "./+data";
import { usePageContext } from "vike-react/usePageContext";
import { PostCard } from "@/components/PostCard";

export default function Page() {
  const pageContext = usePageContext();
  const { posts } = useData<Data>();
  return (
    <>
      <h1 className={"font-bold text-3xl pb-4"}>{pageContext.routeParams.username}'s Posts</h1>
      {posts.map((post) => (
        <PostCard post={post} key={post.id} />
      ))}
    </>
  );
}
