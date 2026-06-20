import { supabase } from "../app/supabase";

export const getDashboardStats = async () => {
  const [
    employees,
    activeEmployees,
    pendingLeaves,
    openGrievances,
    pendingTransfers,
  ] = await Promise.all([
    supabase.from("employees").select("*", { count: "exact", head: true }),
    supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .eq("status", "active"),
    supabase
      .from("leave_requests")
      .select("*", { count: "exact", head: true })
      .eq("status", "pending"),
    supabase
      .from("grievances")
      .select("*", { count: "exact", head: true })
      .neq("status", "closed"),
    supabase
      .from("transfer_requests")
      .select("*", { count: "exact", head: true })
      .eq("status", "pending"),
  ]);

  return {
    totalEmployees: employees.count || 0,
    activeEmployees: activeEmployees.count || 0,
    pendingLeaves: pendingLeaves.count || 0,
    openGrievances: openGrievances.count || 0,
    pendingTransfers: pendingTransfers.count || 0,
  };
};
/* =====================================================
   EMPLOYEE DISTRIBUTION BY ROLE
   ===================================================== */
export const getEmployeeRoleDistribution = async () => {
  const { data, error } = await supabase
    .from("profiles")
    .select("role");

  if (error) throw error;

  // Aggregate on frontend
  const distribution = {};
  data.forEach((p) => {
    distribution[p.role] = (distribution[p.role] || 0) + 1;
  });

  return distribution;
};
/* =====================================================
   ATTENDANCE TREND (LAST N DAYS)
   ===================================================== */
export const getAttendanceTrend = async (days = 7) => {
  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - days);

  const { data, error } = await supabase
    .from("attendance")
    .select("attendance_date")
    .gte(
      "attendance_date",
      fromDate.toISOString().split("T")[0]
    );

  if (error) throw error;

  // Aggregate by date
  const trend = {};
  data.forEach((row) => {
    const day = row.attendance_date;
    trend[day] = (trend[day] || 0) + 1;
  });

  return trend;
};

