import React, { useEffect } from "react";
import { BaseEdge, getBezierPath } from "reactflow";

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  selected,
}) {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  style = {
    stroke: selected ? "red" : `#4f46e5`,
    strokeWidth: 3,
  };
  useEffect(() => {}, []);
  return (
    <BaseEdge id={id} path={edgePath} markerEnd={markerEnd} style={style} />
  );
}
