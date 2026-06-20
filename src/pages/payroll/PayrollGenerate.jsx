import { useEffect, useState } from "react";
import { generatePayslip } from "../../services/payrollService";
import { getEmployees } from "../../services/employeeService";
import { useParams } from "react-router-dom";
import "./payroll.css";

export default function PayrollGenerate() {
  const { cycleId } = useParams();
  const [employees, setEmployees] = useState([]);

  const [form, setForm] = useState({
    employee_id: "",
    net_pay: "",
  });

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    const data = await getEmployees();
    setEmployees(data);
  };

  const submit = async () => {
    await generatePayslip({
      payroll_cycle_id: cycleId,
      employee_id: form.employee_id,
      net_pay: Number(form.net_pay),
    });

    setForm({ employee_id: "", net_pay: "" });
  };

  return (
    <div className="payroll-form">
      <h1>Generate Payslip</h1>

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
        type="number"
        placeholder="Net Pay"
        value={form.net_pay}
        onChange={(e) =>
          setForm({ ...form, net_pay: e.target.value })
        }
      />

      <button onClick={submit}>Generate Payslip</button>
    </div>
  );
}
