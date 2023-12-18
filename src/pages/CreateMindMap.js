"use client";
import Flow from "@/components/Pages/CreateMindMap/Flow";
import FlowTitle from "@/components/Pages/CreateMindMap/FlowTitle";
import React from "react";

export default function CreateMindMap() {
  return (
    <div className="max-w-7xl mx-auto py-10 flex flex-col gap-y-5">
      <FlowTitle />
      <Flow />
    </div>
  );
}
