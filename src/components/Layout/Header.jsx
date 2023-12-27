"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";

const headerCSS = {
  header: "",
  container: "",
  logo: "",
  logoLink: "",
  nav: "",
  navList: "",
  listItem: "",
  itemLink: "px-4 py-2 block rounded-md transition-colors border",
};
const activeClass = "text-[#fff] bg-accent-100 border-[#4F46E5]";
const inactiveClass = "text-200 hover:bg-accent-200 border-transparent";

export default function Header({ session }) {
  const pathname = usePathname();
  const pageName = pathname.split("/")[1];
  return (
    <header className={`bg-white`}>
      <div
        className={`container max-w-7xl xl:mx-auto flex items-center justify-between py-4`}
      >
        <div className={``}>
          <Link href={"/"} className={`text-primary-100 font-bold text-xl`}>
            Mindmap Flow
          </Link>
        </div>
        <nav className="">
          <ul className={`flex gap-x-2.5`}>
            <li>
              <Link
                href={`/`}
                className={`${headerCSS.itemLink} ${
                  !pageName ? activeClass : inactiveClass
                }`}
              >
                Trang chủ
              </Link>
            </li>
            <li>
              <Link
                href={`/about`}
                className={`${headerCSS.itemLink} ${
                  pageName === "about" ? activeClass : inactiveClass
                }`}
              >
                Giới thiệu
              </Link>
            </li>
            <li>
              <Link
                href={`/features`}
                className={`${headerCSS.itemLink} ${
                  pageName === "features" ? activeClass : inactiveClass
                } border-acc`}
              >
                Tính năng
              </Link>
            </li>
            <li>
              <Link
                href={`/price`}
                className={`${headerCSS.itemLink} ${
                  pageName === "price" ? activeClass : inactiveClass
                }`}
              >
                Bảng giá
              </Link>
            </li>
            <li>
              <Link
                href={`/contact`}
                className={`${headerCSS.itemLink} ${
                  pageName === "contact" ? activeClass : inactiveClass
                }`}
              >
                Liên hệ
              </Link>
            </li>
            {!session ? (
              <>
                <li>
                  <Link
                    href={`/login`}
                    className={`${headerCSS.itemLink} text-primary-100 hover:bg-accent-300 border border-[transparent]`}
                  >
                    Đăng nhập
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/register`}
                    className={`${headerCSS.itemLink} border-100 border text-primary-100 hover:bg-accent-100 hover:text-[#fff]`}
                  >
                    Đăng ký
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    href={`#`}
                    className={`${headerCSS.itemLink} text-primary-100 hover:bg-accent-300 border border-[transparent] max-w-[200px]`}
                  >
                    Hi, {session.user.name}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/mindmap`}
                    className={`${headerCSS.itemLink} ${pageName === "mindmap" ? activeClass : "text-primary-100 hover:bg-accent-300 border border-[transparent]"}`}
                  >
                    Mindmap
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => signOut()}
                    className={`${headerCSS.itemLink} border-100 border text-primary-100 hover:bg-accent-100 hover:text-[#fff]`}
                  >
                    Đăng xuất
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
