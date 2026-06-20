import { Outlet } from "react-router-dom";
import EmployeeSidebar from "./EmployeeSidebar";

export default function EmployeeDashboardLayout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <EmployeeSidebar />
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
    </div>
  );
}
