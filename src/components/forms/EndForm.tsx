type Props = {
  data: any;
  onChange: (data: any) => void;
};

const EndForm = ({ data, onChange }: Props) => {
  return (
    <div className="space-y-3">
      <input
        className="w-full border p-2 text-sm"
        placeholder="End Message"
        value={data.endMessage || ""}
        onChange={(e) =>
          onChange({ ...data, endMessage: e.target.value })
        }
      />

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={data.showSummary || false}
          onChange={(e) =>
            onChange({ ...data, showSummary: e.target.checked })
          }
        />
        Show Summary
      </label>
    </div>
  );
};

export default EndForm;