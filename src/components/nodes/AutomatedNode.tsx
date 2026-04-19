import { memo } from "react";
import { Handle, Position, type NodeProps } from "reactflow";
import { Settings, Trash2 } from "lucide-react";
import { useWorkflowStore } from "../../store/workflowStore";
import type { AutomatedNodeData } from "../../types/nodeTypes";

const AutomatedNode = ({ id, data, selected }: NodeProps<AutomatedNodeData>) => {
  const deleteNode = useWorkflowStore((s) => s.deleteNode);

  return (
    <div className="relative group w-48">
      <button
        onClick={() => deleteNode(id)}
        className="absolute -top-2 -right-2 hidden group-hover:flex bg-white shadow p-1 rounded-full"
      >
        <Trash2 size={12} />
      </button>

      <div
        className={`bg-purple-100 border border-purple-300 rounded-xl p-3
        ${selected ? "ring-4 ring-purple-200" : ""}`}
      >
        <div className="flex items-center gap-2 font-medium text-purple-800">
          <Settings size={16} />
          {data.title}
        </div>
        <div className="text-xs text-purple-700 mt-1">
          {data.actionId}
        </div>
      </div>

      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default memo(AutomatedNode);