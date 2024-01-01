import MindMap from "@/components/Pages/Mindmap/MindMap";
import { getMindMap } from "@/lib/CallApiServer";
import { getServerSession } from "next-auth";
import React from "react";

export const metadata = {
  title: "MindMap của tôi",
  description: "Danh sách sơ đồ tư duy"
}

export default async function MindMapRoute() {
  const session = await getServerSession();
  const email = session?.user?.email;
  const data = await getMindMap(email);
  return (
    <main className="min-h-[100vh]">
      <MindMap session={session} data={data} />
    </main>
  );
}
