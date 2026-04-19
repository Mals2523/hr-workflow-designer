import { create } from 'zustand';
import type { Connection, Edge, EdgeChange, NodeChange } from 'reactflow';
import { addEdge, applyEdgeChanges, applyNodeChanges } from 'reactflow';
import type { WorkflowNode, WorkflowEdge, SimulationResult } from '../types/workflowTypes';

interface WorkflowStore {
  // State
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  selectedNodeId: string | null;
  simulationResult: SimulationResult | null;
  isSimulating: boolean;

  // Node actions
  addNode: (node: WorkflowNode) => void;
  updateNodeData: (id: string, data: Record<string, unknown>) => void;
  deleteNode: (id: string) => void;
  onNodesChange: (changes: NodeChange[]) => void;

  // Edge actions
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;

  // Selection
  setSelectedNodeId: (id: string | null) => void;

  // Simulation
  setSimulationResult: (result: SimulationResult | null) => void;
  setIsSimulating: (val: boolean) => void;
}

export const useWorkflowStore = create<WorkflowStore>((set) => ({
  // Initial state
  nodes: [],
  edges: [],
  selectedNodeId: null,
  simulationResult: null,
  isSimulating: false,

  // Node actions
  addNode: (node) =>
    set((state) => ({ nodes: [...state.nodes, node] })),

  updateNodeData: (id, data) =>
    set((state) => ({
      nodes: state.nodes.map((n) =>
        n.id === id ? { ...n, data: { ...n.data, ...data } as WorkflowNode['data'] } : n
      ),
    })),

  deleteNode: (id) =>
    set((state) => ({
      nodes: state.nodes.filter((n) => n.id !== id),
      edges: state.edges.filter(
        (e) => e.source !== id && e.target !== id
      ),
      selectedNodeId: state.selectedNodeId === id ? null : state.selectedNodeId,
    })),

  onNodesChange: (changes) =>
    set((state) => ({
      nodes: applyNodeChanges(changes, state.nodes) as WorkflowNode[],
    })),

  // Edge actions
  onEdgesChange: (changes) =>
    set((state) => ({
      edges: applyEdgeChanges(changes, state.edges),
    })),

  onConnect: (connection) =>
    set((state) => ({
      edges: addEdge(connection, state.edges),
    })),

  // Selection
  setSelectedNodeId: (id) => set({ selectedNodeId: id }),

  // Simulation
  setSimulationResult: (result) => set({ simulationResult: result }),
  setIsSimulating: (val) => set({ isSimulating: val }),
}));