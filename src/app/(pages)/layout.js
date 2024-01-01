import React from "react";
import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import { getServerSession } from "next-auth";
import imgHome from "@/assets/images/pages/home/so-do-tu-duy.webp"

export const metadata = {
  title: "Mindmap Flow",
  description: "Mindmap Flow - Công cụ xây dựng sơ đồ tư duy mạnh mẽ",
  images: [`${process.env.NEXT_PUBLIC_HOST}${imgHome.src}`]
};

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
