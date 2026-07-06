import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qfltfsbyetzpkciyykqs.supabase.co";
const supabaseAnonKey = "sb_publishable_S6Yrva7-4l8tmcXUgzO4Tg_E13BmiK0";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);
