import { memo } from "react";
import { Handle, Position, type NodeProps } from "reactflow";
import { Play, Trash2 } from "lucide-react";
import { useWorkflowStore } from "../../store/workflowStore";
import type { StartNodeData } from "../../types/nodeTypes";

const StartNode = ({ id, selected }: NodeProps<StartNodeData>) => {
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
        bg-green-100 border-2 border-green-300
        ${selected ? "ring-4 ring-green-200" : ""}`}
      >
        <Play className="text-green-600" size={18} />
      </div>

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default memo(StartNode);