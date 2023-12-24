"use client";
import { ReactFlowProvider } from "reactflow";
import Loading from "@/components/Loading/Loading";
import { flows } from "@/providers/services/flowsQuery";
import { useDispatch, useSelector } from "react-redux";
import Flow from "@/components/Pages/CreateMindMap/Flow";
import React, { useEffect } from "react";
import FlowTitle from "@/components/Pages/CreateMindMap/FlowTitle";
import { setFlowDetails } from "@/providers/slice/flowsSlice";
import errorImg from '@/assets/images/error/error.png'
import Image from "next/image";
import { handleRevaliDateDetails } from "@/lib/revaliDate"; 

export default function CreateMindMap({ email, data: { status, mindMapDetails } }) {
  const dispatch = useDispatch();
  const flowDetails = useSelector((state) => state.flowsSlice.flowDetails);
  const isLoading = useSelector((state) => state.flowsSlice.isLoading);
  const [editFlow, resultEditFlow] = flows.useEditFlowDataMutation();
  const { 
          isError: isErrorEdit,
          isSuccess: isSuccessEditFlow,
          originalArgs: argsEdit,
          data: dataEdit
         } = resultEditFlow;
         
  useEffect(
    () => {
      if (mindMapDetails !== null) {
        dispatch(setFlowDetails(mindMapDetails));
      } 
    },[
        dispatch,
        mindMapDetails
      ]
  );

  useEffect(
    () => {
      if (isSuccessEditFlow) 
      {
        (async ()=> {
          await handleRevaliDateDetails()
        })()
      }
    },[
        isSuccessEditFlow,
      ]
  )

  if (status > 400)
  {
    return <h1>Error</h1>
  }
  if (
      mindMapDetails === null || 
      (
        mindMapDetails?.userEmail !== email &&
        !mindMapDetails?.isAccessible 
      ) 
    )
  {
    return <div className="w-[700px] mx-auto relative">
      <h1 className="text-5xl absolute bottom-10 translate-x-[-50%] left-[50%] w-[520px]">MindMap không tồn tại!</h1>
      <Image src={errorImg} width={0} height={0} priority alt="error" className="w-full h-auto" />
    </div>
  }
  if (isLoading) 
  {
    return <Loading />
  }
  
  return (
    <div className="max-w-6xl mx-auto py-10 flex flex-col gap-y-5 min-h-[100vh]">
      <ReactFlowProvider>
        <FlowTitle editFlow={editFlow} email={email} />
        <Flow map={flowDetails?.map || []} email={email} />
      </ReactFlowProvider>
    </div>
  );
}
