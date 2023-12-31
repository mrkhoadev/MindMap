import React from "react";
import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import { getServerSession } from "next-auth";

export default async function layout({ children }) {
  const session = await getServerSession();
  return (
    <>
      <Header session={session} />
      {children}
      <Footer />
    </>
  );
}
