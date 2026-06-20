import { useEffect, useState } from "react";
import { createTransferRequest } from "../../services/transferService";
import { getEmployees } from "../../services/employeeService";
import { getDepartments } from "../../services/departmentService";
import { getZones } from "../../services/zoneService";
import { useNavigate } from "react-router-dom";
import "./transfers.css";

export default function TransferForm() {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [zones, setZones] = useState([]);

  const [form, setForm] = useState({
    employee_id: "",
    from_department: "",
    to_department: "",
    from_zone: "",
    to_zone: "",
    reason: "",
  });

  useEffect(() => {
    loadMeta();
  }, []);

  const loadMeta = async () => {
    const [e, d, z] = await Promise.all([
      getEmployees(),
      getDepartments(),
      getZones(),
    ]);
    setEmployees(e);
    setDepartments(d);
    setZones(z);
  };

  const handleSubmit = async () => {
    await createTransferRequest(form);
    navigate("/transfers");
  };

  return (
    <div className="transfer-form">
      <h1>Request Transfer</h1>

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
        value={form.from_department}
        onChange={(e) =>
          setForm({ ...form, from_department: e.target.value })
        }
      >
        <option value="">From Department</option>
        {departments.map((d) => (
          <option key={d.id} value={d.id}>
            {d.name}
          </option>
        ))}
      </select>

      <select
        value={form.to_department}
        onChange={(e) =>
          setForm({ ...form, to_department: e.target.value })
        }
      >
        <option value="">To Department</option>
        {departments.map((d) => (
          <option key={d.id} value={d.id}>
            {d.name}
          </option>
        ))}
      </select>

      <select
        value={form.from_zone}
        onChange={(e) =>
          setForm({ ...form, from_zone: e.target.value })
        }
      >
        <option value="">From Zone</option>
        {zones.map((z) => (
          <option key={z.id} value={z.id}>
            {z.name}
          </option>
        ))}
      </select>

      <select
        value={form.to_zone}
        onChange={(e) =>
          setForm({ ...form, to_zone: e.target.value })
        }
      >
        <option value="">To Zone</option>
        {zones.map((z) => (
          <option key={z.id} value={z.id}>
            {z.name}
          </option>
        ))}
      </select>

      <textarea
        placeholder="Reason"
        value={form.reason}
        onChange={(e) =>
          setForm({ ...form, reason: e.target.value })
        }
      />

      <button onClick={handleSubmit}>Submit Request</button>
    </div>
  );
}
