import { useEffect, useState } from "react";
import {
  createAttendance,
  getAttendanceById,
  updateAttendance,
} from "../../services/attendanceService";
import { getEmployees } from "../../services/employeeService";
import { useNavigate, useParams } from "react-router-dom";
import "./attendance.css";

export default function AttendanceForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);

  const [form, setForm] = useState({
    employee_id: "",
    attendance_date: "",
    status: "present",
    check_in: "",
    check_out: "",
  });

  useEffect(() => {
    loadEmployees();
    if (id) loadAttendance();
  }, [id]);

  const loadEmployees = async () => {
    const data = await getEmployees();
    setEmployees(data);
  };

  const loadAttendance = async () => {
    const data = await getAttendanceById(id);
    setForm({
      employee_id: data.employee_id,
      attendance_date: data.attendance_date,
      status: data.status,
      check_in: data.check_in || "",
      check_out: data.check_out || "",
    });
  };

  const handleSubmit = async () => {
    if (id) {
      await updateAttendance(id, form);
    } else {
      await createAttendance(form);
    }
    navigate("/attendance");
  };

  return (
    <div className="attendance-form">
      <h1>{id ? "Edit Attendance" : "Mark Attendance"}</h1>

      <select
        value={form.employee_id}
        onChange={(e) => setForm({ ...form, employee_id: e.target.value })}
      >
        <option value="">Select Employee</option>
        {employees.map((e) => (
          <option key={e.id} value={e.id}>
            {e.full_name}
          </option>
        ))}
      </select>

      <input
        type="date"
        value={form.attendance_date}
        onChange={(e) =>
          setForm({ ...form, attendance_date: e.target.value })
        }
      />

      <select
        value={form.status}
        onChange={(e) => setForm({ ...form, status: e.target.value })}
      >
        <option value="present">Present</option>
        <option value="absent">Absent</option>
        <option value="late">Late</option>
      </select>

      <input
        type="time"
        value={form.check_in}
        onChange={(e) => setForm({ ...form, check_in: e.target.value })}
      />

      <input
        type="time" step="60"
        value={form.check_out}
        onChange={(e) => setForm({ ...form, check_out: e.target.value })}
      />

      <button onClick={handleSubmit}>
        {id ? "Update Attendance" : "Save Attendance"}
      </button>
    </div>
  );
}
