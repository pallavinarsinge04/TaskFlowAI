import Notification from "../models/Notification.js";
import { getIO } from "../config/socket.js";

/* Get Notifications */

export const getNotifications=async(req,res)=>{

try{

const {role,userId}=req.query;

const notifications=await Notification.find({

$or:[

{role:"All"},

{role},

{receiver:userId}

]

}).sort({

createdAt:-1

});

res.json(notifications);

}catch(err){

res.status(500).json({

message:err.message

});

}

};

/* Create */

export const createNotification=async(req,res)=>{

try{

const notification=await Notification.create(req.body);

const io=getIO();

/* User Notification */

if(notification.receiver){

io.to(

notification.receiver.toString()

).emit(

"notification",

notification

);

}

/* Role Notification */

else if(notification.role!=="All"){

io.to(notification.role)

.emit(

"notification",

notification

);

}

/* Global */

else{

io.emit(

"notification",

notification

);

}

res.status(201)

.json(notification);

}catch(err){

res.status(500)

.json({

message:err.message

});

}

};

/* Mark Read */

export const markRead=async(req,res)=>{

const notification=

await Notification.findByIdAndUpdate(

req.params.id,

{

read:true

},

{

new:true

}

);

res.json(notification);

};
export const archiveNotification = async (req, res) => {

  try {

    const notification =
      await Notification.findByIdAndUpdate(

        req.params.id,

        {
          archived: true
        },

        {
          new: true
        }

      );

    res.json(notification);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

};
/* Mark All */

export const markAllRead=async(req,res)=>{

await Notification.updateMany(

{},

{

read:true

}

);

res.json({

message:"Done"

});

};

/* Delete */

export const deleteNotification=async(req,res)=>{

await Notification.findByIdAndDelete(

req.params.id

);

res.json({

message:"Deleted"

});

};

/* Delete All */

export const deleteAllNotifications=async(req,res)=>{

await Notification.deleteMany({});

res.json({

message:"Deleted"

});

};