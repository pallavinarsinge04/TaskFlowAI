import { useEffect } from "react";
import socket from "../socket/socket";
import toast from "react-hot-toast";

export default function useNotification() {
    const audio=new Audio("/notification.mp3");

audio.play();

  useEffect(() => {

    // Request browser permission

    if (Notification.permission !== "granted") {

      Notification.requestPermission();

    }

    socket.on("notification", (data) => {

      // React Toast

      toast.success(`${data.title}\n${data.message}`);

      // Browser Notification

      if (Notification.permission === "granted") {

        new Notification(data.title, {

          body: data.message,

          icon: "/logo192.png",

          badge: "/logo192.png",

          tag: data.type,

          requireInteraction: true,

          renotify: true,

        });

      }

    });

    return () => {

      socket.off("notification");

    };

  }, []);

}