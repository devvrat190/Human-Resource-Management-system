import { supabase } from "../app/supabase";

/* =====================
   PAYROLL CYCLES
===================== */

export const getPayrollCycles = async () => {
  const { data, error } = await supabase
    .from("payroll_cycles")
    .select("*")
    .order("year", { ascending: false })
    .order("month", { ascending: false });

  if (error) throw error;
  return data;
};

export const createPayrollCycle = async (month, year) => {
  const { error } = await supabase.from("payroll_cycles").insert({
    month,
    year,
    status: "processing",
  });

  if (error) throw error;
};

export const finalizePayrollCycle = async (cycleId) => {
  const { data, error } = await supabase
    .from("payroll_cycles")
    .update({ status: "finalized" })
    .eq("id", cycleId)
    .select();

  if (error) throw error;
  return data;
};


/* =====================
   PAYSLIPS
===================== */

export const getPayslipsByCycle = async (cycleId) => {
  const { data, error } = await supabase
    .from("payslips")
    .select(`
      id,
      net_pay,
      payslip_url,
      created_at,
      employees (
        id,
        full_name
      )
    `)
    .eq("payroll_cycle_id", cycleId);

  if (error) throw error;
  return data;
};

export const generatePayslip = async (payload) => {
  const { error } = await supabase.from("payslips").insert({
    employee_id: payload.employee_id,
    payroll_cycle_id: payload.payroll_cycle_id,
    net_pay: payload.net_pay,
    payslip_url: null,
  });

  if (error) throw error;
};
