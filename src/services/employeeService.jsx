import { supabase } from "../app/supabase";

/* =====================================================
   READ
   ===================================================== */

export const getEmployees = async () => {
  const { data, error } = await supabase
    .from("employees")
    .select(`
      id,
      full_name,
      phone,
      address,
      created_at,
      profiles (
        id,
        employee_code,
        email,
        role,
        designation,
        status,
        department_id,
        zone_id
      )
    `)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

export const getEmployeeById = async (id) => {
  const { data, error } = await supabase
    .from("employees")
    .select(`
      id,
      full_name,
      phone,
      address,
      created_at,
      profiles (
        id,
        employee_code,
        email,
        role,
        designation,
        status,
        department_id,
        zone_id
      )
    `)
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
};


/* =====================================================
   CREATE
   ===================================================== */

export const createEmployee = async (payload) => {
  /**
   * payload expected:
   * {
   *   full_name,
   *   phone,
   *   address,
   *   email,
   *   password,
   *   role,
   *   department_id,
   *   zone_id,
   *   designation
   * }
   */

  // 1️⃣ Create profile
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .insert({
      employee_code: `MCD-${Date.now()}`,
      email: payload.email,
      password: payload.password,
      role: payload.role,
      department_id: payload.department_id,
      zone_id: payload.zone_id,
      designation: payload.designation,
      status: "active",
    })
    .select()
    .single();

  if (profileError) throw profileError;

  // 2️⃣ Create employee
  const { error: employeeError } = await supabase.from("employees").insert({
    profile_id: profile.id,
    full_name: payload.full_name,
    phone: payload.phone,
    address: payload.address,
  });

  if (employeeError) throw employeeError;
};


/* =====================================================
   UPDATE
   ===================================================== */

export const updateEmployee = async (employeeId, updates) => {
  /**
   * updates can contain:
   * {
   *   full_name,
   *   phone,
   *   address,
   *   role,
   *   department_id,
   *   zone_id,
   *   designation,
   *   status
   * }
   */

  // 1️⃣ Update employee table
  const employeeUpdates = {
    full_name: updates.full_name,
    phone: updates.phone,
    address: updates.address,
  };

  await supabase
    .from("employees")
    .update(employeeUpdates)
    .eq("id", employeeId);

  // 2️⃣ Update profile table (via profile_id)
  const { data: employee } = await supabase
    .from("employees")
    .select("profile_id")
    .eq("id", employeeId)
    .single();

  const profileUpdates = {
    role: updates.role,
    department_id: updates.department_id,
    zone_id: updates.zone_id,
    designation: updates.designation,
    status: updates.status,
  };

  const { error } = await supabase
    .from("profiles")
    .update(profileUpdates)
    .eq("id", employee.profile_id);

  if (error) throw error;
};


/* =====================================================
   DELETE
   ===================================================== */

export const deleteEmployee = async (employeeId) => {
  // Get profile_id first
  const { data: employee } = await supabase
    .from("employees")
    .select("profile_id")
    .eq("id", employeeId)
    .single();

  // Delete employee (CASCADE will NOT delete profile automatically)
  await supabase.from("employees").delete().eq("id", employeeId);

  // Delete profile
  await supabase.from("profiles").delete().eq("id", employee.profile_id);
};
