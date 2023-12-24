import CreateMindMap from "@/components/Pages/CreateMindMap/CreateMindMap";
import { getMindMapDetails } from "@/lib/CallApiServer";
import { getServerSession } from "next-auth";
import React from "react";


export const dynamic = "force-dynamic";

export default async function CreateMindMapRoute({ params: { id }, ...props }) {
  const session = await getServerSession();
  const email = session?.user?.email;
  const data = await getMindMapDetails(id);
  
  return (
    <main>
      <CreateMindMap email={email} data={data} />
    </main>
  );
}
