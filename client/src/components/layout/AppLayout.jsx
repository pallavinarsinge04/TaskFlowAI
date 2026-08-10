import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

import Sidebar from "../sidebar/Sidebar";
import Navbar from "./Navbar";

import socket from "../../socket";

import "./layout.css";

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("🟢 Connected to Socket.IO:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("🔴 Disconnected from Socket.IO");
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  return (
    <div className="app-layout">

      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <div className={`app-main ${collapsed ? "collapsed" : ""}`}>

        <Navbar />

        <main className="page-content">
          <Outlet />
        </main>

      </div>

    </div>
  );
}