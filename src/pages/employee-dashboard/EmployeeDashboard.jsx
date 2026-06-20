import { useEffect, useState } from "react";
import "./employeeDashboard.css";

import EmployeeSidebar from "../../components/layout/EmployeeSidebar";
import {
  getMyAttendance,
  getMyLeaves,
  getMyGrievances,
  getMyPayroll,
  getMyTransfers,
} from "../../services/employeeDashboardService";

export default function EmployeeDashboard() {
  const [attendance, setAttendance] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [grievances, setGrievances] = useState([]);
  const [payroll, setPayroll] = useState([]);
  const [transfers, setTransfers] = useState([]);

  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    setAttendance(await getMyAttendance());
    setLeaves(await getMyLeaves());
    setGrievances(await getMyGrievances());
    setPayroll(await getMyPayroll());
    setTransfers(await getMyTransfers());
  };

  return (
    <div className="employee-dashboard-container">
      {/* <EmployeeSidebar /> */}

      <div className="employee-dashboard-main">
        <h1>My Dashboard</h1>

        {/* ========== ATTENDANCE ========== */}
        <Section title="My Attendance">
          <Table
            headers={["Date", "Status", "Check In", "Check Out"]}
            rows={attendance.map(a => [
              a.attendance_date,
              a.status,
              a.check_in || "-",
              a.check_out || "-",
            ])}
          />
        </Section>

        {/* ========== LEAVES ========== */}
        <Section title="My Leave Requests">
          <Table
            headers={["From", "To", "Status"]}
            rows={leaves.map(l => [
              l.start_date,
              l.end_date,
              l.status,
            ])}
          />
        </Section>

        {/* ========== GRIEVANCES ========== */}
        <Section title="My Grievances">
          <Table
            headers={["Category", "Status", "Created"]}
            rows={grievances.map(g => [
              g.category,
              g.status,
              new Date(g.created_at).toLocaleDateString(),
            ])}
          />
        </Section>

        {/* ========== PAYROLL ========== */}
        <Section title="My Payroll">
          <Table
            headers={["Net Pay", "Date", "Payslip"]}
            rows={payroll.map(p => [
              `₹ ${p.net_pay}`,
              new Date(p.created_at).toLocaleDateString(),
              p.payslip_url ? "Available" : "-",
            ])}
          />
        </Section>

        {/* ========== TRANSFERS ========== */}
        <Section title="My Transfer Requests">
          <Table
            headers={["From Dept", "To Dept", "Status"]}
            rows={transfers.map(t => [
              t.from_department,
              t.to_department,
              t.status,
            ])}
          />
        </Section>
      </div>
    </div>
  );
}

/* ================== SMALL REUSABLE COMPONENTS ================== */

function Section({ title, children }) {
  return (
    <div className="employee-section">
      <h2>{title}</h2>
      {children}
    </div>
  );
}

function Table({ headers, rows }) {
  return (
    <table className="employee-table">
      <thead>
        <tr>
          {headers.map(h => (
            <th key={h}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.length === 0 ? (
          <tr>
            <td colSpan={headers.length} className="empty">
              No records found
            </td>
          </tr>
        ) : (
          rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j}>{cell}</td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
