import { supabase } from "../app/supabase";

const getEmployeeId = () => localStorage.getItem("employee_id");

/* ================= ATTENDANCE ================= */

export const markAttendance = async ({ status, check_in, check_out }) => {
  const { error } = await supabase.from("attendance").insert({
    employee_id: getEmployeeId(),
    attendance_date: new Date().toISOString().split("T")[0],
    status,
    check_in,
    check_out,
  });

  if (error) throw error;
};

/* ================= LEAVE ================= */

export const applyLeave = async (payload) => {
  const { error } = await supabase.from("leave_requests").insert({
    employee_id: getEmployeeId(),
    leave_type_id: payload.leave_type_id,
    start_date: payload.start_date,
    end_date: payload.end_date,
    reason: payload.reason,
  });

  if (error) throw error;
};

/* ================= GRIEVANCE ================= */

export const createGrievance = async (payload) => {
  const { error } = await supabase.from("grievances").insert({
    employee_id: getEmployeeId(),
    category: payload.category,
    description: payload.description,
  });

  if (error) throw error;
};

/* ================= TRANSFER ================= */

export const applyTransfer = async (payload) => {
  const { error } = await supabase.from("transfer_requests").insert({
    employee_id: getEmployeeId(),
    from_department: payload.from_department,
    to_department: payload.to_department,
    from_zone: payload.from_zone,
    to_zone: payload.to_zone,
    reason: payload.reason,
  });

  if (error) throw error;
};
