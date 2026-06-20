import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

/* AUTH */
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";

/* LAYOUTS */
import DashboardLayout from "../components/layout/DashboardLayout";
import EmployeeDashboardLayout from "../components/layout/EmployeeLayout";

/* ADMIN PAGES */
import Dashboard from "../pages/dashboard/Dashboard";
import EmployeeList from "../pages/employees/EmployeeList";
import EmployeeForm from "../pages/employees/EmployeeForm";
import EmployeeDetail from "../pages/employees/EmployeeDetail";
import AttendanceList from "../pages/attendance/AttendanceList";
import AttendanceForm from "../pages/attendance/AttendanceForm";
import LeaveList from "../pages/leaves/LeaveList";
import LeaveForm from "../pages/leaves/LeaveForm";
import GrievanceList from "../pages/grievances/GrievanceList";
import GrievanceForm from "../pages/grievances/GrievanceForm";
import GrievanceDetail from "../pages/grievances/GrievanceDetail";
import TransferList from "../pages/transfers/TransferList";
import TransferForm from "../pages/transfers/TransferForm";
import PayrollCycles from "../pages/payroll/PayrollCycles";
import PayslipList from "../pages/payroll/PayslipList";
import PayrollGenerate from "../pages/payroll/PayrollGenerate";
import ReportsDashboard from "../pages/reports/ReportsDashboard";

/* EMPLOYEE PAGES */
import EmployeeDashboard from "../pages/employee-dashboard/EmployeeDashboard";
import MarkAttendance from "../pages/employee-dashboard/MarkAttendance";
import ApplyLeave from "../pages/employee-dashboard/ApplyLeave";
import RaiseGrievance from "../pages/employee-dashboard/RaiseGrievance";
import ApplyTransfer from "../pages/employee-dashboard/ApplyTransfer";

/* UTILS */
import { getRole } from "../utils/access";

export default function Router() {
  const role = getRole();

  return (
    <Routes>
      {/* ================= PUBLIC ================= */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path="/signup"
        element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        }
      />

      <Route
        path="/"
        element={
          role
            ? role === "employee"
              ? <Navigate to="/employee/dashboard" />
              : <Navigate to="/dashboard" />
            : <Navigate to="/login" />
        }
      />


      {/* ================= EMPLOYEE ================= */}
      <Route
        element={
          <ProtectedRoute allowedRoles={["employee"]}>
            <EmployeeDashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
        <Route path="/employee/attendance/mark" element={<MarkAttendance />} />
        <Route path="/employee/leaves/apply" element={<ApplyLeave />} />
        <Route path="/employee/grievances/new" element={<RaiseGrievance />} />
        <Route path="/employee/transfers/apply" element={<ApplyTransfer />} />
      </Route>

      {/* ================= ADMIN / HR / SUPERVISOR ================= */}
      <Route
        element={
          <ProtectedRoute
            allowedRoles={["admin", "hr", "supervisor", "zone_admin"]}
          >
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />

        {/* EMPLOYEES */}
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/employees/new" element={<EmployeeForm />} />
        <Route path="/employees/:id/edit" element={<EmployeeForm />} />
        <Route path="/employees/:id" element={<EmployeeDetail />} />

        {/* ATTENDANCE */}
        <Route path="/attendance" element={<AttendanceList />} />
        <Route path="/attendance/new" element={<AttendanceForm />} />
        <Route path="/attendance/:id/edit" element={<AttendanceForm />} />

        {/* LEAVES */}
        <Route path="/leaves" element={<LeaveList />} />
        <Route path="/leaves/new" element={<LeaveForm />} />

        {/* GRIEVANCES */}
        <Route path="/grievances" element={<GrievanceList />} />
        <Route path="/grievances/new" element={<GrievanceForm />} />
        <Route path="/grievances/:id" element={<GrievanceDetail />} />

        {/* TRANSFERS */}
        <Route path="/transfers" element={<TransferList />} />
        <Route path="/transfers/new" element={<TransferForm />} />

        {/* PAYROLL */}
        <Route path="/payroll" element={<PayrollCycles />} />
        <Route path="/payroll/:cycleId" element={<PayslipList />} />
        <Route path="/payroll/:cycleId/generate" element={<PayrollGenerate />} />

        {/* REPORTS */}
        <Route path="/reports" element={<ReportsDashboard />} />
      </Route>

      {/* ================= FALLBACK ================= */}
      <Route
        path="*"
        element={
          role === "employee"
            ? <Navigate to="/employee/dashboard" />
            : <Navigate to="/dashboard" />
        }
      />

    </Routes>
  );
}
