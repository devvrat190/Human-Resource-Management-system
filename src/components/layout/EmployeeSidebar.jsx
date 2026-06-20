import { NavLink, useNavigate } from "react-router-dom";
import { signOut } from "../../services/authService";
import "./sidebar.css";

export default function EmployeeSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate("/login");
  };

  return (
    <div className="sidebar">
      {/* HEADER */}
      <div className="sidebar-header">
        <h2>MCD HRMS</h2>
        <span>Employee Panel</span>
      </div>

      {/* ACTION MENU */}
      <ul className="sidebar-menu">
        <SidebarItem to="/employee/dashboard" label="Dashboard" />
        <SidebarItem to="/employee/attendance/mark" label="Mark Attendance" />
        <SidebarItem to="/employee/leaves/apply" label="Apply Leave" />
        <SidebarItem to="/employee/grievances/new" label="Raise Grievance" />
        <SidebarItem to="/employee/transfers/apply" label="Request Transfer" />
      </ul>

      {/* FOOTER */}
      <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

function SidebarItem({ to, label }) {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive ? "sidebar-link active" : "sidebar-link"
        }
      >
        {label}
      </NavLink>
    </li>
  );
}
