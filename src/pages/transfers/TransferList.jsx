import { useEffect, useState } from "react";
import {
  getTransfers,
  approveTransfer,
} from "../../services/transferService";
import { useNavigate } from "react-router-dom";
import "./transfers.css";

export default function TransferList() {
  const [transfers, setTransfers] = useState([]);
  const navigate = useNavigate();

  // TEMP: admin profile id
  const adminProfileId = localStorage.getItem("profile_id");

  useEffect(() => {
    loadTransfers();
  }, []);

  const loadTransfers = async () => {
    const data = await getTransfers();
    setTransfers(data);
  };

  const handleDecision = async (id, status) => {
    await approveTransfer(id, status, adminProfileId);
    loadTransfers();
  };

  return (
    <div className="transfer-page">
      <div className="transfer-header">
        <h1>Transfer Requests</h1>
        <button onClick={() => navigate("/transfers/new")}>
          + Request Transfer
        </button>
      </div>

      <table className="transfer-table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>From</th>
            <th>To</th>
                        <th>reason</th>

            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {transfers.map((t) => (
            <tr key={t.id}>
              <td>{t.employees?.full_name}</td>
              <td>
                {t.from_department?.name} / {t.from_zone?.name}
              </td>
              <td>
                {t.to_department?.name} / {t.to_zone?.name}
              </td>
              <td>
                {t.reason}
              </td>
              <td className={`status ${t.status}`}>{t.status}</td>

              <td>
                {t.status === "pending" && (
                  <>
                    <button
                      className="approve"
                      onClick={() => handleDecision(t.id, "approved")}
                    >
                      Approve
                    </button>
                    <button
                      className="reject"
                      onClick={() => handleDecision(t.id, "rejected")}
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}

          {transfers.length === 0 && (
            <tr>
              <td colSpan="5" className="empty">
                No transfer requests found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
