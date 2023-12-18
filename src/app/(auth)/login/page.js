import Link from "next/link";
import React from "react";
import LoginForm from "../components/loginForm";

export default function LoginRoute() {
  return (
    <>
      <LoginForm />
      <p className="mt-3">
        Chưa có tài khoản?{" "}
        <Link href={`/register`} className=" text-primary-100 font-bold ml-2">
          Đăng ký
        </Link>
      </p>
      <div>
        <span className="text-[13px] flex flex-row gap-x-3 font-normal my-3 items-center before:flex-1 before:border-b before:block before:w-full before:border-[#000] after:flex-1 after:border-b after:block after:w-full after:border-[#000]">
          HOẶC
        </span>
      </div>
    </>
  );
}
