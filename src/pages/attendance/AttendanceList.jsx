import { useEffect, useState } from "react";
import { getAttendance, deleteAttendance } from "../../services/attendanceService";
import { useNavigate } from "react-router-dom";
import "./attendance.css";

export default function AttendanceList() {
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadAttendance();
  }, []);

  const loadAttendance = async () => {
    const data = await getAttendance();
    setRecords(data);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete attendance record?")) return;
    await deleteAttendance(id);
    loadAttendance();
  };

  return (
    <div className="attendance-page">
      <div className="attendance-header">
        <h1>Attendance</h1>
        <button onClick={() => navigate("/attendance/new")}>
          + Mark Attendance
        </button>
      </div>

      <table className="attendance-table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Date</th>
            <th>Status</th>
            <th>Check In</th>
            <th>Check Out</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {records.map((r) => (
            <tr key={r.id}>
              <td>{r.employees?.full_name}</td>
              <td>{r.attendance_date}</td>
              <td className={`status ${r.status}`}>{r.status}</td>
              <td>{r.check_in || "-"}</td>
              <td>{r.check_out || "-"}</td>
              <td className="actions">
                <button onClick={() => navigate(`/attendance/${r.id}/edit`)}>
                  Edit
                </button>

                <button className="danger" onClick={() => handleDelete(r.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {records.length === 0 && (
            <tr>
              <td colSpan="6" className="empty">
                No attendance records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
