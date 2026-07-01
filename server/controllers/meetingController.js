const notification=await Notification.create({

title:"Meeting Scheduled",

message:"Sprint meeting tomorrow",

role:"All"

});

getIO()

.emit(

"notification",

notification

);
await sendEmail(

member.email,

"Meeting Scheduled",



Meeting Date:

${meeting.date}



);