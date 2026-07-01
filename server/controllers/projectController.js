import Project from "../models/Project.js";
import Notification from "../models/Notification.js";
import { getIO } from "../config/socket.js";
import { sendEmail } from "../services/emailService.js";

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createProject = async (req, res) => {
  try {
    // 1. Create Project
    const project = await Project.create(req.body);

    // 2. Create Notification
    const notification = await Notification.create({
      title: "New Project",
      message: `${project.name} has been created.`,
      type: "project",
      role: "Manager"
    });

    // 3. Socket Emit (Role-based)
    getIO()
      .to("Manager")
      .emit("notification", notification);

    getIO().emit("projectCreated", project);

    // 4. Email Notification (NO JSX HERE!)
    await sendEmail(
      req.user?.email || "admin@taskflow.com",
      "Project Created",
      `
        <h1>Project Created</h1>
        <p><b>${project.name}</b> was created successfully.</p>
      `
    );

    // 5. Response
    res.status(201).json(project);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};