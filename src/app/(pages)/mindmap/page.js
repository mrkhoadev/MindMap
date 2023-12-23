import MindMap from "@/components/Pages/Mindmap/MindMap";
import { getServerSession } from "next-auth";
import React from "react";

const getMindMap = async (email) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_MY_SERVER_API}/mindmap?userEmail=${email}`, {
      next: {
        tags: "mindmap",
      },
    });
    if (response.ok) {
      const data = await response.json();
      return {
        status: response.status,
        mindMapData: data || []
      }
    }
  } catch(e){
    return { status: 500 }
  }
};
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
