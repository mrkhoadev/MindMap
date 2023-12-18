const FlowSelector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  addChildNode: state.addChildNode,
  onNodeDragStop: state.onNodeDragStop,
  onConnect: state.onConnect,
});

export default FlowSelector;
