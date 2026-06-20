  import { useEffect, useState } from "react";
  import { getPayslipsByCycle } from "../../services/payrollService";
  import { useParams, useNavigate } from "react-router-dom";
  import "./payroll.css";

  export default function PayslipList() {
    const { cycleId } = useParams();
    const [payslips, setPayslips] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
      loadPayslips();
    }, []);

    const loadPayslips = async () => {
      const data = await getPayslipsByCycle(cycleId);
      setPayslips(data);
    };

    return (
      <div className="payroll-page">
        <div className="payroll-header">
          <h1>Payslips</h1>
          <button onClick={() => navigate(`/payroll/${cycleId}/generate`)}>
            + Generate Payslip
          </button>
        </div>

        <table className="payroll-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Net Pay</th>
              <th>Payslip</th>
            </tr>
          </thead>

          <tbody>
            {payslips.map((p) => (
              <tr key={p.id}>
                <td>{p.employees?.full_name}</td>
                <td>₹ {p.net_pay}</td>
                <td className="actions">
                  {p.payslip_url ? (
                    <button
                      className="view"
                      onClick={() => window.open(p.payslip_url, "_blank")}
                    >
                      View
                    </button>
                  ) : (
                    "—"
                  )}
                </td>
              </tr>
            ))}

            {payslips.length === 0 && (
              <tr>
                <td colSpan="3" className="empty">
                  No payslips generated
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
