import Link from "next/link";
import React from "react";

export default function NotFoundDummy() {
  return (
    <>
      <h1>404</h1>
      <Link href={"/"}>Home</Link>
    </>
  );
}
