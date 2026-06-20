import { useEffect, useState } from "react";
import { createGrievance } from "../../services/grievanceService";
import { getEmployees } from "../../services/employeeService";
import { useNavigate } from "react-router-dom";
import "./grievances.css";

export default function GrievanceForm() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);

  const [form, setForm] = useState({
    employee_id: "",
    category: "",
    description: "",
    sla_deadline: "",
  });

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    const data = await getEmployees();
    setEmployees(data);
  };

  const handleSubmit = async () => {
    await createGrievance(form);
    navigate("/grievances");
  };

  return (
    <div className="grievance-form">
      <h1>Raise Grievance</h1>

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

      <input
        placeholder="Category (e.g. Payroll, Harassment)"
        value={form.category}
        onChange={(e) =>
          setForm({ ...form, category: e.target.value })
        }
      />

      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
      />

      <input
        type="datetime-local"
        value={form.sla_deadline}
        onChange={(e) =>
          setForm({ ...form, sla_deadline: e.target.value })
        }
      />

      <button onClick={handleSubmit}>Submit Grievance</button>
    </div>
  );
}
