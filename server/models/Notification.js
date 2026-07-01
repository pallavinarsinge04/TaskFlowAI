import mongoose from "mongoose";
const notificationSchema = new mongoose.Schema({

  title: String,

  message: String,

  type: String,

  receiver: String,

  role: String,

  read: {
    type: Boolean,
    default: false
  },

  archived: {
    type: Boolean,
    default: false
  }

}, {
  timestamps: true
});
const notificationSchema = new mongoose.Schema({

  title:{

    type:String,

    required:true

  },

  message:{

    type:String,

    required:true

  },

  type:{

    type:String,

    default:"system"

  },

  read:{

    type:Boolean,

    default:false

  },

  role:{

    type:String,

    default:"All"

  },

  receiver:{

    type:mongoose.Schema.Types.ObjectId,

    ref:"User",

    default:null

  }

},{
timestamps:true
});

export default mongoose.model(
"Notification",
notificationSchema
);