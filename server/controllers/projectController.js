import Project from "../models/Project.js";
import { getIO } from "../config/socket.js";
import Notification from "./../models/Notification.js";
const project=await Project.create(req.body);
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
    const notification = await Notification.create({

  title:"New Project",

  message:`${project.name} has been created.`,

  type:"project"

});

getIO().emit("notification", notification);

    getIO().emit("projectCreated", project);

    res.status(201).json(project);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
const notification=await Notification.create({

title:"New Project",

message:`${project.name} created successfully`,

type:"project"

});

getIO().emit(
"notification",
notification
);