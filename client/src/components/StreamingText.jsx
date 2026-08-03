import { useState,useEffect } from "react";

function StreamingText({

text,

speed=15

}){

const [display,

setDisplay]=

useState("");

useEffect(()=>{

let i=0;

setDisplay("");

const timer=

setInterval(()=>{

setDisplay(

prev=>

prev+text.charAt(i)

);

i++;

if(i>=text.length){

clearInterval(timer);

}

},speed);

return()=>clearInterval(timer);

},[text,speed]);

return(

<span>

{display}

</span>

);

}

export default StreamingText;