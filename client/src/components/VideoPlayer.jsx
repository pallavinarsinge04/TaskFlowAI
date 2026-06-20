const VideoPlayer=({stream})=>{

return(

<video

autoPlay

playsInline

ref={(video)=>{

if(video){

video.srcObject=stream;

}

}}

className="rounded-xl shadow"

/>

);

};

export default VideoPlayer;