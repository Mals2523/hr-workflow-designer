import { useWorkflowStore } from '../store/workflowStore';

type NodeType = 'start' | 'task' | 'approval' | 'automated' | 'end';

const SUGGESTIONS: Record<NodeType, NodeType[]> = {
  start:     ['task', 'approval'],
  task:      ['approval', 'automated', 'end'],
  approval:  ['task', 'automated', 'end'],
  automated: ['task', 'end'],
  end:       [],
};


export function useSmartSuggestions() {
  const { nodes} = useWorkflowStore();

  const getSuggestionsForNode = (nodeId: string): NodeType[] => {
    const node = nodes.find((n) => n.id === nodeId);
    if (!node?.type) return [];
    return SUGGESTIONS[node.type as NodeType] ?? [];
  };

  // Get suggestions based on last added node
  const getLatestSuggestions = (): NodeType[] => {
    if (nodes.length === 0) return ['start'];
    const lastNode = nodes[nodes.length - 1];
    return getSuggestionsForNode(lastNode.id);
  };

  return { getSuggestionsForNode, getLatestSuggestions };
}