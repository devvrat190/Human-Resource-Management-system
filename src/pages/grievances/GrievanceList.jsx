import { useEffect, useState } from "react";
import {
  getGrievances,
  updateGrievanceStatus,
} from "../../services/grievanceService";
import { useNavigate } from "react-router-dom";
import "./grievances.css";

export default function GrievanceList() {
  const [grievances, setGrievances] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadGrievances();
  }, []);

  const loadGrievances = async () => {
    const data = await getGrievances();
    setGrievances(data);
  };

  const changeStatus = async (id, status) => {
    await updateGrievanceStatus(id, status);
    loadGrievances();
  };

  return (
    <div className="grievance-page">
      <div className="grievance-header">
        <h1>Grievances</h1>
        <button onClick={() => navigate("/grievances/new")}>
          + Raise Grievance
        </button>
      </div>

      <table className="grievance-table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Category</th>
            <th>Status</th>
            <th>SLA</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {grievances.map((g) => (
            <tr key={g.id}>
              <td>{g.employees?.full_name}</td>
              <td>{g.category}</td>
              <td className={`status ${g.status}`}>{g.status}</td>
              <td>{g.sla_deadline ? g.sla_deadline.split("T")[0] : "-"}</td>
              <td className="actions">
                <button
                  className="view"
                  onClick={() => navigate(`/grievances/${g.id}`)}
                >
                  View
                </button>
                {g.status !== "closed" && (
                  <>
                    <button onClick={() => changeStatus(g.id, "in_progress")}>
                      In Progress
                    </button>
                    <button onClick={() => changeStatus(g.id, "resolved")}>
                      Resolve
                    </button>
                    <button onClick={() => changeStatus(g.id, "closed")}>
                      Close
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}

          {grievances.length === 0 && (
            <tr>
              <td colSpan="5" className="empty">
                No grievances found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
