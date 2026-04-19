import type { WorkflowNode, WorkflowEdge, ValidationResult } from '../types/workflowTypes';

export function validateWorkflow(
  nodes: WorkflowNode[],
  edges: WorkflowEdge[]
): ValidationResult {
  const errors = [];

  const startNodes = nodes.filter((n) => n.type === 'start');
  const endNodes = nodes.filter((n) => n.type === 'end');

  if (startNodes.length === 0)
    errors.push({ nodeId: '', message: 'Missing Start node' });
  if (startNodes.length > 1)
    startNodes.slice(1).forEach((n) =>
      errors.push({ nodeId: n.id, message: 'Only one Start node allowed' })
    );
  if (endNodes.length === 0)
    errors.push({ nodeId: '', message: 'Missing End node' });

  // Check disconnected nodes
  nodes.forEach((node) => {
    const hasConnection =
      edges.some((e) => e.source === node.id || e.target === node.id);
    if (!hasConnection && node.type !== 'start' && node.type !== 'end')
      errors.push({ nodeId: node.id, message: 'Node is disconnected' });
  });

  // Cycle detection using DFS
  const adjList: Record<string, string[]> = {};
  nodes.forEach((n) => (adjList[n.id] = []));
  edges.forEach((e) => adjList[e.source]?.push(e.target));

  const visited = new Set<string>();
  const stack = new Set<string>();
  let hasCycle = false;

  const dfs = (nodeId: string) => {
    visited.add(nodeId);
    stack.add(nodeId);
    for (const neighbor of adjList[nodeId] || []) {
      if (!visited.has(neighbor)) dfs(neighbor);
      else if (stack.has(neighbor)) {
        hasCycle = true;
        errors.push({ nodeId, message: 'Cycle detected in workflow' });
      }
    }
    stack.delete(nodeId);
  };

  nodes.forEach((n) => {
    if (!visited.has(n.id)) dfs(n.id);
  });

  return { valid: errors.length === 0 && !hasCycle, errors };
}