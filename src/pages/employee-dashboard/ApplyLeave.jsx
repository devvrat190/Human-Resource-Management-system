import { useState } from "react";
import { applyLeave } from "../../services/employeeActionsService";
import "./employeeActions.css";

export default function ApplyLeave() {
  const [form, setForm] = useState({
    leave_type_id: "",
    start_date: "",
    end_date: "",
    reason: "",
  });

  const submit = async () => {
    await applyLeave(form);
    alert("Leave applied");
  };

  return (
    <div className="action-page">
      <h1>Apply Leave</h1>

      <input type="date" onChange={e => setForm({ ...form, start_date: e.target.value })} />
      <input type="date" onChange={e => setForm({ ...form, end_date: e.target.value })} />
      <textarea placeholder="Reason" onChange={e => setForm({ ...form, reason: e.target.value })} />

      <button onClick={submit}>Submit</button>
    </div>
  );
}
