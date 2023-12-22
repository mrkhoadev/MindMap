"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaShare } from "react-icons/fa";
import SaveFlowBtn from "./SaveFlowBtn";
import { useSelector } from "react-redux";

export default function FlowTitle({ data, editFlow }) {
  const flowDetails = useSelector((state) => state.flowsSlice.flowDetails);
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);

  const [nameText, setNameText]= useState(flowDetails.name);
  const [descriptionText, setDescriptionText] = useState(flowDetails.description);
  
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
  return (
    <div className="flex justify-between py-2">
      <div className="min-h-[50px] flex-1 max-w-[90%]">
        <h1
          ref={nameRef}
          onInput={handleNameInput}
          contentEditable="true"
          className="w-full text-4xl min-h-[50px] break-words outline-none py-2"
        ></h1>
        <p
          ref={descriptionRef}
          onInput={handleDescriptionInput}
          contentEditable="true"
          className="w-full min-h-[30px] break-words outline-none"
        ></p>
      </div>
      <div className="w-[140px] flex flex-col items-center justify-items-center gap-y-2">
        <SaveFlowBtn name={nameText} description={descriptionText} data={data} editFlow={editFlow} />
        <button className="w-full bg-blue-600 text-300 px-3 py-1 rounded flex items-center justify-center gap-x-2">
          <FaShare /> Chia sẻ
        </button>
      </div>
    </div>
  );
}
