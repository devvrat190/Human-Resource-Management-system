import { useEffect, useState } from "react";
import {
  getLeaves,
  updateLeaveStatus,
  deleteLeave,
} from "../../services/leaveService";
import { useNavigate } from "react-router-dom";
import "./leaves.css";

export default function LeaveList() {
  const [leaves, setLeaves] = useState([]);
  const navigate = useNavigate();

  // TEMP: admin profile id (later from auth context)
  const adminProfileId = localStorage.getItem("profile_id");

  useEffect(() => {
    loadLeaves();
  }, []);

  const loadLeaves = async () => {
    const data = await getLeaves();
    setLeaves(data);
  };

  const changeStatus = async (id, status) => {
    await updateLeaveStatus(id, status, adminProfileId);
    loadLeaves();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete leave request?")) return;
    await deleteLeave(id);
    loadLeaves();
  };

  return (
    <div className="leave-page">
      <div className="leave-header">
        <h1>Leave Management</h1>
        <button onClick={() => navigate("/leaves/new")}>
          + Apply Leave
        </button>
      </div>

      <table className="leave-table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Leave Type</th>
            <th>From</th>
            <th>To</th>
            <th>Status</th>
            <th>Approved By</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {leaves.map((l) => (
            <tr key={l.id}>
              <td>{l.employees?.full_name}</td>
              <td>{l.leave_types?.name}</td>
              <td>{l.start_date}</td>
              <td>{l.end_date}</td>
              <td className={`status ${l.status}`}>{l.status}</td>
              <td>{l.approved_by?.email || "-"}</td>

              <td className="actions">
                {l.status === "pending" && (
                  <>
                    <button
                      className="approve"
                      onClick={() => changeStatus(l.id, "approved")}
                    >
                      Approve
                    </button>
                    <button
                      className="reject"
                      onClick={() => changeStatus(l.id, "rejected")}
                    >
                      Reject
                    </button>
                  </>
                )}
                <button
                  className="danger"
                  onClick={() => handleDelete(l.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {leaves.length === 0 && (
            <tr>
              <td colSpan="7" className="empty">
                No leave requests found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
