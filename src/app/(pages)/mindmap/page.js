import MindMap from "@/pages/MindMap";
import { getServerSession } from "next-auth";
import React from "react";

export default async function MindMapRoute() {
  const session = await getServerSession()
  return (
    <main>
      <MindMap session={session} />
    </main>
  );
}
