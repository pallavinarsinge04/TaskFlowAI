import { useEffect, useState } from "react";
import axios from "axios";
import socket from "../../socket/socket";
import "./NotificationDropdown.css";

const API = "http://localhost:5000/api/notifications";

function NotificationDropdown({ open }) {

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {

    axios.get(API).then(res=>{

      setNotifications(res.data.slice(0,5));

    });

    socket.on("notification",(notification)=>{

      setNotifications(prev=>[
        notification,
        ...prev
      ]);

    });

    return ()=>{

      socket.off("notification");

    };

  },[]);

  if(!open) return null;

  return(

    <div className="notification-dropdown">

      <h3>Recent Notifications</h3>

      {

        notifications.length===0 ?

        <p>No Notifications</p>

        :

        notifications.map(item=>(

          <div
          key={item._id}
          className="dropdown-card"
          >

            <strong>{item.title}</strong>

            <p>{item.message}</p>

          </div>

        ))

      }

    </div>

  );

}

export default NotificationDropdown;