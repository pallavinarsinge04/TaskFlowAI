import { useEffect } from "react";

export default function useNotification(socket) {

  useEffect(() => {

    if (!("Notification" in window)) return;

    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }

    socket.on("notification", (data) => {

      if (Notification.permission === "granted") {

       new Notification(data.title,{

body:data.message,

icon:"/logo192.png",

badge:"/logo192.png",

tag:data.type,

renotify:true,

requireInteraction:true

});
      }

    });

    return () => {

      socket.off("notification");

    };

  }, [socket]);

}