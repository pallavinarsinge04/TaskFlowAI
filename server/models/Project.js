import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
{
    name:{
        type:String,
        required:true
    },

    description:String,

    status:{
        type:String,
        default:"Planning"
    },

    priority:{
        type:String,
        default:"Medium"
    },

    progress:{
        type:Number,
        default:0
    },

    startDate:Date,

    endDate:Date,

    teamMembers:{
        type:Number,
        default:1
    }
},
{
    timestamps:true
});

export default mongoose.model("Project",projectSchema);