import { useEffect, useState } from "react";
import socket from "../../socket/socket";
import axios from "axios";

const Chat = () => {

  const room = "general";

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([]);

  useEffect(() => {

    socket.emit("joinRoom", room);

    loadMessages();

    socket.on(
      "receiveMessage",
      (msg) => {

        setMessages((prev) => [
          ...prev,
          msg,
        ]);

      }
    );

    return () => {

      socket.off("receiveMessage");

    };

  }, []);

  const loadMessages = async () => {

    const res = await axios.get(
      `http://localhost:5000/api/messages/${room}`
    );

    setMessages(res.data.messages);

  };

  const send = () => {

    const msg = {
      sender: "User",
      room,
      text: message,
    };

    socket.emit("sendMessage", msg);

    setMessage("");

  };

  return (

    <div className="p-8">

      <h1 className="text-3xl font-bold mb-5">

        💬 Team Chat

      </h1>

      <div className="border h-96 overflow-y-scroll p-4">

        {messages.map((m, i) => (

          <div key={i} className="mb-3">

            <strong>{m.sender}</strong>

            <p>{m.text}</p>

          </div>

        ))}

      </div>

      <div className="flex mt-5">

        <input
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          className="border flex-1 p-3"
        />

        <button
          onClick={send}
          className="bg-blue-600 text-white px-6"
        >
          Send
        </button>

      </div>

    </div>

  );

};

export default Chat;