import { useEffect, useState } from "react";
import { createLeave, getLeaveTypes } from "../../services/leaveService";
import { getEmployees } from "../../services/employeeService";
import { useNavigate } from "react-router-dom";
import "./leaves.css";

export default function LeaveForm() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [leaveTypes, setLeaveTypes] = useState([]);

  const [form, setForm] = useState({
    employee_id: "",
    leave_type_id: "",
    start_date: "",
    end_date: "",
    reason: "",
  });

  useEffect(() => {
    loadMeta();
  }, []);

  const loadMeta = async () => {
    const [empData, leaveTypeData] = await Promise.all([
      getEmployees(),
      getLeaveTypes(),
    ]);
    setEmployees(empData);
    setLeaveTypes(leaveTypeData);
  };

  const handleSubmit = async () => {
    await createLeave(form);
    navigate("/leaves");
  };

  return (
    <div className="leave-form">
      <h1>Apply Leave</h1>

      <select
        value={form.employee_id}
        onChange={(e) =>
          setForm({ ...form, employee_id: e.target.value })
        }
      >
        <option value="">Select Employee</option>
        {employees.map((e) => (
          <option key={e.id} value={e.id}>
            {e.full_name}
          </option>
        ))}
      </select>

      <select
        value={form.leave_type_id}
        onChange={(e) =>
          setForm({ ...form, leave_type_id: e.target.value })
        }
      >
        <option value="">Select Leave Type</option>
        {leaveTypes.map((l) => (
          <option key={l.id} value={l.id}>
            {l.name} (Max {l.max_days} days)
          </option>
        ))}
      </select>

      <input
        type="date"
        value={form.start_date}
        onChange={(e) =>
          setForm({ ...form, start_date: e.target.value })
        }
      />

      <input
        type="date"
        value={form.end_date}
        onChange={(e) =>
          setForm({ ...form, end_date: e.target.value })
        }
      />

      <textarea
        placeholder="Reason"
        value={form.reason}
        onChange={(e) =>
          setForm({ ...form, reason: e.target.value })
        }
      />

      <button onClick={handleSubmit}>Submit Leave</button>
    </div>
  );
}
