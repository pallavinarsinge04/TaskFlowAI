import supabase from "../config/supabase.js";

export const getDashboardAnalytics = async (req, res) => {

  try {

    // Total Projects
    const { count: totalProjects } = await supabase
      .from("projects")
      .select("*", { count: "exact", head: true });

    // Total Tasks
    const { count: totalTasks } = await supabase
      .from("tasks")
      .select("*", { count: "exact", head: true });

    // Completed Tasks
    const { count: completedTasks } = await supabase
      .from("tasks")
      .select("*", { count: "exact", head: true })
      .eq("status", "Completed");

    // Recent Projects
    const { data: recentProjects } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5);

    // Recent Tasks
    const { data: recentTasks } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10);

    res.json({
      totalProjects,
      totalTasks,
      completedTasks,
      recentProjects,
      recentTasks,
    });

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

};