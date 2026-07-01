import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
{
    title:String,

    message:String,

    type:String,

    read:{
        type:Boolean,
        default:false
    }

},
{
    timestamps:true
});

export default mongoose.model(
    "Notification",
    notificationSchema
);