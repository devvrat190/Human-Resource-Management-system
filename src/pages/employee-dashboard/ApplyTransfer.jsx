import { useState } from "react";
import { applyTransfer } from "../../services/employeeActionsService";
import "./employeeActions.css";

export default function ApplyTransfer() {
  const [form, setForm] = useState({
    from_department: "",
    to_department: "",
    from_zone: "",
    to_zone: "",
    reason: "",
  });

  const submit = async () => {
    await applyTransfer(form);
    alert("Transfer request submitted");
  };

  return (
    <div className="action-page">
      <h1>Apply Transfer</h1>

      <input placeholder="From Department ID" onChange={e => setForm({ ...form, from_department: e.target.value })} />
      <input placeholder="To Department ID" onChange={e => setForm({ ...form, to_department: e.target.value })} />
      <input placeholder="From Zone ID" onChange={e => setForm({ ...form, from_zone: e.target.value })} />
      <input placeholder="To Zone ID" onChange={e => setForm({ ...form, to_zone: e.target.value })} />

      <textarea placeholder="Reason" onChange={e => setForm({ ...form, reason: e.target.value })} />

      <button onClick={submit}>Submit</button>
    </div>
  );
}
