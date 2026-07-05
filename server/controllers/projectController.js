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

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

};

// =========================
// Create Project
// =========================

export const createProject = async (req, res) => {

  try {

    const {

      title,
      description,
      status,
      priority,
      due_date,
      progress

    } = req.body;

    const { data, error } = await supabase

      .from("projects")

      .insert([
        {
          title,
          description,
          status,
          priority,
          due_date,
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

    // Notification

    await supabase

      .from("notifications")

      .insert([
        {
          title: "New Project",
          message: `${data.title} has been created.`,
          type: "project"
        }
      ]);

    // Socket

    getIO().emit("projectCreated", data);

    // Email

    await sendEmail(

      req.user?.email || "admin@taskflow.com",

      "Project Created",

      `
        <h1>Project Created</h1>

        <p>

        <b>${data.title}</b>

        was created successfully.

        </p>

      `

    );

    res.status(201).json(data);

  } catch (err) {

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