import CreateMindMap from "@/components/Pages/CreateMindMap/CreateMindMap";
import { htmlScript } from "@/helpers/regex";
import { getMindMapDetails } from "@/lib/CallApiServer";
import { getServerSession } from "next-auth";
import React from "react";
import imgHome from "@/assets/images/pages/home/so-do-tu-duy.webp"


export async function generateMetadata(
  { params }
)
{
  const id = params?.id
  const session = await getServerSession();
  const email = session?.user?.email;
  const data = await getMindMapDetails(id, email);
  const title = data?.mindMapDetails?.name.slice(0, 60).trim();
	const desc = htmlScript(data?.mindMapDetails?.description)
		.replace(/<[^>]*>?/gm, '')
		.replace(/\n/gm, ' ')
		.slice(0, 150)
		.trim();
  return {
    title: title || 'error',
    description: desc,
    openGraph: {
      title: title || 'error',
      description: desc,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_HOST}${imgHome.src}`,
					alt: data?.mindMapDetails?.name.trim(),
        }
      ],
    },
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_HOST}/mindmap/${id}`),
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
