import { createClient } from "@supabase/supabase-js";

const key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRwbm5ybmVvZmVudW9rYnZwdmFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc3MTgwODgsImV4cCI6MjA1MzI5NDA4OH0.pRfS-AZmxhn55JloUJVKiYe2kq_PHzza9rqoAakOkzE";
const SUPABASE_URL = "https://dpnnrneofenuokbvpvab.supabase.co";

export const mySupabase = createClient(SUPABASE_URL, key);
