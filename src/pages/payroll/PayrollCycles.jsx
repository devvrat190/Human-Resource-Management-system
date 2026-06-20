import { useEffect, useState } from "react";
import {
  getPayrollCycles,
  createPayrollCycle,
  finalizePayrollCycle,
} from "../../services/payrollService";
import { useNavigate } from "react-router-dom";
import "./payroll.css";

export default function PayrollCycles() {
  const [cycles, setCycles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadCycles();
  }, []);

  const loadCycles = async () => {
    const data = await getPayrollCycles();
    setCycles(data);
  };

  const createCycle = async () => {
    const now = new Date();
    await createPayrollCycle(now.getMonth() + 1, now.getFullYear());
    loadCycles();
  };

  const finalizeCycle = async (id) => {
    await finalizePayrollCycle(id);
    loadCycles();
  };

  return (
    <div className="payroll-page">
      <div className="payroll-header">
        <h1>Payroll Cycles</h1>
        <button onClick={createCycle}>+ New Payroll Cycle</button>
      </div>

      <table className="payroll-table">
        <thead>
          <tr>
            <th>Month</th>
            <th>Year</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {cycles.map((c) => (
            <tr key={c.id}>
              <td>{c.month}</td>
              <td>{c.year}</td>
              <td className={`status ${c.status}`}>{c.status}</td>
              <td className="actions">
                <button
                  className="view"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    navigate(`/payroll/${c.id}`);
                  }}
                >
                  View Payslips
                </button>

                {c.status === "processing" && (
                  <button
                    className="finalize"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation(); 
                      finalizeCycle(c.id);
                    }}
                  >
                    Finalize
                  </button>
                )}
              </td>
            </tr>
          ))}

          {cycles.length === 0 && (
            <tr>
              <td colSpan="4" className="empty">
                No payroll cycles yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
