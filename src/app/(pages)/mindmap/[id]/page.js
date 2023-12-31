import CreateMindMap from "@/components/Pages/CreateMindMap/CreateMindMap";
import { getMindMapDetails } from "@/lib/CallApiServer";
import { getServerSession } from "next-auth";
import React from "react";

export async function generateMetadata(
  { params },
  parent
)
{
  const id = params?.id
  const session = await getServerSession();
  const email = session?.user?.email;
  const data = await getMindMapDetails(id, email);
  const previousImages = (await parent).openGraph?.images || []
  return {
    title: data?.mindMapDetails?.name || 'error',
    openGraph: {
      images: ['/so-do-tu-duy.webp', ...previousImages],
    },
  }
}
 

export default async function CreateMindMapRoute({ params: { id }, parent }) {
  const session = await getServerSession();
  const email = session?.user?.email;
  const data = await getMindMapDetails(id, email);
  
  return (
    <main>
      <CreateMindMap email={email} data={data} />
    </main>
  );
}
