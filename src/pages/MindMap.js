import Checkbox from "@/components/Checkbox/Checkbox";
import Link from "next/link";
import React from "react";

export default function MindMap() {
  return (
    <div className="max-w-7xl mx-auto py-10">
      <div>
        <h1 className="text-4xl font-semibold">Mindmap của tôi</h1>
        <Link
          href={"/mindmap/createmindmap"}
          className="text-300 rounded-lg bg-blue-500 py-2 px-6 mt-3 block w-fit"
        >
          Thêm mới
        </Link>
      </div>
      <div className="mt-8 border-2 border-[#aaa] rounded-md">
        <table className=" w-full">
          <thead className=" border-b-2 border-[#aaa]">
            <tr className="text-left">
              <th className="text-center w-1/7 py-3">
                <Checkbox />
              </th>
              <th className="w-1/2 px-2">TÊN</th>
              <th className="w-1/4 px-2">TẠO LÚC</th>
              <th className="w-1/6 text-center px-2">HÀNH ĐỘNG</th>
            </tr>
          </thead>
          <tbody className="border-b">
            <tr className="text-left">
              <th className="text-center w-1/7 py-3">
                <Checkbox />
              </th>
              <th className="w-1/2 px-2">TÊN</th>
              <th className="w-1/4 px-2">TẠO LÚC</th>
              <th className="w-1/6 text-center px-2">HÀNH ĐỘNG</th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
