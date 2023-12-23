import Link from "next/link";
import React from "react";
import RegisterForm from "../../../components/Auth/RegisterForm";

export default function RegisterRoute() {
  return (
    <>
      <RegisterForm />
      <p className="mt-3">
        Bạn đã có tài khoản?{" "}
        <Link href={`/login`} className=" text-primary-100 font-bold ml-2">
          Đăng nhập
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
