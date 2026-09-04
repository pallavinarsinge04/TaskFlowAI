import supabase from "../config/supabase.js";

export const getActivityLogs = async (req, res) => {
  try {
    const userId = req.user.id;
    const projectId = req.query.projectId;

    let query = supabase
      .from("activity_logs")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (projectId) {
      query = query.eq("project_id", projectId);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Get activity logs error:", error);

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      activities: data || [],
    });
  } catch (error) {
    console.error("Activity log controller error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load activity logs.",
    });
  }
};