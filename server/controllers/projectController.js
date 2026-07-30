import supabase from "../config/supabase.js";
import { getIO } from "../config/socket.js";

// =========================
// Get all projects
// =========================

export const getProjects = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    return res.json({
      success: true,
      projects: data,
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
// Create project
// =========================

export const createProject = async (req, res) => {
  try {
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
// Delete project
// =========================

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Project ID is required.",
      });
    }

    const { data, error } = await supabase
      .from("projects")
      .delete()
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Supabase Delete Project Error:", error);

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

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