const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    name:String,

    email:String,

    password:String,

    role:{
        type:String,
        enum:["Admin","Manager","Member"],
        default:"Member"
    },

    active:{
        type:Boolean,
        default:true
    }

},{
    timestamps:true
});

module.exports=mongoose.model("User",userSchema);