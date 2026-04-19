import { useState } from "react";
import { Play, ChevronDown, ChevronUp } from "lucide-react";
import { useWorkflowStore } from "../../store/workflowStore";
import type { SimulationStep } from "../../types/workflowTypes";

const statusStyles: Record<string, string> = {
  success: "bg-green-100 text-green-700",
  failed: "bg-red-100 text-red-700",
  pending: "bg-yellow-100 text-yellow-700",
  skipped: "bg-gray-100 text-gray-600",
};

const SimulationPanel = () => {
  const {
    nodes,
    edges,
    simulationResult,
    isSimulating,
    setSimulationResult,
    setIsSimulating,
  } = useWorkflowStore();

  const [isOpen, setIsOpen] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const validate = () => {
    const startCount = nodes.filter((n) => n.type === "start").length;
    const endCount = nodes.filter((n) => n.type === "end").length;
    if (startCount !== 1) return "Workflow must have exactly 1 Start node";
    if (endCount < 1) return "Workflow must have at least 1 End node";
    if (edges.length < 1) return "Workflow must have at least 1 connection";
    return null;
  };

  const runSimulation = async () => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setIsSimulating(true);

    try {
      const res = await fetch("/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nodes, edges }),
      });

      const steps: SimulationStep[] = await res.json();
      setSimulationResult({
        success: !steps.some((s) => s.status === "failed"),
        steps,
      });
    } catch {
      setError("Simulation failed. Try again.");
    } finally {
      setIsSimulating(false);
    }
  };

  const overallStatus = simulationResult?.steps?.some(
    (s) => s.status === "failed"
  )
    ? "failed"
    : simulationResult?.steps?.length
    ? "success"
    : null;

  return (
    <div className="border-t bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b">
        <h3 className="text-sm font-semibold text-gray-700">Simulation</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={runSimulation}
            disabled={isSimulating}
            className="flex items-center gap-1 px-3 py-1 text-sm rounded 
                       bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            <Play size={14} />
            {isSimulating ? "Running..." : "Run Workflow"}
          </button>
          <button
            onClick={() => setIsOpen((p) => !p)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            {isOpen ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
          </button>
        </div>
      </div>

      {/* Body */}
      {isOpen && (
        <div className="p-4 space-y-3 max-h-72 overflow-y-auto">
          {/* Error */}
          {error && (
            <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
              {error}
            </div>
          )}

          {/* Overall Result Banner */}
          {overallStatus && (
            <div
              className={`text-sm p-2 rounded font-medium ${
                overallStatus === "success"
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              Workflow {overallStatus === "success" ? "✅ Succeeded" : "❌ Failed"}
            </div>
          )}

          {/* Timeline */}
          <div className="space-y-3">
            {simulationResult?.steps?.map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-2 h-2 mt-2 rounded-full bg-gray-400 shrink-0" />
                <div className="flex-1 border rounded p-2 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-800">
                      {step.title || step.nodeType}
                    </p>
                    <span
                      className={`text-xs px-2 py-0.5 rounded ${
                        statusStyles[step.status]
                      }`}
                    >
                      {step.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{step.message}</p>
                  <p className="text-[10px] text-gray-400 mt-1">
                    {new Date(step.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {!simulationResult?.steps?.length && !error && (
            <p className="text-xs text-gray-400">
              Run the workflow to see execution steps
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default SimulationPanel;