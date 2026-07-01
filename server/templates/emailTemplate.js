import { emailTemplate } from "../templates/emailTemplate.js";

await sendEmail(

user.email,

"Project Created",

emailTemplate(

"Project Created",

"Your project has been created successfully."

)

);