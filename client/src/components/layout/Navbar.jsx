import { useEffect, useState } from "react";
import socket from "../../socket/socket";

const Navbar = () => {
  const [onlineUsers, setOnlineUsers] = useState(0);

  useEffect(() => {
    socket.on("onlineUsers", (count) => {
      setOnlineUsers(count);
    });

    return () => {
      socket.off("onlineUsers");
    };
  }, []);

  return (
    <div className="bg-white shadow h-16 flex justify-between items-center px-8">

      <h1 className="text-2xl font-bold">
        🚀 TaskFlow AI
      </h1>

      <div className="flex items-center gap-5">

        <span className="text-green-600 font-semibold">
          🟢 {onlineUsers} Online
        </span>

        <img
          src="https://i.pravatar.cc/40"
          alt="Profile"
          className="w-10 h-10 rounded-full"
        />

      </div>

    </div>
  );
};

export default Navbar;