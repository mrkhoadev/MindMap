import CreateMindMap from "@/components/Pages/CreateMindMap/CreateMindMap";
import { getServerSession } from "next-auth";
import React from "react";

const getMindMapDetails = async (id) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_MY_SERVER_API}/mindMap?mindMapId=${id}`, {
      next: {
        tags: "mindmapDetails",
      },
    });
    if (response.ok)
    {
      const data = await response.json();
      const details = [...data]
      return {
        status: response.status,
        mindMapDetails: details[0] || null
      }
    }
    return {
      status: response.status,
      mindMapDetails: null
    }
  } catch(e) {
    return { status: 500 }
  }
  
};
export const dynamic = "force-dynamic";

export default async function CreateMindMapRoute({ params: { id } }) {
  const session = await getServerSession();
  const email = session?.user?.email;
  const data = await getMindMapDetails(id);
  
  return (
    <main>
      <CreateMindMap email={email} data={data} />
    </main>
  );
}
