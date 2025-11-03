"use client";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string | undefined;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string | undefined;

export const getSupabaseClient = (): SupabaseClient | null => {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Supabase env vars not set: NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY");
    return null;
  }
  return createClient(supabaseUrl, supabaseAnonKey);
};
