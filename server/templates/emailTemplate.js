export const emailTemplate=(

title,

message

)=>

<div style="

padding:40px;

font-family:Arial;

background:#f4f7fb;

">

<div style="

background:white;

padding:30px;

border-radius:10px;

">

<h1 style="color:#2563eb">

${title}

</h1>

<p>

${message}

</p>

<hr>

<p>

TaskFlow AI

</p>

</div>

</div>

;
sendEmail(

user.email,

"Task Assigned",

emailTemplate(

"Task Assigned",

"You received a new task."

)

);