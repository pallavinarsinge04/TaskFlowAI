import Project from "../models/Project.js";
import { getIO } from "../config/socket.js";

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
    const project = await Project.create(req.body);

    getIO().emit("projectCreated", project);

    res.status(201).json(project);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};