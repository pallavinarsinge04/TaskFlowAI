import { useEffect } from "react";

import socket from "../socket/socket";

function SocketInitializer() {

  useEffect(() => {

    const userId =
      localStorage.getItem(
        "userId"
      );

    const role =
      localStorage.getItem(
        "role"
      );

    if (userId) {

      socket.emit(
        "joinUser",
        userId
      );

    }

    if (role) {

      socket.emit(
        "joinRole",
        role
      );

    }

  }, []);

  return null;
}

export default SocketInitializer;