import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/layout/Navbar";
import "./AppLayout.css";

export default function AppLayout() {
  // Remember the choice after refresh
  const [collapsed, setCollapsed] = useState(
    () => localStorage.getItem("sidebarCollapsed") === "true"
  );

  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", String(collapsed));
  }, [collapsed]);

  return (
    <div className={`app-layout ${collapsed ? "sidebar-collapsed" : ""}`}>
      {/* Sidebar renders its own <aside>, so no wrapper is needed */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className="layout-right">
        <header className="layout-navbar">
          <Navbar />
        </header>

        <main className="layout-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}