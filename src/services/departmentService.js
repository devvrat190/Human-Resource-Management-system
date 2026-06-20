import { supabase } from "../app/supabase";

export const getDepartments = async () => {
  const { data, error } = await supabase
    .from("departments")
    .select("id, name")
    .order("name");

  if (error) throw error;
  return data;
};
