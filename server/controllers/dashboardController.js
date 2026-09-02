import supabase from "../config/supabase.js";

export const getDashboardStats = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required.",
      });
    }

    // --------------------------------------------------
    // Total projects
    // --------------------------------------------------

    const { count: totalProjects, error: projectsError } =
      await supabase
        .from("projects")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("owner", userId);

    if (projectsError) {
      console.error("Projects count error:", projectsError);

      return res.status(500).json({
        success: false,
        message: projectsError.message,
      });
    }

    // --------------------------------------------------
    // Total tasks
    // --------------------------------------------------

    const { count: totalTasks, error: tasksError } =
      await supabase
        .from("tasks")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("user", userId);

    if (tasksError) {
      console.error("Tasks count error:", tasksError);

      return res.status(500).json({
        success: false,
        message: tasksError.message,
      });
    }

    // --------------------------------------------------
    // Completed tasks
    // --------------------------------------------------

    const {
      count: completedTasks,
      error: completedTasksError,
    } = await supabase
      .from("tasks")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("user", userId)
      .eq("status", "Completed");

    if (completedTasksError) {
      console.error(
        "Completed tasks count error:",
        completedTasksError
      );

      return res.status(500).json({
        success: false,
        message: completedTasksError.message,
      });
    }

    // --------------------------------------------------
    // Productivity
    // --------------------------------------------------

    const productivity =
      totalTasks > 0
        ? Math.round((completedTasks / totalTasks) * 100)
        : 0;

    // --------------------------------------------------
    // Response
    // --------------------------------------------------

    return res.status(200).json({
      success: true,
      stats: {
        totalProjects: totalProjects || 0,
        totalTasks: totalTasks || 0,
        completedTasks: completedTasks || 0,
        productivity,
      },
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to fetch dashboard statistics.",
    });
  }
};