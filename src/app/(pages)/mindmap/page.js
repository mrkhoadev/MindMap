import MindMap from "@/components/Pages/Mindmap/MindMap";
import { getMindMap } from "@/lib/CallApiServer";
import { getServerSession } from "next-auth";
import React from "react";
import { logging } from "../../../../next.config";

export default async function MindMapRoute() {
  const session = await getServerSession();
  const email = session?.user?.email;
  const data = await getMindMap(email);
  console.log(data);
  return (
    <main className="min-h-[100vh]">
      <MindMap session={session} data={data} />
    </main>
  );
}
