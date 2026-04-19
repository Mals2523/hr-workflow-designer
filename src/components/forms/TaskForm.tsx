type Props = {
  data: any;
  onChange: (data: any) => void;
};

const TaskForm = ({ data, onChange }: Props) => {
  const fields = Array.isArray(data.customFields) ? data.customFields : [];

  const updateField = (i: number, key: string, val: string) => {
    const updated = [...fields];
    updated[i] = { ...updated[i], [key]: val };
    onChange({ ...data, customFields: updated });
  };

  const addField = () => {
    onChange({ ...data, customFields: [...fields, { key: '', value: '' }] });
  };

  const removeField = (i: number) => {
    onChange({ ...data, customFields: fields.filter((_: any, idx: number) => idx !== i) });
  };

  return (
    <div className="space-y-3">
      <div>
        <label className="text-xs text-gray-500 font-medium">Title *</label>
        <input
          className="w-full border border-gray-200 rounded-md p-2 text-sm mt-1 focus:outline-none focus:border-blue-400"
          placeholder="Task title"
          value={data.title || ''}
          onChange={(e) => onChange({ ...data, title: e.target.value })}
        />
      </div>

      <div>
        <label className="text-xs text-gray-500 font-medium">Description</label>
        <textarea
          className="w-full border border-gray-200 rounded-md p-2 text-sm mt-1 focus:outline-none focus:border-blue-400 resize-none"
          placeholder="Describe this task"
          rows={3}
          value={data.description || ''}
          onChange={(e) => onChange({ ...data, description: e.target.value })}
        />
      </div>

      <div>
        <label className="text-xs text-gray-500 font-medium">Assignee</label>
        <input
          className="w-full border border-gray-200 rounded-md p-2 text-sm mt-1 focus:outline-none focus:border-blue-400"
          placeholder="e.g. HR Team"
          value={data.assignee || ''}
          onChange={(e) => onChange({ ...data, assignee: e.target.value })}
        />
      </div>

      <div>
        <label className="text-xs text-gray-500 font-medium">Due Date</label>
        <input
          type="date"
          className="w-full border border-gray-200 rounded-md p-2 text-sm mt-1 focus:outline-none focus:border-blue-400"
          value={data.dueDate || ''}
          onChange={(e) => onChange({ ...data, dueDate: e.target.value })}
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs text-gray-500 font-medium">Custom Fields</label>
          <button
            onClick={addField}
            className="text-xs text-blue-500 hover:text-blue-700"
          >
            + Add
          </button>
        </div>
        {fields.map((f: any, i: number) => (
          <div key={i} className="flex gap-1 mb-1">
            <input
              className="border border-gray-200 rounded p-1 text-xs flex-1"
              placeholder="Key"
              value={f.key || ''}
              onChange={(e) => updateField(i, 'key', e.target.value)}
            />
            <input
              className="border border-gray-200 rounded p-1 text-xs flex-1"
              placeholder="Value"
              value={f.value || ''}
              onChange={(e) => updateField(i, 'value', e.target.value)}
            />
            <button
              onClick={() => removeField(i)}
              className="text-red-400 hover:text-red-600 text-xs px-1"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskForm;