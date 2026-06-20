import { supabase } from "../app/supabase";

/* =====================
   READ
===================== */

export const getLeaves = async () => {
  const { data, error } = await supabase
    .from("leave_requests")
    .select(`
      id,
      start_date,
      end_date,
      reason,
      status,
      created_at,

      employees (
        id,
        full_name
      ),

      leave_types (
        id,
        name,
        max_days
      ),

      approved_by:profiles (
        id,
        email
      )
    `)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

export const getLeaveById = async (id) => {
  const { data, error } = await supabase
    .from("leave_requests")
    .select(`
      id,
      employee_id,
      leave_type_id,
      start_date,
      end_date,
      reason,
      status
    `)
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
};

/* =====================
   CREATE
===================== */

export const createLeave = async (payload) => {
  const { error } = await supabase.from("leave_requests").insert({
    employee_id: payload.employee_id,
    leave_type_id: payload.leave_type_id,
    start_date: payload.start_date,
    end_date: payload.end_date,
    reason: payload.reason,
  });

  if (error) throw error;
};

/* =====================
   APPROVE / REJECT
===================== */

export const updateLeaveStatus = async (
  leaveId,
  status,
  approvedByProfileId
) => {
  const { error } = await supabase
    .from("leave_requests")
    .update({
      status,
      approved_by_profile_id: approvedByProfileId,
    })
    .eq("id", leaveId);

  if (error) throw error;
};

/* =====================
   DELETE
===================== */

export const deleteLeave = async (id) => {
  const { error } = await supabase
    .from("leave_requests")
    .delete()
    .eq("id", id);

  if (error) throw error;
};

/* =====================
   LEAVE TYPES
===================== */

export const getLeaveTypes = async () => {
  const { data, error } = await supabase
    .from("leave_types")
    .select("id, name, max_days")
    .order("name");

  if (error) throw error;
  return data;
};
