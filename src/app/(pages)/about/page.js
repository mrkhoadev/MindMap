import About from "@/pages/About";
import React from "react";

export const metadata = {
  title: "Về chúng tôi",
  description: "Thông tin về chúng tôi",
};

export default function AboutRoute() {
  return (
    <main className="pb-3">
      <About />
    </main>
  );
}
