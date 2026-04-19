import WorkflowCanvas from './components/canvas/WorkflowCanvas';
import NodeSidebar from './components/sidebar/NodeSidebar';
import NodeFormPanel from './components/forms/NodeFormPanel';

function App() {
  return (
    <div className="flex h-screen w-screen bg-gray-50">
      {/* Left Sidebar */}
      <NodeSidebar />

      {/* Center Canvas */}
      <div className="flex-1 h-full">
        <WorkflowCanvas />
      </div>

      {/* Right Panel */}
      <NodeFormPanel />
    </div>
  );
}

export default App;