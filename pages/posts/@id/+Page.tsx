import { useData } from "vike-react/useData";
import type { Data } from "./+data";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link } from "@/components/Link";
export default function Page() {
  const { post } = useData<Data>();
  return (
    <>
      <h1 className="text-5xl">{post.title}</h1>
      <h2 className="text-xl">
        by{" "}
        <Link
          href={`/users/${post.user.username}`}
          className="text-blue-400 hover:underline"
        >
          {post.user.username}
        </Link>
      </h2>
      <hr className="my-5" />
      <Markdown className={"prose max-w-none"} remarkPlugins={[remarkGfm]}>
        {post.content}
      </Markdown>
    </>
  );
}
