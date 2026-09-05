import supabase from "../config/supabase.js";
import { getIO } from "../config/socket.js";
import { createActivityLog } from "../services/activityLogService.js";

// ============================================
// GET ALL TASKS
// ============================================
export const getTasks = async (req, res) => {
  try {
    const userId = req.user.id;

    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Get Tasks Error:", error);

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      tasks: data || [],
    });
  } catch (error) {
    console.error("Get Tasks Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================================
// GET SINGLE TASK
// ============================================
export const getTaskById = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Task ID is required.",
      });
    }

    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("id", id)
      .eq("user_id", userId)
      .single();

    if (error || !data) {
      return res.status(404).json({
        success: false,
        message: "Task not found.",
      });
    }

    return res.status(200).json({
      success: true,
      task: data,
    });
  } catch (error) {
    console.error("Get Task Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================================
// CREATE TASK
// ============================================
export const createTask = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      projectId,
      title,
      description = "",
      priority = "Medium",
      status = "Pending",
      dueDate = null,
      assignee = "",
      completed = false,
    } = req.body;

    // Validate title
    if (!title?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Task title is required.",
      });
    }

    // Validate project
    if (!projectId) {
      return res.status(400).json({
        success: false,
        message: "Project is required.",
      });
    }

    // Make sure project belongs to current user
    const { data: project, error: projectError } = await supabase
      .from("projects")
      .select("id")
      .eq("id", projectId)
      .eq("owner", userId)
      .single();

    if (projectError || !project) {
      return res.status(404).json({
        success: false,
        message: "Project not found.",
      });
    }

    // Create task
    const { data, error } = await supabase
      .from("tasks")
      .insert([
        {
          project_id: projectId,
          user_id: userId,
          title: title.trim(),
          description,
          priority,
          status,
          due_date: dueDate || null,
          assignee: assignee || "",
          completed: Boolean(completed),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Create Task Error:", error);

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    // ============================================
    // ACTIVITY LOG - TASK CREATED
    // ============================================
    await createActivityLog({
      userId,
      projectId: data.project_id,
      action: "created",
      entityType: "task",
      entityId: data.id,
      description: `Created task "${data.title}"`,
      metadata: {
        priority: data.priority,
        status: data.status,
        assignee: data.assignee || "",
      },
    });

    // ============================================
    // SOCKET.IO REALTIME EVENT
    // ============================================
    try {
      getIO().emit("taskCreated", data);
    } catch (socketError) {
      console.warn(
        "Task socket event skipped:",
        socketError.message
      );
    }

    return res.status(201).json({
      success: true,
      message: "Task created successfully.",
      task: data,
    });
  } catch (error) {
    console.error("Create Task Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================================
// UPDATE TASK
// ============================================
export const updateTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Task ID is required.",
      });
    }

    const {
      title,
      description,
      priority,
      status,
      dueDate,
      assignee,
      completed,
    } = req.body;

    const updateData = {};

    if (title !== undefined) {
      if (!title.trim()) {
        return res.status(400).json({
          success: false,
          message: "Task title cannot be empty.",
        });
      }

      updateData.title = title.trim();
    }

    if (description !== undefined) {
      updateData.description = description;
    }

    if (priority !== undefined) {
      updateData.priority = priority;
    }

    if (status !== undefined) {
      updateData.status = status;
    }

    if (dueDate !== undefined) {
      updateData.due_date = dueDate || null;
    }

    if (assignee !== undefined) {
      updateData.assignee = assignee;
    }

    if (completed !== undefined) {
      updateData.completed = Boolean(completed);
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No fields provided for update.",
      });
    }

    const { data, error } = await supabase
      .from("tasks")
      .update(updateData)
      .eq("id", id)
      .eq("user_id", userId)
      .select()
      .single();

    if (error || !data) {
      console.error("Update Task Error:", error);

      return res.status(404).json({
        success: false,
        message: "Task not found or update failed.",
      });
    }

    // ============================================
    // ACTIVITY LOG - TASK UPDATED
    // ============================================
    await createActivityLog({
      userId,
      projectId: data.project_id,
      action: "updated",
      entityType: "task",
      entityId: data.id,
      description: `Updated task "${data.title}"`,
      metadata: {
        updatedFields: Object.keys(updateData),
        priority: data.priority,
        status: data.status,
        assignee: data.assignee || "",
      },
    });

    // ============================================
    // SOCKET.IO REALTIME EVENT
    // ============================================
    try {
      getIO().emit("taskUpdated", data);
    } catch (socketError) {
      console.warn(
        "Task socket event skipped:",
        socketError.message
      );
    }

    return res.status(200).json({
      success: true,
      message: "Task updated successfully.",
      task: data,
    });
  } catch (error) {
    console.error("Update Task Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================================
// UPDATE TASK STATUS
// ============================================
export const updateStatus = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required.",
      });
    }

    const completed = status === "Completed";

    const { data, error } = await supabase
      .from("tasks")
      .update({
        status,
        completed,
      })
      .eq("id", id)
      .eq("user_id", userId)
      .select()
      .single();

    if (error || !data) {
      return res.status(404).json({
        success: false,
        message: "Task not found.",
      });
    }

    // ============================================
    // ACTIVITY LOG - STATUS CHANGED
    // ============================================
    await createActivityLog({
      userId,
      projectId: data.project_id,
      action: "status_changed",
      entityType: "task",
      entityId: data.id,
      description: `Changed task "${data.title}" status to ${data.status}`,
      metadata: {
        status: data.status,
        completed: data.completed,
      },
    });

    // ============================================
    // SOCKET.IO REALTIME EVENT
    // ============================================
    try {
      getIO().emit("taskUpdated", data);
    } catch (socketError) {
      console.warn(
        "Task status socket event skipped:",
        socketError.message
      );
    }

    return res.status(200).json({
      success: true,
      message: "Task status updated successfully.",
      task: data,
    });
  } catch (error) {
    console.error("Update Task Status Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================================
// DELETE TASK
// ============================================
export const deleteTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Task ID is required.",
      });
    }

    // ============================================
    // GET TASK BEFORE DELETE
    // ============================================
    const { data: task, error: taskError } = await supabase
      .from("tasks")
      .select("*")
      .eq("id", id)
      .eq("user_id", userId)
      .single();

    if (taskError || !task) {
      return res.status(404).json({
        success: false,
        message: "Task not found.",
      });
    }

    // ============================================
    // DELETE TASK
    // ============================================
    const { error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", id)
      .eq("user_id", userId);

    if (error) {
      console.error("Delete Task Error:", error);

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    // ============================================
    // ACTIVITY LOG - TASK DELETED
    // ============================================
    await createActivityLog({
      userId,
      projectId: task.project_id,
      action: "deleted",
      entityType: "task",
      entityId: task.id,
      description: `Deleted task "${task.title}"`,
      metadata: {
        priority: task.priority,
        status: task.status,
      },
    });

    // ============================================
    // SOCKET.IO REALTIME EVENT
    // ============================================
    try {
      getIO().emit("taskDeleted", task.id);
    } catch (socketError) {
      console.warn(
        "Task delete socket event skipped:",
        socketError.message
      );
    }

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully.",
      taskId: task.id,
    });
  } catch (error) {
    console.error("Delete Task Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};