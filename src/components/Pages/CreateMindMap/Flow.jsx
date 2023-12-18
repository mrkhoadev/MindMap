"use client";
import ReactFlow, {
  Controls,
  Background,
  BackgroundVariant,
  MiniMap,
  useStoreApi,
  useReactFlow,
  ConnectionLineType,
} from "reactflow";
import "reactflow/dist/style.css";
import { useCallback, useRef } from "react";
import CustomNode from "./CustomNode";
import CustomEdge from "./CustomEdge";
import useFlowStore from "@/providers/useFlowStore";
import { shallow } from "zustand/shallow";
import nodeColor from "@/helpers/MiniMap";
import FlowSelector from "@/providers/selectors/FlowSelector";

const nodeTypes = { branch: CustomNode, title: CustomNode };
const edgeTypes = {
  branch: CustomEdge,
};
const nodeOrigin = [0.5, 0.5];
const connectionLineStyle = {
  stroke: "#4f46e5",
  strokeWidth: 3,
};

function Flow() {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    addChildNode,
    onNodeDragStop,
    onConnect,
  } = useFlowStore(FlowSelector, shallow);
  const connectingNodeId = useRef(null);
  const { screenToFlowPosition } = useReactFlow();
  const getChildNodePosition = (event, parentNode) => {
    const { domNode } = store.getState();

    if (
      !domNode ||
      !parentNode?.positionAbsolute ||
      !parentNode?.width ||
      !parentNode?.height
    ) {
      return;
    }

    const panePosition = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    return {
      x: panePosition.x,
      y: panePosition.y,
    };
  };
  const onConnectStart = useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId;
  }, []);

  const store = useStoreApi();
  const onConnectEnd = useCallback(
    (event) => {
      const { nodeInternals } = store.getState();
      const targetIsPane = event.target.classList.contains("react-flow__pane");
      const node = event.target.closest(".react-flow__node");

      if (node) {
        node.querySelector(".input-flow")?.focus({ preventScroll: true });
      } else if (targetIsPane && connectingNodeId.current) {
        const parentNode = nodeInternals.get(connectingNodeId.current);
        const childNodePosition = getChildNodePosition(event, parentNode);
        if (parentNode && childNodePosition) {
          addChildNode(parentNode, childNodePosition);
        }
      }
    },
    [getChildNodePosition]
  );

  return (
    <div className="h-[700px] border-2 border-100">
      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onNodeDragStop={onNodeDragStop}
        edges={edges}
        edgeTypes={edgeTypes}
        onEdgesChange={onEdgesChange}
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
        connectionLineStyle={connectionLineStyle} //style add drag
        connectionLineType={ConnectionLineType.SimpleBezier} // chọn type khi kéo
        nodeOrigin={nodeOrigin}
        onConnect={onConnect} // kết nối
        fitView
        deleteKeyCode={["Delete", "Backspace"]}
      >
        <Background
          gap={10}
          color="#f1f1f1"
          variant={BackgroundVariant.Lines}
        />
        <MiniMap nodeStrokeWidth={3} pannable zoomable nodeColor={nodeColor} />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Flow;
