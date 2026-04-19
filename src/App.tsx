import WorkflowCanvas from './components/canvas/WorkflowCanvas';
import NodeSidebar from './components/sidebar/NodeSidebar';

function App() {
  return (
    <div className="flex h-screen w-screen bg-gray-50">
      {/* Left Sidebar */}
      <NodeSidebar />

      {/* Center Canvas */}
      <div className="flex-1 h-full">
        <WorkflowCanvas />
      </div>
    </div>
  );
}

export default App;