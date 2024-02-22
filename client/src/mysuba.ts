import { SupabaseClient, createClient } from "@supabase/supabase-js";

const key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1laHZsaHZmaHdoY3l3d3pvY2tzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM3NzY5MjMsImV4cCI6MjAxOTM1MjkyM30.ZezQuFJcQbwvITm-OHiPdlwszH_cU5jCpWH6EQ7MS6k";
const SUPABASE_URL = "https://mehvlhvfhwhcywwzocks.supabase.co";

export const mySupabase = createClient(SUPABASE_URL, key);
