import { supabase } from "../app/supabase";

/* ================= LOAD RAW DATA ================= */

export const loadAdminContextData = async () => {
  const [
    employees,
    attendance,
    leaves,
    grievances,
    transfers,
    payroll,
  ] = await Promise.all([
    supabase.from("profiles").select("role, status"),
    supabase.from("attendance").select("status"),
    supabase.from("leave_requests").select("status"),
    supabase.from("grievances").select("status"),
    supabase.from("transfer_requests").select("status"),
    supabase.from("payslips").select("id"),
  ]);

  return {
    employees: employees.data || [],
    attendance: attendance.data || [],
    leaves: leaves.data || [],
    grievances: grievances.data || [],
    transfers: transfers.data || [],
    payroll: payroll.data || [],
  };
};

/* ================= BUILD CONTEXT ================= */

export const buildContext = (data) => {
  const countBy = (arr, key) =>
    arr.reduce((acc, x) => {
      acc[x[key]] = (acc[x[key]] || 0) + 1;
      return acc;
    }, {});

  const roleCounts = countBy(data.employees, "role");
  const empStatus = countBy(data.employees, "status");
  const attendanceStatus = countBy(data.attendance, "status");
  const leaveStatus = countBy(data.leaves, "status");
  const grievanceStatus = countBy(data.grievances, "status");
  const transferStatus = countBy(data.transfers, "status");

  return `
You are an HRMS assistant for the Municipal Corporation of Delhi.

Use ONLY the following system data to answer questions.

Employees:
- Total: ${data.employees.length}
- Active: ${empStatus.active || 0}
- Role distribution: ${JSON.stringify(roleCounts)}

Attendance:
- Present: ${attendanceStatus.present || 0}
- Absent: ${attendanceStatus.absent || 0}
- Late: ${attendanceStatus.late || 0}

Leaves:
- Pending: ${leaveStatus.pending || 0}
- Approved: ${leaveStatus.approved || 0}

Grievances:
- Open: ${grievanceStatus.open || 0}
- In Progress: ${grievanceStatus.in_progress || 0}

Transfers:
- Pending: ${transferStatus.pending || 0}

Payroll:
- Payslips generated: ${data.payroll.length}

Give data in presentable format.
If data is not available, respond with "Data not available".
`;
};
