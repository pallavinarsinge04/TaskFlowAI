import supabase from "../config/supabase.js";
import { getIO } from "../config/socket.js";
import { sendEmail } from "../services/emailService.js";

// =========================
// Get All Projects
// =========================

export const getProjects = async (req, res) => {

  try {

    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return res.status(500).json({
        message: error.message,
      });
    }

    res.json(data);

  } 
 catch (err) {

  console.error("Create Project Error:");
  console.error(err);

  res.status(500).json({
    message: err.message
  });

}

};

// =========================
// Create Project
// =========================

export const createProject = async (req, res) => {
  try {

    const {
      name,
      description,
      status,
      priority,
      startDate,
      endDate,
      teamMembers,
      progress
    } = req.body;

    const { data, error } = await supabase
      .from("projects")
      .insert([
        {
          name,
          description,
          status,
          priority,
          start_date: startDate,
          end_date: endDate,
          team_members: teamMembers,
          progress
        }
      ])
      .select()
      .single();

    if (error) {
      return res.status(500).json({
        message: error.message
      });
    }

    getIO().emit("projectCreated", data);

    res.status(201).json(data);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message
    });
  }
};
// =========================
// Delete Project
// =========================

export const deleteProject = async (req, res) => {

  try {

    const { error } = await supabase

      .from("projects")

      .delete()

      .eq("id", req.params.id);

    if (error) {

      return res.status(500).json({
        message: error.message
      });

    }

    getIO().emit("projectDeleted", req.params.id);

    res.json({

      message: "Project deleted successfully"

    });

  } catch (err) {

    res.status(500).json({

      message: err.message

    });

  }

};