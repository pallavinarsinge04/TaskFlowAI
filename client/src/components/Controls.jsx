const Controls=({

toggleCamera,

toggleMic,

shareScreen,

leave

})=>{

return(

<div className="flex gap-4 mt-6">

<button

onClick={toggleCamera}

className="bg-blue-600 text-white px-5 py-3 rounded"

>

📷 Camera

</button>

<button

onClick={toggleMic}

className="bg-green-600 text-white px-5 py-3 rounded"

>

🎤 Mic

</button>

<button

onClick={shareScreen}

className="bg-purple-600 text-white px-5 py-3 rounded"

>

🖥 Share Screen

</button>

<button

onClick={leave}

className="bg-red-600 text-white px-5 py-3 rounded"

>

Leave

</button>

</div>

);

};

export default Controls;