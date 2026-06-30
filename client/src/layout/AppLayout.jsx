import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "./Navbar";
import { useState } from "react";
import "./layout.css";

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="app-container">

      {/* Sidebar */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* MAIN AREA (this is remaining space) */}
      <div className={`app-main ${collapsed ? "collapsed" : ""}`}>

        <Navbar />

        <div className="page-content">
          <Outlet />
        </div>

      </div>

    </div>
  );
}