import supabase from "../config/supabase.js";
import { getIO } from "../config/socket.js";
import { createActivityLog } from "../services/activityLogService.js";

export const undoAutomationAction = async (req, res) => {
  try {
    const userId = req.user.id;
    const { historyId } = req.params;

    if (!historyId) {
      return res.status(400).json({
        success: false,
        message: "History ID is required.",
      });
    }

    const { data: history, error: historyError } = await supabase
      .from("ai_automation_history")
      .select("*")
      .eq("id", historyId)
      .eq("user_id", userId)
      .single();

    if (historyError || !history) {
      return res.status(404).json({
        success: false,
        message: "Automation history record not found.",
      });
    }

    if (!history.can_undo) {
      return res.status(400).json({
        success: false,
        message: "This automation action cannot be undone.",
      });
    }

    if (history.undone) {
      return res.status(400).json({
        success: false,
        message: "This automation action has already been undone.",
      });
    }

    if (!history.entity_id || history.entity_type !== "task") {
      return res.status(400).json({
        success: false,
        message: "Only task changes can currently be undone.",
      });
    }

    const previousData = history.previous_data;

    if (!previousData) {
      return res.status(400).json({
        success: false,
        message: "Previous task state is unavailable.",
      });
    }

    const { data: existingTask, error: taskError } = await supabase
      .from("tasks")
      .select("*")
      .eq("id", history.entity_id)
      .eq("project_id", history.project_id)
      .eq("user_id", userId)
      .single();

    if (taskError || !existingTask) {
      return res.status(404).json({
        success: false,
        message: "Task no longer exists.",
      });
    }

    const restoreData = {
      title: previousData.title,
      description: previousData.description,
      status: previousData.status,
      priority: previousData.priority,
      due_date: previousData.due_date,
      completed: previousData.completed,
      assignee: previousData.assignee,
    };

    const { data: restoredTask, error: restoreError } = await supabase
      .from("tasks")
      .update(restoreData)
      .eq("id", history.entity_id)
      .eq("project_id", history.project_id)
      .eq("user_id", userId)
      .select()
      .single();

    if (restoreError) {
      console.error("Task rollback error:", restoreError);

      return res.status(500).json({
        success: false,
        message: "Failed to restore the previous task state.",
      });
    }

    await supabase
      .from("ai_automation_history")
      .update({
        undone: true,
        undone_at: new Date().toISOString(),
      })
      .eq("id", history.id)
      .eq("user_id", userId);

    await createActivityLog({
      userId,
      projectId: history.project_id,
      action: "updated",
      entityType: "task",
      entityId: restoredTask.id,
      description: `Undid AI automation change for task "${restoredTask.title}"`,
      metadata: {
        source: "ai_automation_undo",
        historyId: history.id,
      },
    });

    try {
      getIO().emit("taskUpdated", restoredTask);
    } catch (socketError) {
      console.warn(
        "Task rollback socket event skipped:",
        socketError.message
      );
    }

    return res.status(200).json({
      success: true,
      message: `Automation change for "${restoredTask.title}" was undone.`,
      task: restoredTask,
      historyId: history.id,
    });
  } catch (error) {
    console.error("Undo automation error:", error);

    return res.status(500).json({
      success: false,
      message:
        error.message || "Failed to undo automation action.",
    });
  }
};