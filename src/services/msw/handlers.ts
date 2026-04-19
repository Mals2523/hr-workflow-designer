import { http, HttpResponse } from "msw";
import type { SimulationStep } from "../../types/workflowTypes";

type NodeType = {
  id: string;
  type?: string;
  data?: {
    label?: string;
    [key: string]: unknown;
  };
};

type EdgeType = {
  id: string;
  source: string;
  target: string;
};

const getMessageForNode = (node: NodeType): string => {
  const type = node.type || node.data?.type || "";

  switch (type) {
    case "action_email":
    case "send_email":
      return "Email sent successfully to recipient.";

    case "generate_doc":
      return "Document generated using selected template.";

    case "notify_slack":
      return "Slack notification delivered to channel.";

    case "create_ticket":
      return "Ticket created and logged in the system.";

    case "condition":
      return "Condition evaluated successfully.";

    case "approval":
      return "Approval request processed.";

    case "start":
      return "Workflow execution started.";

    case "end":
      return "Workflow execution completed.";

    default:
      return "Step executed successfully.";
  }
};

export const handlers = [
  http.get("/automations", () => {
    return HttpResponse.json([
      { "id": "send_email", "label": "Send Email", "params": ["to", "subject"] },
      { "id": "generate_doc", "label": "Generate Document", "params": ["template", "recipient"] },
      { "id": "notify_slack", "label": "Notify Slack", "params": ["channel", "message"] },
      { "id": "create_ticket", "label": "Create Ticket", "params": ["title", "priority"] }
    ]);
  }),

  http.post("/simulate", async ({ request }) => {
    const body = await request.json() as {
      nodes: NodeType[];
      edges: EdgeType[];
    };

    const { nodes = [] } = body;

    const steps: SimulationStep[] = nodes.map((node) => ({
      nodeId: node.id,
      nodeType: (node.type as SimulationStep['nodeType']) ?? 'task',
      title: (node.data?.title as string) ?? 
       (node.data?.label as string) ?? 
       'Untitled Step',
      status: 'success',
      message: getMessageForNode(node),
      timestamp: Date.now(),
    }));

    return HttpResponse.json(steps);
  }),
];