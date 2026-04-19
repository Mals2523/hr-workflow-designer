type Props = {
  data: any;
  onChange: (data: any) => void;
};

const StartForm = ({ data, onChange }: Props) => {
  const metadata = data.metadata || [];

  const updateMeta = (index: number, key: string, value: string) => {
    const updated = [...metadata];
    updated[index][key] = value;
    onChange({ ...data, metadata: updated });
  };

  const addRow = () => {
    onChange({ ...data, metadata: [...metadata, { key: "", value: "" }] });
  };

  const removeRow = (index: number) => {
    const updated = metadata.filter((_: any, i: number) => i !== index);
    onChange({ ...data, metadata: updated });
  };

  return (
    <div className="space-y-3">
      <input
        className="w-full border rounded p-2 text-sm"
        placeholder="Title"
        value={data.title || ""}
        onChange={(e) => onChange({ ...data, title: e.target.value })}
      />

      <div>
        <p className="text-xs text-gray-500 mb-1">Metadata</p>
        {metadata.map((row: any, i: number) => (
          <div key={i} className="flex gap-1 mb-1">
            <input
              className="border p-1 text-xs w-1/2"
              placeholder="Key"
              value={row.key}
              onChange={(e) => updateMeta(i, "key", e.target.value)}
            />
            <input
              className="border p-1 text-xs w-1/2"
              placeholder="Value"
              value={row.value}
              onChange={(e) => updateMeta(i, "value", e.target.value)}
            />
            <button onClick={() => removeRow(i)}>✕</button>
          </div>
        ))}
        <button onClick={addRow} className="text-xs text-blue-500">
          + Add
        </button>
      </div>
    </div>
  );
};

export default StartForm;