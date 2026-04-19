import { useEffect, useState } from "react";

type Props = {
  data: any;
  onChange: (data: any) => void;
};

type Automation = {
  id: string;
  label: string;
  params: string[];
};

const AutomatedForm = ({ data, onChange }: Props) => {
  const [actions, setActions] = useState<Automation[]>([]);

  useEffect(() => {
    fetch("/automations")
      .then((res) => res.json())
      .then(setActions);
  }, []);

  const selected = actions.find((a) => a.id === data.actionId);

  return (
    <div className="space-y-3">
      <input
        className="w-full border p-2 text-sm"
        placeholder="Title"
        value={data.title || ""}
        onChange={(e) => onChange({ ...data, title: e.target.value })}
      />

      <select
        className="w-full border p-2 text-sm"
        value={data.actionId || ""}
        onChange={(e) =>
          onChange({ ...data, actionId: e.target.value, actionParams: {} })
        }
      >
        <option value="">Select Action</option>
        {actions.map((a) => (
          <option key={a.id} value={a.id}>
            {a.label}
          </option>
        ))}
      </select>

      {selected?.params.map((param) => (
        <input
          key={param}
          className="w-full border p-2 text-sm"
          placeholder={param}
          value={data.actionParams?.[param] || ""}
          onChange={(e) =>
            onChange({
              ...data,
              actionParams: {
                ...data.actionParams,
                [param]: e.target.value,
              },
            })
          }
        />
      ))}
    </div>
  );
};

export default AutomatedForm;