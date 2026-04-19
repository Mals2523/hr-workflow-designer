import StartForm from "./StartForm";
import TaskForm from "./TaskForm";
import ApprovalForm from "./ApprovalForm";
import AutomatedForm from "./AutomatedForm";
import EndForm from "./EndForm";

export const NODE_FORM_REGISTRY: Record<string, React.ComponentType<any>> = {
  start: StartForm,
  task: TaskForm,
  approval: ApprovalForm,
  automated: AutomatedForm,
  end: EndForm,
};