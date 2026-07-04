import { supabase } from "../supabase/supabaseClient";

export async function updateProjectProgress(projectId) {

  // Get all tasks for this project
  const { data: tasks, error } = await supabase
    .from("tasks")
    .select("completed")
    .eq("project_id", projectId);

  if (error) {
    console.error(error.message);
    return;
  }

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const progress =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

  // Update project progress
  const { error: updateError } = await supabase
    .from("projects")
    .update({
      progress,
    })
    .eq("id", projectId);

  if (updateError) {
    console.error(updateError.message);
  }
}