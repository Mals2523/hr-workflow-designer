// The 5 node type identifiers
export type NodeType =
  | 'start'
  | 'task'
  | 'approval'
  | 'automated'
  | 'end';


export interface StartNodeData {
  type: 'start';
  title: string;
  metadata: Record<string, string>; // key-value pairs
}

export interface TaskNodeData {
  type: 'task';
  title: string;
  description: string;
  assignee: string;
  dueDate: string;
  customFields: Record<string, string>;
}

export interface ApprovalNodeData {
  type: 'approval';
  title: string;
  approverRole: 'Manager' | 'HRBP' | 'Director';
  autoApproveThreshold: number;
}

export interface AutomatedNodeData {
  type: 'automated';
  title: string;
  actionId: string;           // references AutomationAction.id
  actionParams: Record<string, string>;
}

export interface EndNodeData {
  type: 'end';
  endMessage: string;
  showSummary: boolean;
}

// Union of all node data types
export type WorkflowNodeData =
  | StartNodeData
  | TaskNodeData
  | ApprovalNodeData
  | AutomatedNodeData
  | EndNodeData;