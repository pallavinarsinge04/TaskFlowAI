import {useEffect,useRef} from "react";

const Meeting=()=>{

const videoRef=useRef();

useEffect(()=>{

navigator.mediaDevices

.getUserMedia({

video:true,

audio:true

})

.then(stream=>{

videoRef.current.srcObject=stream;

});

},[]);

return(

<div className="p-8">

<h1 className="text-4xl font-bold">

🎥 Video Meeting

</h1>

<video

ref={videoRef}

autoPlay

playsInline

className="w-96 rounded-xl mt-5"

/>

</div>

);

};

export default Meeting;