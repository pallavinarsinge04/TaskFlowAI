const videoSocket = (io) => {

    io.on("connection",(socket)=>{

        console.log("User Connected",socket.id);

        socket.on("join-meeting",(room)=>{

            socket.join(room);

            socket.to(room).emit("user-joined",socket.id);

        });

        socket.on("signal",(data)=>{

            io.to(data.to).emit("signal",{

                signal:data.signal,

                from:socket.id

            });

        });

        socket.on("disconnect",()=>{

            io.emit("user-left",socket.id);

        });

    });

};

module.exports=videoSocket;