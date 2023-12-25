"use client";
import React, { useEffect, useRef, useState } from "react";
import EditBtn from "./EditBtn";
import { useSelector } from "react-redux";
import ShareBtn from "./ShareBtn";
import ShareForm from "@/components/Pages/CreateMindMap/ShareForm";
import { htmlScript } from "@/helpers/regex";

export default function FlowTitle({ editFlow, isAccountValid }) {
  const flowDetails = useSelector((state) => state.flowsSlice.flowDetails);
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const [isShowForm, setShowForm] = useState(false);

  const [nameText, setNameText] = useState(htmlScript(flowDetails.name));
  const [descriptionText, setDescriptionText] = useState(htmlScript(flowDetails.description));
  
  const handleNameInput = () => {
    setNameText(nameRef.current.textContent);
  }
  const handleDescriptionInput = () => {
    setDescriptionText(descriptionRef.current.textContent)
  }
  useEffect(
    () => {
      if (
            flowDetails && 
            nameRef.current && 
            descriptionRef.current
          )
          {
            nameRef.current.textContent = flowDetails.name || '';
            descriptionRef.current.textContent = flowDetails.description || '';
          }
    },[
        nameRef, 
        flowDetails,
        descriptionRef
      ]
  )
  useEffect(
    () => {
      setNameText(flowDetails.name);
      setDescriptionText(flowDetails.description);
    },[
        setNameText,
        setDescriptionText,
        flowDetails.name,
        flowDetails.description
      ]
  )
  return (
    <div className="flex justify-between py-2">
      <div className="min-h-[50px] flex-1 max-w-[90%]">
        <h1
          ref={nameRef}
          onInput={handleNameInput}
          contentEditable={isAccountValid}
          className="w-full text-4xl min-h-[50px] break-words outline-none py-2"
        ></h1>
        <p
          ref={descriptionRef}
          onInput={handleDescriptionInput}
          contentEditable={isAccountValid}
          className="w-full min-h-[30px] break-words outline-none"
        ></p>
      </div>
      <div className="w-[140px] flex flex-col items-center justify-center gap-y-2">
        <EditBtn 
          name={nameText} 
          editFlow={editFlow} 
          description={descriptionText} 
          isAccountValid={isAccountValid}
        />
        <ShareBtn
          onFormActiveChange={setShowForm} 
        />
      </div>
      <ShareForm 
        isAccountValid={isAccountValid}
        isShowForm={isShowForm}
        onFormActiveChange={setShowForm} 
        editFlow={editFlow}
        name={nameText}
        description={descriptionText}
      />
    </div>
  );
}
