import type { Node, Edge } from 'reactflow';
import type { WorkflowNodeData, NodeType } from './nodeTypes';


export type WorkflowNode = Node<WorkflowNodeData>;


export type WorkflowEdge = Edge;


export interface AutomationAction {
  id: string;
  label: string;
  params: string[];   
}

export interface SimulationStep {
  nodeId: string;
  nodeType: NodeType;
  title: string;
  status: 'success' | 'pending' | 'failed' | 'skipped';
  message: string;
  timestamp: number;
}


export interface SimulationResult {
  success: boolean;
  steps: SimulationStep[];
  error?: string;       // validation error if workflow is invalid
}


export interface SimulationRequest {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
}


export interface ValidationError {
  nodeId: string;
  message: string;
}


export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}