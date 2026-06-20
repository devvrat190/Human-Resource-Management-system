import { supabase } from "../app/supabase";

/* =====================
   GRIEVANCES
===================== */

export const getGrievances = async () => {
  const { data, error } = await supabase
    .from("grievances")
    .select(`
      id,
      category,
      description,
      status,
      sla_deadline,
      created_at,
      employees (
        id,
        full_name
      )
    `)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

export const getGrievanceById = async (id) => {
  const { data, error } = await supabase
    .from("grievances")
    .select(`
      id,
      category,
      description,
      status,
      sla_deadline,
      created_at,
      employee_id,
      employees (
        full_name
      )
    `)
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
};

export const createGrievance = async (payload) => {
  const { error } = await supabase.from("grievances").insert({
    employee_id: payload.employee_id,
    category: payload.category,
    description: payload.description,
    sla_deadline: payload.sla_deadline || null,
  });

  if (error) throw error;
};

export const updateGrievanceStatus = async (id, status) => {
  const { error } = await supabase
    .from("grievances")
    .update({ status })
    .eq("id", id);

  if (error) throw error;
};

/* =====================
   GRIEVANCE UPDATES
===================== */

export const getGrievanceUpdates = async (grievanceId) => {
  const { data, error } = await supabase
    .from("grievance_updates")
    .select(`
      id,
      message,
      created_at,
      profiles (
        email
      )
    `)
    .eq("grievance_id", grievanceId)
    .order("created_at");

  if (error) throw error;
  return data;
};

export const addGrievanceUpdate = async (
  grievanceId,
  message,
  profileId
) => {
  const { error } = await supabase.from("grievance_updates").insert({
    grievance_id: grievanceId,
    message,
    updated_by_profile_id: profileId,
  });

  if (error) throw error;
};
