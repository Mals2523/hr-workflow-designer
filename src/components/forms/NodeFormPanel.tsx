import { useWorkflowStore } from "../../store/workflowStore";
import { NODE_FORM_REGISTRY } from "./registry";
import { Trash2 } from "lucide-react";

const NodeFormPanel = () => {
  const { nodes, selectedNodeId, updateNodeData, deleteNode } = useWorkflowStore();

  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

  if (!selectedNode) {
    return (
      <aside className="w-72 border-l bg-white p-4 text-gray-500">
        Select a node to edit
      </aside>
    );
  }


  const FormComponent = NODE_FORM_REGISTRY[selectedNode.type as string];

  const handleChange = (updatedData: any) => {
    updateNodeData(selectedNode.id, updatedData);
  };

  return (
    <aside className="w-72 border-l bg-white p-4 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-gray-700 capitalize">
          {selectedNode.type} Node
        </h2>
        <button
          onClick={() => deleteNode(selectedNode.id)}
          className="p-1 rounded hover:bg-gray-100"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* Form */}
      {FormComponent ? (
        <FormComponent
          data={selectedNode.data}
          onChange={handleChange}
        />
      ) : (
        <div className="text-sm text-gray-500">
          No form available
        </div>
      )}
    </aside>
  );
};

export default NodeFormPanel;