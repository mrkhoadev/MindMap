import MindMap from "@/components/Pages/Mindmap/MindMap";
import { getServerSession } from "next-auth";
import React from "react";
import getMindMap from "./action";


export const dynamic = "force-dynamic";

export default async function MindMapRoute() {
  const session = await getServerSession();
  const email = session?.user?.email;
  const data = await getMindMap(email);
  return (
    <main>
      <MindMap session={session} data={data} />
    </main>
  );
}
