import { supabase } from "../supabase/supabaseClient";

export async function logActivity(
  projectId,
  action,
  description
) {

  await supabase
    .from("activity_logs")
    .insert([
      {
        project_id: projectId,
        action,
        description,
      },
    ]);

}