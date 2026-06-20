import { createClient } from "@supabase/supabase-js";

/*
  ⚠️ Put these in a .env file later
  For now, you can keep them here for demo
*/

const SUPABASE_URL ="https://erbwhdogmoprhhtcxvqt.supabase.co";
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVyYndoZG9nbW9wcmhodGN4dnF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc5NjM3NzgsImV4cCI6MjA4MzUzOTc3OH0.rj0OkKsW4t-RhZ3Esb_gjpFGnD1H_Es99rRLRnCwKD0';

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);
