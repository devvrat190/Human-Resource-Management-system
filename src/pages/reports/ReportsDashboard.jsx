import { useEffect, useState } from "react";
import {
  PieChart, Pie, LineChart, Line, BarChart, Bar,
  XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

import {
  getEmployeeDistribution,
  getAttendanceTrend,
  getLeaveStatus,
  getPayrollTrend,
  getGrievanceStats,
  getTransferStats
} from "../../services/reportService";

import "./reports.css";

export default function ReportsDashboard() {
  const [employeeDist, setEmployeeDist] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [leaveStats, setLeaveStats] = useState([]);
  const [payroll, setPayroll] = useState([]);
  const [grievance, setGrievance] = useState([]);
  const [transfer, setTransfer] = useState([]);

  useEffect(() => {
    getEmployeeDistribution().then(setEmployeeDist);
    getAttendanceTrend().then(setAttendance);
    getLeaveStatus().then(setLeaveStats);
    getPayrollTrend().then(setPayroll);
    getGrievanceStats().then(setGrievance);
    getTransferStats().then(setTransfer);
  }, []);

  return (
    <div className="reports-page">
      <h1>Reports & Analytics</h1>

      <div className="reports-grid">

        {/* Employee Distribution */}
        <div className="report-card">
          <h3>Employee Distribution</h3>
          <ResponsiveContainer height={250}>
            <PieChart>
              <Pie data={employeeDist} dataKey="count" nameKey="role" label />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Attendance Trend */}
        <div className="report-card">
          <h3>Attendance Trend</h3>
          <ResponsiveContainer height={250}>
            <LineChart data={attendance}>
              <XAxis dataKey="date" />
              <YAxis />
              <Line dataKey="present" stroke="#2563eb" />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Leave Status */}
        <div className="report-card">
          <h3>Leave Status</h3>
          <ResponsiveContainer height={250}>
            <PieChart>
              <Pie data={leaveStats} dataKey="value" nameKey="name" label />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Payroll Trend */}
        <div className="report-card">
          <h3>Payroll Cost Trend</h3>
          <ResponsiveContainer height={250}>
            <BarChart data={payroll}>
              <XAxis dataKey="period" />
              <YAxis />
              <Bar dataKey="amount" fill="#2563eb" />
              <Tooltip />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Grievance SLA */}
        <div className="report-card">
          <h3>Grievance SLA</h3>
          <ResponsiveContainer height={250}>
            <PieChart>
              <Pie data={grievance} dataKey="value" nameKey="name" label />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Transfer Status */}
        <div className="report-card">
          <h3>Transfer Status</h3>
          <ResponsiveContainer height={250}>
            <BarChart data={transfer}>
              <XAxis dataKey="name" />
              <YAxis />
              <Bar dataKey="value" fill="#2563eb" />
              <Tooltip />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}
