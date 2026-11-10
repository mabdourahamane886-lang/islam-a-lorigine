import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://okdohokhlkxrmxpevees.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "sb_publishable_EiTruyR5fwwHpS_PzO5_iA_d1i4iMCP";

let client: SupabaseClient | null = null;

export function getSupabaseBrowserClient() {
  if (!supabaseUrl || !supabaseKey) return null;
  if (!client) {
    client = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storageKey: "islam-a-lorigine-auth"
      }
    });
  }
  return client;
}
