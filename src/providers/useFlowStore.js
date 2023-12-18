import { applyNodeChanges, applyEdgeChanges, addEdge } from "reactflow";

import { createWithEqualityFn } from "zustand/traditional";
import { nanoid } from "nanoid/non-secure";

const useFlowStore = createWithEqualityFn((set, get) => ({
  nodes: [
    {
      id: "root",
      type: "title",
      data: { label: "My Mindmap" },
      position: { x: 0, y: 0 },
    },
  ],
  edges: [],
  onNodesChange: (changes) => {
    const newChanges = changes
      .map((item) => {
        if (item.type === "remove" && item.id === "root") {
          return null;
        }
        return item;
      })
      .filter((c) => c);

    set({
      nodes: applyNodeChanges(newChanges, get().nodes),
    });
  },
  onNodeDragStop: (_, nodes) => {
    set({
      nodes: get().nodes.map((nds) => {
        if (nds.id === nodes) {
          return { ...nds, dragging: false };
        }
        return nds;
      }),
    });
  },
  addChildNode: (parentNode, position) => {
    const newNode = {
      id: nanoid(),
      type: "branch",
      data: { label: `Text ${get().nodes.length}` },
      position,
    };

    const newEdge = {
      id: nanoid(),
      source: parentNode.id,
      target: newNode.id,
      type: "branch",
    };

    set({
      nodes: [...get().nodes, newNode],
      edges: [...get().edges, newEdge],
    });
  },
  updateNodeLabel: (nodeId, text) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          node.data = { ...node.data, label: text };
        }

        return node;
      }),
    });
  },
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (changes) => {
    set({
      edges: addEdge({ ...changes, type: "branch" }, get().edges),
    });
  },
}));

export default useFlowStore;
