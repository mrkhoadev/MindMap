"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { BiHide } from "react-icons/bi";
import { BiShow } from "react-icons/bi";
import { signIn } from "next-auth/react";
import { auth } from "@/providers/services/authQuery";

const formCSS = {
  form: "w-full text-lg flex flex-col gap-y-2",
  title: "text-center text-3xl font-bold text-primary-100",
  inputBox: "relative",
  label: "text-lg font-medium text-primary-100",
  input: "block w-full border-2 rounded-md px-4 py-2.5 mt-1 outline-[#4F46E5]",
  icon: "absolute right-3 bottom-3 text-3xl text-200 select-none",
  link: "text-primary-100 font-medium select-none",
  button:
    "bg-accent-100 text-[#fff] py-2 rounded-md w-full shadow-[0_3px_0px_1px_rgb(61,57,137)] active:shadow-[0_0_0_0] active:mt-1",
};

export default function LoginForm() {
  const [type, setType] = useState("password");
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const [login, result] = auth.useLoginMutation();
  const { isError, isLoading, isSuccess } = result;
  const msgRef = useRef(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = userInfo.email;
    const password = userInfo.password;
    if (password.length > 7) {
      login(userInfo);
    } else {
      msgRef.current.textContent = "Mật khẩu phải tối thiểu 8 ký tự!";
    }
  };
  useEffect(() => {
    if (isError) {
      msgRef.current.textContent = result?.error?.data?.message;
    }
    if (isSuccess) {
      (async () => {
        await signIn("credentials", {
          name: result?.data?.data?.name,
          email: result?.data?.data?.email,
          redirect: true,
        });
      })();
    }
  }, [isError, result, isSuccess]);

  return (
    <form className={formCSS.form} onSubmit={handleSubmit}>
      <h2 className={formCSS.title}>Đăng nhập</h2>
      <div>
        <label htmlFor="email" className={formCSS.label}>
          Tài khoản
        </label>
        <input
          type="email"
          placeholder="Địa Chỉ Email"
          name="email"
          id="email"
          className={formCSS.input}
          onChange={({ target }) =>
            setUserInfo({ ...userInfo, email: target.value })
          }
        />
      </div>
      <div className={`${formCSS.inputBox}`}>
        <label htmlFor="password" className={formCSS.label}>
          Mật khẩu
        </label>
        <input
          type={type}
          placeholder="Mật khẩu"
          name="password"
          id="password"
          className={formCSS.input}
          onChange={({ target }) =>
            setUserInfo({ ...userInfo, password: target.value })
          }
        />
        <span
          className={`${formCSS.icon}`}
          onClick={() => setType(type === "password" ? "text" : "password")}
        >
          {type === "password" ? <BiShow /> : <BiHide />}
        </span>
      </div>
      <span ref={msgRef} className="text-[red]"></span>
      <div>
        <Link href={"/login"} className={`${formCSS.link}`}>
          Quên mật khẩu?
        </Link>
      </div>
      <div className="min-h-[50px]">
        <button className={`${formCSS.button}`} disabled={isLoading}>
          {isLoading ? "Loading..." : "Đăng nhập"}
        </button>
      </div>
    </form>
  );
}
