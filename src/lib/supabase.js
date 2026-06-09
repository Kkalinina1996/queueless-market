import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://okoqwbswvketsqhvgbei.supabase.co";

const supabaseKey =
  "sb_publishable_5mEyNycxSZRpMT-XnsvKzQ_aRx0VZGF";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);