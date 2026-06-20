import { supabase } from "../app/supabase";

export const getZones = async () => {
  const { data, error } = await supabase
    .from("zones")
    .select("id, name")
    .order("name");

  if (error) throw error;
  return data;
};
