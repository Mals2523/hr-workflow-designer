import { memo } from "react";
import { Handle, Position, type NodeProps } from "reactflow";
import { User, Trash2 } from "lucide-react";
import { useWorkflowStore } from "../../store/workflowStore";
import type { TaskNodeData } from "../../types/nodeTypes";

const TaskNode = ({ id, data, selected }: NodeProps<TaskNodeData>) => {
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
        className={`bg-blue-100 border border-blue-300 rounded-lg p-3
        ${selected ? "ring-4 ring-blue-200" : ""}`}
      >
        <div className="flex items-center gap-2 font-medium text-blue-800">
          <User size={16} />
          {data.title}
        </div>
        <div className="text-xs text-blue-700 mt-1">
          {data.assignee}
        </div>
      </div>

      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default memo(TaskNode);