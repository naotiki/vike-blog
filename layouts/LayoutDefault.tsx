import "./style.css";

import "./tailwind.css";

import type React from "react";
import logoUrl from "../assets/logo.svg";
import { Link } from "../components/Link.js";
import { usePageContext } from "vike-react/usePageContext";
import { navigate } from "vike/client/router";

export default function LayoutDefault({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = usePageContext();
  return (
    <div className={"flex max-w-5xl m-auto"}>
      <Sidebar>
        <Logo />
        <Link href="/">View Posts</Link>
        {user ? (
          <>
            <Link href="/new-post">New Post</Link>
            <Link href="/users/me">My Page</Link>
            <hr/>
            {user.username}
            <button
              type="button"
              className="text-left"
              onClick={async () => {
                await fetch("/api/logout", { method: "POST" });
                navigate("/");
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </Sidebar>
      <Content>{children}</Content>
    </div>
  );
}

function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <div
      id="sidebar"
      className={"p-5 flex flex-col shrink-0 border-r-2 border-r-gray-200"}
    >
      {children}
    </div>
  );
}

function Content({ children }: { children: React.ReactNode }) {
  return (
    <div id="page-container">
      <div id="page-content" className={"p-5 pb-12 min-h-screen"}>
        {children}
      </div>
    </div>
  );
}

function Logo() {
  return (
    <div className={"p-5 mb-2"}>
      <a href="/">
        <img src={logoUrl} height={64} width={64} alt="logo" />
      </a>
    </div>
  );
}
