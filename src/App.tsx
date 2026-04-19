import WorkflowCanvas from './components/canvas/WorkflowCanvas';
import NodeSidebar from './components/sidebar/NodeSidebar';
import NodeFormPanel from './components/forms/NodeFormPanel';
import SimulationPanel from './components/sandbox/SimulationPanel';
import WorkflowTopBar from "./components/canvas/WorkflowTopBar";

function App() {
  return (
    <div className="flex h-screen w-screen bg-gray-50">
      {/* Left Sidebar */}
      <NodeSidebar />

      {/* Center Canvas */}
      <div className="flex-1 flex flex-col h-full">
   <WorkflowTopBar/>
  <div className="flex-1">
    <WorkflowCanvas />
  </div>
</div>
      {/* Right column — forms + simulation */}
      <div className="flex flex-col w-80 border-l bg-white">
        <div className="flex-1 overflow-y-auto">
          <NodeFormPanel />
        </div>
        <SimulationPanel />
      </div>
    </div>
  );
}

export default App;