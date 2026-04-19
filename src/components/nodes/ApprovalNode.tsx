import { memo } from "react";
import { Handle, Position, type NodeProps } from "reactflow";
import { Check, Trash2 } from "lucide-react";
import { useWorkflowStore } from "../../store/workflowStore";
import type { ApprovalNodeData } from "../../types/nodeTypes";

const ApprovalNode = ({ id, data, selected }: NodeProps<ApprovalNodeData>) => {
  const deleteNode = useWorkflowStore((s) => s.deleteNode);

  return (
    <div className="relative group flex items-center justify-center w-40 h-40">
      <button
        onClick={() => deleteNode(id)}
        className="absolute -top-2 -right-2 hidden group-hover:flex bg-white shadow p-1 rounded-full"
      >
        <Trash2 size={12} />
      </button>

      <div
        className={`w-32 h-32 rotate-45 bg-orange-100 border border-orange-300 
        flex items-center justify-center
        ${selected ? "ring-4 ring-orange-200" : ""}`}
      >
        <div className="rotate-[-45deg] text-center">
          <Check className="mx-auto text-orange-600" size={16} />
          <div className="text-sm font-medium text-orange-800">
            {data.title}
          </div>
          <div className="text-xs text-orange-700">
            {data.approverRole}
          </div>
        </div>
      </div>

      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default memo(ApprovalNode);