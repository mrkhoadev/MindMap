"use client";
import { signIn } from "next-auth/react";
import React from "react";

export default function SingInBtn({ id, name }) {
  return (
    <button
      onClick={() => signIn(id)}
      className="text-primary-100 border-2 border-100 w-full py-2.5 font-medium hover:bg-accent-100 hover:text-300 transition-colors rounded"
    >
      Tiếp tục với {name}
    </button>
  );
}
