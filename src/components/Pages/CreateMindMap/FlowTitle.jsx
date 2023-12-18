"use client";
import React from "react";
import { FaShare } from "react-icons/fa";
import { FaSave } from "react-icons/fa";

export default function FlowTitle() {
  return (
    <div className="flex justify-between py-2">
      <div className="min-h-[50px] flex-1 max-w-[90%]">
        <h1
          contentEditable="true"
          className="w-full text-4xl min-h-[50px] break-words outline-none py-2"
        ></h1>
        <p
          className="w-full min-h-[30px] break-words outline-none"
          contentEditable="true"
        ></p>
      </div>
      <div className="w-[140px] flex flex-col items-center justify-items-center gap-y-2">
        <button className="w-full bg-green-600 text-300 px-3 py-1 rounded flex items-center justify-center gap-x-2">
          <FaSave /> Lưu thay đổi
        </button>
        <button className="w-full bg-blue-600 text-300 px-3 py-1 rounded flex items-center justify-center gap-x-2">
          <FaShare /> Chia sẻ
        </button>
      </div>
    </div>
  );
}
