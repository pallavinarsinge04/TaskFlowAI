import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "./Navbar";
import { useState } from "react";
import "./layout.css";

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);

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