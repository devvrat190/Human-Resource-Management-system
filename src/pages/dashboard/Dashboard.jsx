import { useEffect, useState } from "react";
import "./dashboard.css";

import {
  getDashboardStats,
  getEmployeeRoleDistribution,
  getAttendanceTrend,
} from "../../services/dashboardService";
import AdminChatWidget from "../../components/chatbot/AdminChatWidget";
import { useNavigate } from "react-router-dom";
import { canPerform } from "../../utils/access";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

/* ===== MAP ===== */
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

/* ===== COLORS ===== */
const COLORS = ["#2563eb", "#60a5fa", "#93c5fd", "#1e40af", "#3b82f6"];

/* ===== RED MARKER ICON ===== */
const redIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

/* ===== HARDCODED EMPLOYEE LOCATIONS ===== */
const activeEmployees = [
  { name: "Ramesh Kumar", lat: 28.6139, lng: 77.209 },
  { name: "Suresh Sharma", lat: 28.6122, lng: 77.199 },
  { name: "Amit Verma", lat: 28.6120, lng: 77.200 },
    { name: "Ammesh Kumar", lat: 28.6130, lng: 77.209 },
  { name: "Naresh Sharma", lat: 28.6122, lng: 77.219 },
  { name: "Amit narayan", lat: 28.6120, lng: 77.210 },
];

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [roleData, setRoleData] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const role = localStorage.getItem("role")?.toLowerCase().trim();

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const [statsRes, roleDistribution, attendanceTrend] =
        await Promise.all([
          getDashboardStats(),
          getEmployeeRoleDistribution(),
          getAttendanceTrend(7),
        ]);

      setStats(statsRes);

      setRoleData(
        Object.entries(roleDistribution).map(([r, count]) => ({
          name: r,
          value: count,
        }))
      );

      setAttendanceData(
        Object.entries(attendanceTrend)
          .map(([date, count]) => ({ date, count }))
          .sort((a, b) => new Date(a.date) - new Date(b.date))
      );
    } catch (err) {
      console.error("Dashboard load failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-main">

        {/* HEADER */}
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <p>System overview and analytics</p>
        </div>

        {/* STATS */}
        {(role === "admin" || role === "hr") && (
          <div className="stats-grid">
            <StatCard title="Total Employees" value={loading ? "—" : stats?.totalEmployees} />
            <StatCard title="Active Employees" value={loading ? "—" : stats?.totalEmployees} />
            <StatCard title="Pending Leaves" value={loading ? "—" : stats?.pendingLeaves} />
            <StatCard title="Open Grievances" value={loading ? "—" : stats?.openGrievances} />
            <StatCard title="Pending Transfers" value={loading ? "—" : stats?.pendingTransfers} />
          </div>
        )}

        {/* QUICK ACTIONS */}
        <div className="quick-actions">
          <h3>Quick Actions</h3>
          <div className="quick-actions-grid">

            {canPerform("employee", "create") && (
              <button className="quick-action-btn" onClick={() => navigate("/employees/new")}>
                Add Employee
              </button>
            )}

            {(role === "admin" || role === "hr") && (
              <button className="quick-action-btn" onClick={() => navigate("/employees")}>
                View Employees
              </button>
            )}

            {canPerform("leave", "approve") && (
              <button className="quick-action-btn" onClick={() => navigate("/leaves")}>
                Approve Leaves
              </button>
            )}

            {canPerform("transfer", "approve") && (
              <button className="quick-action-btn" onClick={() => navigate("/transfers")}>
                Transfer Requests
              </button>
            )}

          </div>
        </div>

        {/* CHARTS */}
        <div className="charts-grid">
          {(role === "admin" || role === "hr") && (
            <div className="chart-card">
              <h3>Employee Distribution by Role</h3>
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie data={roleData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100}>
                    {roleData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}

          <div className="chart-card">
            <h3>Attendance Trend (Last 7 Days)</h3>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#2563eb" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ================= MAP SECTION ================= */}
        <div className="map-card">
          <h3>Active Employees on Field</h3>

          <MapContainer
            center={[28.6139, 77.209]}
            zoom={16}
            style={{ height: "400px", width: "100%", borderRadius: "12px" }}
          >
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {activeEmployees.map((emp, i) => (
              <Marker key={i} position={[emp.lat, emp.lng]} icon={redIcon}>
                <Popup>
                  <strong>{emp.name}</strong>
                  <br />
                  Status: Active
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

      </div>
      <AdminChatWidget/>
    </div>
  );
}

/* ===== COMPONENT ===== */
function StatCard({ title, value }) {
  return (
    <div className="stat-card">
      <div className="stat-title">{title}</div>
      <div className="stat-value">{value}</div>
    </div>
  );
}
