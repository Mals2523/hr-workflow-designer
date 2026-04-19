import { memo } from "react";
import { Handle, Position, type NodeProps } from "reactflow";
import { Square, Trash2 } from "lucide-react";
import { useWorkflowStore } from "../../store/workflowStore";
import type { EndNodeData } from "../../types/nodeTypes";

const EndNode = ({ id, selected }: NodeProps<EndNodeData>) => {
  const deleteNode = useWorkflowStore((s) => s.deleteNode);

  return (
    <div className="relative group flex items-center justify-center">
      <button
        onClick={() => deleteNode(id)}
        className="absolute -top-2 -right-2 hidden group-hover:flex bg-white shadow p-1 rounded-full"
      >
        <Trash2 size={12} />
      </button>

      <div
        className={`w-14 h-14 rounded-full flex items-center justify-center 
        bg-red-100 border-4 border-red-400
        ${selected ? "ring-4 ring-red-200" : ""}`}
      >
        <Square className="text-red-600" size={16} />
      </div>

      <Handle type="target" position={Position.Top} />
    </div>
  );
};

export default memo(EndNode);