import { supabase } from "../app/supabase";

/* =======================
   EMPLOYEE DISTRIBUTION
======================= */
export const getEmployeeDistribution = async () => {
  const { data, error } = await supabase
    .from("profiles")
    .select("role");

  if (error) throw error;

  const map = {};
  data.forEach(r => {
    map[r.role] = (map[r.role] || 0) + 1;
  });

  return Object.entries(map).map(([role, count]) => ({
    role,
    count,
  }));
};

/* =======================
   ATTENDANCE TREND
======================= */
export const getAttendanceTrend = async () => {
  const { data, error } = await supabase
    .from("attendance")
    .select("attendance_date, status");

  if (error) throw error;

  const map = {};
  data.forEach(a => {
    const d = a.attendance_date;
    if (!map[d]) map[d] = { date: d, present: 0 };
    if (a.status === "present") map[d].present++;
  });

  return Object.values(map);
};

/* =======================
   LEAVE STATUS
======================= */
export const getLeaveStatus = async () => {
  const { data, error } = await supabase
    .from("leave_requests")
    .select("status");

  if (error) throw error;

  const stats = { pending: 0, approved: 0, rejected: 0 };
  data.forEach(l => stats[l.status]++);

  return Object.entries(stats).map(([name, value]) => ({
    name,
    value,
  }));
};

/* =======================
   PAYROLL TREND
======================= */
export const getPayrollTrend = async () => {
  const { data, error } = await supabase
    .from("payslips")
    .select(`
      net_pay,
      payroll_cycles ( month, year )
    `);

  if (error) throw error;

  const map = {};
  data.forEach(p => {
    const key = `${p.payroll_cycles.month}/${p.payroll_cycles.year}`;
    map[key] = (map[key] || 0) + p.net_pay;
  });

  return Object.entries(map).map(([period, amount]) => ({
    period,
    amount,
  }));
};

/* =======================
   GRIEVANCE SLA
======================= */
export const getGrievanceStats = async () => {
  const { data, error } = await supabase
    .from("grievances")
    .select("status, sla_deadline");

  if (error) throw error;

  let open = 0, resolved = 0, breached = 0;
  const now = new Date();

  data.forEach(g => {
    if (g.status === "resolved") resolved++;
    else {
      open++;
      if (g.sla_deadline && new Date(g.sla_deadline) < now) breached++;
    }
  });

  return [
    { name: "Open", value: open },
    { name: "Resolved", value: resolved },
    { name: "SLA Breached", value: breached },
  ];
};

/* =======================
   TRANSFER STATUS
======================= */
export const getTransferStats = async () => {
  const { data, error } = await supabase
    .from("transfer_requests")
    .select("status");

  if (error) throw error;

  const stats = { pending: 0, approved: 0, rejected: 0 };
  data.forEach(t => stats[t.status]++);

  return Object.entries(stats).map(([name, value]) => ({
    name,
    value,
  }));
};
