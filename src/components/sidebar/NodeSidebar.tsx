import { Play, User, Check, Settings, Square } from "lucide-react";
import { useSmartSuggestions } from '../../hooks/useSmartSuggestions';

type NodeTypeItem = {
  type: string;
  label: string;
  icon: React.ReactNode;
  bg: string;
  border: string;
  text: string;
};

const nodeItems: NodeTypeItem[] = [
  { type: "start", label: "Start", icon: <Play size={16} />, bg: "bg-green-100", border: "border-green-300", text: "text-green-800" },
  { type: "task", label: "Task", icon: <User size={16} />, bg: "bg-blue-100", border: "border-blue-300", text: "text-blue-800" },
  { type: "approval", label: "Approval", icon: <Check size={16} />, bg: "bg-orange-100", border: "border-orange-300", text: "text-orange-800" },
  { type: "automated", label: "Automated", icon: <Settings size={16} />, bg: "bg-purple-100", border: "border-purple-300", text: "text-purple-800" },
  { type: "end", label: "End", icon: <Square size={16} />, bg: "bg-red-100", border: "border-red-300", text: "text-red-800" },
];

const NodeSidebar = () => {
  // ✅ Hook inside component
  const { getLatestSuggestions } = useSmartSuggestions();
  const suggestions = getLatestSuggestions();

  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="w-56 bg-white border-r p-3 flex flex-col">
      <h2 className="text-sm font-semibold text-gray-700 mb-3">Nodes</h2>

      <div className="flex flex-col gap-2">
        {nodeItems.map((item) => (
          <div
            key={item.type}
            draggable
            onDragStart={(e) => onDragStart(e, item.type)}
            className={`flex items-center gap-2 p-2 rounded-md cursor-grab 
                        active:cursor-grabbing border ${item.bg} ${item.border} 
                        ${item.text} hover:shadow-sm transition`}
          >
            {item.icon}
            <span className="text-sm font-medium">{item.label}</span>
          </div>
        ))}
      </div>

      {/* ✅ Smart Suggestions — inside JSX */}
      {suggestions.length > 0 && (
        <div className="mt-4 p-2 bg-blue-50 rounded-md border border-blue-100">
          <p className="text-xs font-medium text-blue-600 mb-2">
            💡 Suggested Next
          </p>
          {suggestions.map((type) => (
            <p key={type} className="text-xs text-blue-500 capitalize py-0.5">
              → {type}
            </p>
          ))}
        </div>
      )}
    </aside>
  );
};

export default NodeSidebar;