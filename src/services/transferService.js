import { supabase } from "../app/supabase";

/* =====================
   READ
===================== */

export const getTransfers = async () => {
  const { data, error } = await supabase
    .from("transfer_requests")
    .select(`
      id,
      reason,
      status,
      created_at,

      employees (
        id,
        full_name
      ),

      from_department:departments!transfer_requests_from_department_fkey (
        id,
        name
      ),

      to_department:departments!transfer_requests_to_department_fkey (
        id,
        name
      ),

      from_zone:zones!transfer_requests_from_zone_fkey (
        id,
        name
      ),

      to_zone:zones!transfer_requests_to_zone_fkey (
        id,
        name
      )
    `)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

/* =====================
   CREATE REQUEST
===================== */

export const createTransferRequest = async (payload) => {
  const { error } = await supabase.from("transfer_requests").insert({
    employee_id: payload.employee_id,
    from_department: payload.from_department,
    to_department: payload.to_department,
    from_zone: payload.from_zone,
    to_zone: payload.to_zone,
    reason: payload.reason,
  });

  if (error) throw error;
};

/* =====================
   APPROVE / REJECT
===================== */

export const approveTransfer = async (
  transferId,
  status,
  approverProfileId
) => {
  // 1️⃣ Update main transfer status
  const { error } = await supabase
    .from("transfer_requests")
    .update({ status })
    .eq("id", transferId);

  if (error) throw error;

  // 2️⃣ Insert approval record
  const { error: approvalError } = await supabase
    .from("transfer_approvals")
    .insert({
      transfer_id: transferId,
      approver_profile_id: approverProfileId,
      status,
    });

  if (approvalError) throw approvalError;
};
