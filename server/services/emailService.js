import transporter from "../config/email.js";

export const sendEmail = async (

to,

subject,

html

)=>{

await transporter.sendMail({

from:"TaskFlow AI <yourgmail@gmail.com>",

to,

subject,

html

});

};