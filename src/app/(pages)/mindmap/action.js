"use server";
import { revalidateTag } from "next/cache";

const getMindMap = async (email) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_MY_SERVER_API}/mindmap?userEmail=${email}`, {
        next: {
          tags: "mindmap",
        },
      });
      console.log(1);
      if (response.ok) {
        const data = await response.json();
        revalidateTag(`mindmapDetails`);
        return {
          status: response.status,
          mindMapData: data || []
        }
      }
    } catch(e){
      return { status: 500 }
    }
};

export default getMindMap