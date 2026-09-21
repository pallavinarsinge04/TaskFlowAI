import supabase from "../config/supabase.js";

export const getAutomationAnalytics = async (req, res) => {
  try {
    const userId = req.user.id;
    const { projectId } = req.params;

    if (!projectId) {
      return res.status(400).json({
        success: false,
        message: "Project ID is required.",
      });
    }

    const { data: history, error } = await supabase
      .from("ai_automation_history")
      .select(`
        id,
        action_type,
        status,
        can_undo,
        undone,
        created_at
      `)
      .eq("project_id", projectId)
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Automation analytics error:", error);

      return res.status(500).json({
        success: false,
        message: "Failed to load automation analytics.",
      });
    }

    const records = history || [];

    const totalActions = records.length;

    const successfulActions = records.filter(
      (item) => item.status === "success"
    ).length;

    const failedActions = records.filter(
      (item) => item.status === "failed"
    ).length;

    const undoneActions = records.filter(
      (item) => item.undone === true
    ).length;

    const undoableActions = records.filter(
      (item) => item.can_undo === true && !item.undone
    ).length;

    const successRate =
      totalActions > 0
        ? Math.round((successfulActions / totalActions) * 100)
        : 0;

    const actionBreakdown = {};

    records.forEach((item) => {
      const type = item.action_type || "unknown";

      actionBreakdown[type] =
        (actionBreakdown[type] || 0) + 1;
    });

    const breakdown = Object.entries(actionBreakdown).map(
      ([type, count]) => ({
        type,
        count,
      })
    );

    return res.status(200).json({
      success: true,
      analytics: {
        totalActions,
        successfulActions,
        failedActions,
        undoneActions,
        undoableActions,
        successRate,
        breakdown,
        recentActivity: records.slice(0, 10),
      },
    });
  } catch (error) {
    console.error("Get automation analytics error:", error);

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to load automation analytics.",
    });
  }
};