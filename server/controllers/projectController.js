import supabase from "../config/supabase.js";
import { getIO } from "../config/socket.js";
import { createActivityLog } from "../services/activityLogService.js";

// =========================
// Get all projects
// =========================

export const getProjects = async (req, res) => {
  try {
    const userId = req.user.id;

    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("owner", userId)
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error("Supabase Get Projects Error:", error);

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    return res.json({
      success: true,
      projects: data || [],
    });
  } catch (err) {
    console.error("Get Projects Error:", err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =========================
// Get project by ID
// =========================

export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Project ID is required.",
      });
    }

    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .eq("owner", userId)
      .single();

    if (error || !data) {
      return res.status(404).json({
        success: false,
        message: "Project not found.",
      });
    }

    return res.json({
      success: true,
      project: data,
    });
  } catch (err) {
    console.error("Get Project By ID Error:", err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =========================
// Create project
// =========================

export const createProject = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      name,
      description = "",
      status = "Planning",
      priority = "Medium",
      startDate = null,
      endDate = null,
      teamMembers = [],
      progress = 0,
    } = req.body;

    if (!name?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Project name is required.",
      });
    }

    const { data, error } = await supabase
      .from("projects")
      .insert([
        {
          owner: userId,
          name: name.trim(),
          description,
          status,
          priority,
          start_date: startDate || null,
          end_date: endDate || null,
          team_members: teamMembers,
          progress: Number(progress) || 0,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase Create Project Error:", error);

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    // =========================
    // Activity Log
    // =========================

    await createActivityLog({
      userId,
      projectId: data.id,
      action: "created",
      entityType: "project",
      entityId: data.id,
      description: `Created project "${data.name}"`,
      metadata: {
        projectName: data.name,
        status: data.status,
        priority: data.priority,
      },
    });

    // =========================
    // Realtime Socket Event
    // =========================

    try {
      getIO().emit("projectCreated", data);
    } catch (socketError) {
      console.warn(
        "Socket event skipped:",
        socketError.message
      );
    }

    return res.status(201).json({
      success: true,
      project: data,
    });
  } catch (err) {
    console.error("Create Project Error:", err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =========================
// Update project
// =========================

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Project ID is required.",
      });
    }

    const {
      name,
      description,
      status,
      priority,
      startDate,
      endDate,
      teamMembers,
      progress,
    } = req.body;

    const updateData = {};

    if (name !== undefined) {
      if (!name.trim()) {
        return res.status(400).json({
          success: false,
          message: "Project name cannot be empty.",
        });
      }

      updateData.name = name.trim();
    }

    if (description !== undefined) {
      updateData.description = description;
    }

    if (status !== undefined) {
      updateData.status = status;
    }

    if (priority !== undefined) {
      updateData.priority = priority;
    }

    if (startDate !== undefined) {
      updateData.start_date = startDate || null;
    }

    if (endDate !== undefined) {
      updateData.end_date = endDate || null;
    }

    if (teamMembers !== undefined) {
      updateData.team_members = teamMembers;
    }

    if (progress !== undefined) {
      updateData.progress = Number(progress) || 0;
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No project data provided for update.",
      });
    }

    const { data, error } = await supabase
      .from("projects")
      .update(updateData)
      .eq("id", id)
      .eq("owner", userId)
      .select()
      .single();

    if (error || !data) {
      console.error("Supabase Update Project Error:", error);

      return res.status(500).json({
        success: false,
        message: error?.message || "Project update failed.",
      });
    }

    // =========================
    // Activity Log
    // =========================

    await createActivityLog({
      userId,
      projectId: data.id,
      action: "updated",
      entityType: "project",
      entityId: data.id,
      description: `Updated project "${data.name}"`,
      metadata: {
        updatedFields: Object.keys(updateData),
      },
    });

    // =========================
    // Realtime Socket Event
    // =========================

    try {
      getIO().emit("projectUpdated", data);
    } catch (socketError) {
      console.warn(
        "Socket event skipped:",
        socketError.message
      );
    }

    return res.json({
      success: true,
      message: "Project updated successfully.",
      project: data,
    });
  } catch (err) {
    console.error("Update Project Error:", err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =========================
// Delete project
// =========================

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Project ID is required.",
      });
    }

    // =========================
    // Get project before deleting
    // =========================

    const { data: project, error: projectError } = await supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .eq("owner", userId)
      .single();

    if (projectError || !project) {
      return res.status(404).json({
        success: false,
        message: "Project not found.",
      });
    }

    // =========================
    // Delete project
    // =========================

    const { data, error } = await supabase
      .from("projects")
      .delete()
      .eq("id", id)
      .eq("owner", userId)
      .select()
      .single();

    if (error) {
      console.error(
        "Supabase Delete Project Error:",
        error
      );

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    // =========================
    // Activity Log
    // =========================

    await createActivityLog({
      userId,
      projectId: project.id,
      action: "deleted",
      entityType: "project",
      entityId: project.id,
      description: `Deleted project "${project.name}"`,
      metadata: {
        projectName: project.name,
      },
    });

    // =========================
    // Realtime Socket Event
    // =========================

    try {
      getIO().emit("projectDeleted", id);
    } catch (socketError) {
      console.warn(
        "Socket event skipped:",
        socketError.message
      );
    }

    return res.json({
      success: true,
      message: "Project deleted successfully.",
      project: data,
    });
  } catch (err) {
    console.error("Delete Project Error:", err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};