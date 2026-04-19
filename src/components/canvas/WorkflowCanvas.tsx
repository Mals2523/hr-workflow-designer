import { useCallback, DragEvent, MouseEvent as ReactMouseEvent } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  addEdge,
  type Connection,
  type Edge,
  BackgroundVariant,
  type Node,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useWorkflowStore } from '../../store/workflowStore';
import { nodeTypes } from '../nodes';

export default function WorkflowCanvas() {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    setEdges,
    setSelectedNode,
    addNode,
  } = useWorkflowStore();

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onNodeClick = useCallback(
    (_: ReactMouseEvent, node: Node) => {
      setSelectedNode(node.id);
    },
    [setSelectedNode],
  );

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, [setSelectedNode]);

  const onDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      if (typeof type === 'undefined' || !type) {
        return;
      }

      // Note: We use clientX/clientY for a placeholder position for now
      // It should ideally be translated using reactFlowInstance.screenToFlowPosition
      const position = {
        x: event.clientX,
        y: event.clientY,
      };

      const newNode: Node = {
        id: crypto.randomUUID(),
        type,
        position,
        data: { label: `${type} node` },
      };

      addNode(newNode);
    },
    [addNode],
  );

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        onDragOver={onDragOver}
        onDrop={onDrop}
        fitView
        className="bg-gray-950"
      >
        <MiniMap
          nodeStrokeColor={(n) => {
            if (n.type === 'input') return '#0041d0';
            if (n.type === 'output') return '#ff0072';
            return '#1a192b';
          }}
          nodeColor={(n) => {
            if (n.type === 'input') return '#0041d0';
            return '#fff';
          }}
          nodeBorderRadius={2}
        />
        <Controls />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} color="#4b5563" />
      </ReactFlow>
    </div>
  );
}
