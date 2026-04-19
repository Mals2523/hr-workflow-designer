import { memo } from "react";
import { Handle, Position, type NodeProps } from "reactflow";
import { User, Trash2 } from "lucide-react";
import { useWorkflowStore } from "../../store/workflowStore";
import type { TaskNodeData } from "../../types/nodeTypes";

const TaskNode = ({ id, data, selected }: NodeProps<TaskNodeData>) => {
  const deleteNode = useWorkflowStore((s) => s.deleteNode);

  // ✅ Validation
  const validationErrors = useWorkflowStore((s) => s.validationErrors);
  const error = validationErrors[id];

  return (
    <div className="relative group w-48">
      {/* Delete button */}
      <button
        onClick={() => deleteNode(id)}
        className="absolute -top-2 -right-2 hidden group-hover:flex bg-white shadow p-1 rounded-full"
      >
        <Trash2 size={12} />
      </button>

      {/* Node body */}
      <div
        className={`bg-blue-100 border rounded-lg p-3
        ${error ? "border-red-400" : "border-blue-300"}
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

      {/* Handles */}
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />

      {/* ⚠️ Error Message */}
      {error && (
        <div className="absolute -bottom-5 left-0 right-0 text-center">
          <span className="text-[10px] bg-red-100 text-red-600 px-1 rounded">
            ⚠ {error}
          </span>
        </div>
      )}
    </div>
  );
};

export default memo(TaskNode);