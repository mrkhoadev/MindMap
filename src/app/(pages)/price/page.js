import Price from "@/pages/Price";
import React from "react";

export const metadata = {
  title: "Giá",
  description: "Gói cước của chúng tôi",
};

export default function PriceRoute() {
  return (
    <main className="py-[85px]">
      <Price />
    </main>
  );
}
