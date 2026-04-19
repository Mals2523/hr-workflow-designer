import { useRef } from 'react';
import { Download, Upload } from 'lucide-react';
import { useWorkflowStore } from '../../store/workflowStore';

export default function WorkflowTopBar() {
  const { exportWorkflow, importWorkflow } = useWorkflowStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      importWorkflow(ev.target?.result as string);
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-white border-b">
      <h1 className="text-sm font-semibold text-gray-700">
        HR Workflow Designer
      </h1>
      <div className="flex gap-2">
        <button
          onClick={exportWorkflow}
          className="flex items-center gap-1 px-3 py-1 text-xs rounded-md
                     bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
        >
          <Download size={12} />
          Export JSON
        </button>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-1 px-3 py-1 text-xs rounded-md
                     bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
        >
          <Upload size={12} />
          Import JSON
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          className="hidden"
          onChange={handleImport}
        />
      </div>
    </div>
  );
}

