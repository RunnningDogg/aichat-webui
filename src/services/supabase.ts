import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://sznkuwulhonfilpwdley.supabase.co";
// const supabaseKey = import.meta.env.SUPABASE_KEY;
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6bmt1d3VsaG9uZmlscHdkbGV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTUxMTYzMjgsImV4cCI6MjAxMDY5MjMyOH0.GHAQf73QAC51bHwmmtXzPifjM64A_hu9GKKafCIsNSc";
console.log(import.meta.env.VITE_SUPABASE_KEY);
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
