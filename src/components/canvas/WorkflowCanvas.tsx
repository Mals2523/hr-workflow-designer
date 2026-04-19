import { useCallback, useRef, useEffect } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
  type Node,
  type ReactFlowInstance,
} from "reactflow";
import "reactflow/dist/style.css";

import { useWorkflowStore } from "../../store/workflowStore";
import { nodeTypes } from "../nodes";
import { validateWorkflow } from "../../utils/workflowValidator";

const defaultData: Record<string, object> = {
  start: { type: "start", title: "Start", metadata: {} },
  task: {
    type: "task",
    title: "New Task",
    description: "",
    assignee: "",
    dueDate: "",
    customFields: {},
  },
  approval: {
    type: "approval",
    title: "Approval",
    approverRole: "Manager",
    autoApproveThreshold: 0,
  },
  automated: {
    type: "automated",
    title: "Automated Step",
    actionId: "",
    actionParams: {},
  },
  end: { type: "end", endMessage: "Done", showSummary: false },
};

export default function WorkflowCanvas() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const reactFlowInstance = useRef<ReactFlowInstance | null>(null);

  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    setSelectedNodeId,
    addNode,
    validationErrors,
    setValidationErrors,
  } = useWorkflowStore();

  // ✅ VALIDATION EFFECT
  useEffect(() => {
    const result = validateWorkflow(nodes, edges);

    const errorMap: Record<string, string> = {};
    result.errors.forEach((e) => {
      if (e.nodeId) errorMap[e.nodeId] = e.message;
    });

    setValidationErrors(errorMap);
  }, [nodes, edges, setValidationErrors]);

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      setSelectedNodeId(node.id);
    },
    [setSelectedNodeId]
  );

  const onPaneClick = useCallback(() => {
    setSelectedNodeId(null);
  }, [setSelectedNodeId]);

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const type = event.dataTransfer.getData("application/reactflow");

      if (!type || !reactFlowInstance.current || !reactFlowWrapper.current)
        return;

      const position = reactFlowInstance.current.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: Node = {
        id: crypto.randomUUID(),
        type,
        position,
        data: defaultData[type] ?? { label: type },
      };

      addNode(newNode);
    },
    [addNode]
  );

  return (
    <div ref={reactFlowWrapper} className="w-full h-full">
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
        onInit={(instance) => {
          reactFlowInstance.current = instance;
        }}
        fitView
        className="bg-gray-50"
      >
        <MiniMap nodeBorderRadius={2} />
        <Controls />
        <Background
          variant={BackgroundVariant.Dots}
          gap={12}
          size={1}
          color="#d1d5db"
        />
      </ReactFlow>
    </div>
  );
}