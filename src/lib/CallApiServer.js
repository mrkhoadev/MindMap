"use server";

import { revalidateTag } from "next/cache";

const getMindMap = async (email) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_MY_SERVER_API}/mindmap?userEmail=${email}`, {
        next: {
          tags: ["mindmap"],
        },
      });
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


const getMindMapDetails = async (id, email) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_MY_SERVER_API}/mindMap?mindMapId=${id}`, {
        next: {
          tags: ["mindmapDetails"],
        },
      });
      if (response.ok)
      {
        const data = await response.json();
        const details = [...data][0];
        revalidateTag(`mindmap`);
        if (email !== details?.userEmail && !details?.isAccessible)
        {
          return {
            status: 401,
            mindMapDetails: null
          }
        }
        return {
          status: response.status,
          mindMapDetails: details || null,
          isAccountValid: details?.userEmail !== email && details?.isAccessible ? false : true,
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

export { getMindMap, getMindMapDetails }
