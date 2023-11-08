import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { cls } from "../lib/client/utils";
import nobg from "../image/nobg.png";
import Image from "next/image";

interface LayoutProps {
  title?: string;
  canGoBack?: boolean;
  hasTabBar?: boolean;
  children: React.ReactNode;
}

export default function Layout({
  title,
  canGoBack,
  hasTabBar,
  children,
}: LayoutProps) {
  const router = useRouter();
  const onClick = () => {
    router.back();
  };
  return (
    <div>
      <div className=" w-full h-12 max-w-xl  text-lg  font-medium  fixed text-gray-800 top-0 z-50">
        {canGoBack ? (
          <button onClick={onClick} className="absolute left-4">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
          </button>
        ) : null}
        {title ? (
          <div className="flex items-center justify-center ">
            <div className="py-4">
              <Image src={nobg} alt="logo" width={200} height={100} />
            </div>
            {/* <span className={cls(canGoBack ? "w-[120px] h-[40px]" : "", "")}>
              {title}
            </span> */}
          </div>
        ) : null}
      </div>
      <div className={cls("pt-12", hasTabBar ? "pb-24" : "")}>{children}</div>
      {hasTabBar ? (
        <nav className=" max-w-xl transition-colors shadow-lg rounded-2xl hover:bg-white hover:opacity-80 hover:text-black text-gray-700  fixed bottom-0 w-full px-10 pb-5 pt-3 flex justify-between text-xs">
          <Link href="/" legacyBehavior>
            <a
              className={cls(
                "flex flex-col items-center space-y-2 ",
                router.pathname === "/"
                  ? "text-sky-500"
                  : "hover:text-gray-500 transition-colors"
              )}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                ></path>
              </svg>
              <span>홈</span>
            </a>
          </Link>
          <Link legacyBehavior href="/tweet/upload">
            <a
              className={cls(
                "flex flex-col items-center space-y-2 ",
                router.pathname === "/tweet/upload"
                  ? "text-sky-500"
                  : "hover:text-gray-500 transition-colors"
              )}
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <span>업로드</span>
            </a>
          </Link>
          <Link legacyBehavior href="/profile">
            <a
              className={cls(
                "flex flex-col items-center space-y-2 ",
                router.pathname === "/profile"
                  ? "text-sky-500"
                  : "hover:text-gray-500 transition-colors"
              )}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                ></path>
              </svg>
              <span>프로필</span>
            </a>
          </Link>
        </nav>
      ) : null}
    </div>
  );
}
