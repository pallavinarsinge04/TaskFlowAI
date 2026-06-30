import express from "express";
import Project from "../models/Project.js";

const router = express.Router();

router.get("/",async(req,res)=>{

const projects=await Project.find().sort({createdAt:-1});

res.json(projects);

});

router.post("/",async(req,res)=>{

const project=await Project.create(req.body);

req.io.emit("projectCreated",project);

res.json(project);

});

export default router;