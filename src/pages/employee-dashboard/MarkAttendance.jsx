import { useState } from "react";
import { markAttendance } from "../../services/employeeDashboardService";
import "./employeeActions.css";

export default function MarkAttendance() {
  const [status, setStatus] = useState("present");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await markAttendance({
        status,
        check_in: "09:30",
        check_out: status === "absent" ? null : "18:00",
      });

      alert("Attendance marked successfully ✅");
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to mark attendance");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="action-page">
      <h1>Mark Attendance</h1>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="present">Present</option>
        <option value="late">Late</option>
        <option value="absent">Absent</option>
      </select>

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </button>
    </div>
  );
}
