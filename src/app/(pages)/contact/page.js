import Contact from "@/pages/Contact";
import React from "react";

export const metadata = {
  title: "Liên hệ",
  description: "Liên hệ với chúng tôi",
};

export default function ContactRoute() {
  return (
    <main className="py-[85px]">
      <Contact />
    </main>
  );
}
