import { supabase } from "../app/supabase";

/* =========================
   READ
========================= */

export const getAttendance = async () => {
  const { data, error } = await supabase
    .from("attendance")
    .select(`
      id,
      attendance_date,
      check_in,
      check_out,
      status,
      employees (
        id,
        full_name
      )
    `)
    .order("attendance_date", { ascending: false });

  if (error) throw error;
  return data;
};

export const getAttendanceById = async (id) => {
  const { data, error } = await supabase
    .from("attendance")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
};

/* =========================
   CREATE
========================= */

export const createAttendance = async (payload) => {
  const { error } = await supabase.from("attendance").insert({
    employee_id: payload.employee_id,
    attendance_date: payload.attendance_date,
    check_in: payload.check_in || null,
    check_out: payload.check_out || null,
    status: payload.status,
  });

  if (error) throw error;
};

/* =========================
   UPDATE
========================= */

export const updateAttendance = async (id, payload) => {
  const { error } = await supabase
    .from("attendance")
    .update({
      employee_id: payload.employee_id,
      attendance_date: payload.attendance_date,
      check_in: payload.check_in || null,
      check_out: payload.check_out || null,
      status: payload.status,
    })
    .eq("id", id);

  if (error) throw error;
};

/* =========================
   DELETE
========================= */

export const deleteAttendance = async (id) => {
  const { error } = await supabase
    .from("attendance")
    .delete()
    .eq("id", id);

  if (error) throw error;
};
