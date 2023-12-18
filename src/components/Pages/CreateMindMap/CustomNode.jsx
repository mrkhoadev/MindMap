"use client";
import useFlowStore from "@/providers/useFlowStore";
import { useEffect, useRef, useState } from "react";
import { Handle, Position } from "reactflow";

const handleStyle = {
  background: "#4f46e5",
  width: "20px",
  height: "10px",
  borderRadius: "0",
  borderRadius: "3px",
  zIndex: "1000",
};

function CustomNode({ data, isConnectable, type, id, selected, ...props }) {
  const updateNodeLabel = useFlowStore((state) => state.updateNodeLabel);
  const textRef = useRef(null);
  const [isClick, setIsClick] = useState(false);
  const inputRef = useRef(null);

  const handleInput = () => {
    textRef.current = inputRef.current.textContent;
  };
  useEffect(() => {
    if (!isClick && textRef.current && textRef.current !== data.label) {
      updateNodeLabel(id, textRef.current.trim());
      textRef.current = null;
    }
    if (isClick && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isClick]);
  useEffect(() => {
    inputRef.current.textContent = data?.label || "";
    textRef.current = data?.label;
  }, [data]);
  return (
    <div
      className={`px-2 py-2 rounded shadow-[0_0_10px_3px_rgba(0,0,0,0.1)] border border-[#fff] max-w-[500px]${
        !selected ? " bg-[#8bc34a]" : " bg-[#bfc34a]"
      }`}
      onDoubleClick={() => setIsClick(true)}
      onBlur={(e) => {
        setIsClick(false);
      }}
    >
      {type === "branch" && (
        <Handle
          type="target"
          position={Position.Top}
          isConnectable={isConnectable}
          style={handleStyle}
        />
      )}
      <div
        ref={inputRef}
        className={`input-flow outline-none text-[#fff] min-w-[200px] min-h-[2.1rem] text-center border break-words p-1 rounded bg-inherit${
          isClick
            ? " nodrag border-[#fff]"
            : " border-transparent pointer-events-none"
        }`}
        onKeyDown={(e) => {
          if (isClick && e.code === "Enter") {
            setIsClick(false);
          }
        }}
        contentEditable={`${isClick}`}
        tabIndex={0}
        onInput={handleInput}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id={id}
        isConnectable={isConnectable}
        style={handleStyle}
      />
    </div>
  );
}

export default CustomNode;
