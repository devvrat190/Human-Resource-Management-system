import { useEffect, useState } from "react";
import {
  getGrievanceById,
  getGrievanceUpdates,
  addGrievanceUpdate,
} from "../../services/grievanceService";
import { useParams } from "react-router-dom";
import "./grievances.css";

export default function GrievanceDetail() {
  const { id } = useParams();
  const [grievance, setGrievance] = useState(null);
  const [updates, setUpdates] = useState([]);
  const [message, setMessage] = useState("");

  const profileId = localStorage.getItem("profile_id");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const g = await getGrievanceById(id);
    const u = await getGrievanceUpdates(id);
    setGrievance(g);
    setUpdates(u);
  };

  const submitUpdate = async () => {
    await addGrievanceUpdate(id, message, profileId);
    setMessage("");
    loadData();
  };

  if (!grievance) return null;

  return (
    <div className="grievance-detail">

      <div className="grievance-card">
        <h1>{grievance.category}</h1>
        <p className="grievance-desc">{grievance.description}</p>

        <div className="grievance-meta">
          <span><strong>Status:</strong> {grievance.status}</span>
          <span><strong>Employee:</strong> {grievance.employees?.full_name}</span>
        </div>
      </div>

      <div className="updates">
        <h3>Updates</h3>

        {updates.map((u) => (
          <div key={u.id} className="update-item">
            <strong>{u.profiles?.email}</strong>
            <span>{u.message}</span>
          </div>
        ))}

        <div className="update-box">
          <textarea
            placeholder="Add an update..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={submitUpdate}>Add Update</button>
        </div>
      </div>

    </div>
  );
}
