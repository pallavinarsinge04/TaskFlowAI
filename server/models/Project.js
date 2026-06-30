import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({

    title:String,

    description:String,

    priority:String,

    dueDate:String,

    progress:{
        type:Number,
        default:0
    },

    createdAt:{
        type:Date,
        default:Date.now
    }

});

export default mongoose.model("Project",ProjectSchema);