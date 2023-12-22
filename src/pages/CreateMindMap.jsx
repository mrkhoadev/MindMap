"use client";
import { ReactFlowProvider } from "reactflow";
import { usePathname } from "next/navigation";
import Loading from "@/components/Loading/Loading";
import { flows } from "@/providers/services/flows";
import { useDispatch, useSelector } from "react-redux";
import Flow from "@/components/Pages/CreateMindMap/Flow";
import React, { useEffect, useRef, useState } from "react";
import FlowTitle from "@/components/Pages/CreateMindMap/FlowTitle";
import { setFlowDetails, setIsLoading } from "@/providers/slice/flowsSlice";

export default function CreateMindMap({ session }) {

  const pathname = usePathname();
  const asyncRef = useRef(true)

  const dispatch = useDispatch();

  const newFlowData = useSelector((state) => state.flowsSlice.newFlowData);
  const flowDetails = useSelector((state) => state.flowsSlice.flowDetails);
  const isLoading = useSelector((state) => state.flowsSlice.isLoading);

  const [getMindMapDetails, resultMindMapDetails] = flows.useLazyGetMindMapDetailsQuery();
  const [editFlow, resultEditFlow] = flows.useEditFlowDataMutation();
  
  useEffect(
    () => {
        if (pathname.startsWith('/mindmap/')) 
        {
          const mindMapId = pathname.split("/")[2] || '';
          getMindMapDetails(mindMapId);
        }
      },[ pathname ]
  );

  useEffect(
    () => {
      if (resultMindMapDetails.isSuccess) {
        const getFlowDetails = resultMindMapDetails?.data[0];
        if (getFlowDetails) {
          dispatch(setFlowDetails(getFlowDetails));
        } else {
          //not-found
        }
      }
    },[
        pathname,
        resultMindMapDetails
      ]
  );

  useEffect(
    () => {
      if (newFlowData && asyncRef.current) {
        patchFlowData(newFlowData);
        asyncRef.current = false;
      }
    },[
        dispatch, 
        newFlowData, 
      ]
  );
 
  if (isLoading) 
  {
    return <Loading />
  }
  
  return (
    <div className="max-w-6xl mx-auto py-10 flex flex-col gap-y-5 min-h-[100vh]">
      <ReactFlowProvider>
        <FlowTitle data={resultMindMapDetails?.data[0] || {}} editFlow={editFlow} />
        <Flow map={flowDetails?.map || []} />
      </ReactFlowProvider>
    </div>
  );
}
