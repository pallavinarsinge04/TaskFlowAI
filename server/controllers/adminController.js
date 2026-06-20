const User=require("../models/User");

exports.getUsers=async(req,res)=>{

const users=await User.find().select("-password");

res.json({

success:true,

users

});

};

exports.deleteUser=async(req,res)=>{

await User.findByIdAndDelete(req.params.id);

res.json({

success:true,

message:"User Deleted"

});

};

exports.changeRole=async(req,res)=>{

const user=await User.findByIdAndUpdate(

req.params.id,

{

role:req.body.role

},

{

new:true

}

);

res.json({

success:true,

user

});

};