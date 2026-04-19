type Props = {
  data: any;
  onChange: (data: any) => void;
};

const ApprovalForm = ({ data, onChange }: Props) => {
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
        value={data.approverRole || ""}
        onChange={(e) => onChange({ ...data, approverRole: e.target.value })}
      >
        <option value="">Select Role</option>
        <option>Manager</option>
        <option>HRBP</option>
        <option>Director</option>
      </select>

      <input
        type="number"
        className="w-full border p-2 text-sm"
        placeholder="Auto Approve Threshold"
        value={data.autoApproveThreshold || ""}
        onChange={(e) =>
          onChange({ ...data, autoApproveThreshold: Number(e.target.value) })
        }
      />
    </div>
  );
};

export default ApprovalForm;