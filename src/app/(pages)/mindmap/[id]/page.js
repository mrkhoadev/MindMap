import CreateMindMap from "@/pages/CreateMindMap";
import { getServerSession } from "next-auth";
import React from "react";

export default async function CreateMindMapRoute() {
  const session = await getServerSession()
  return (
    <main>
      <CreateMindMap session={session} />
    </main>
  );
}
