import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/layout/Navbar";

import "./AppLayout.css";

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`app-layout ${
        collapsed ? "sidebar-collapsed" : "sidebar-expanded"
      }`}
    >
      {/* Sidebar */}
      <aside className="layout-sidebar">
        <Sidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
      </aside>

      {/* Right Area */}
      <div className="layout-right">

        {/* Navbar */}
        <header className="layout-navbar">
          <Navbar />
        </header>

        {/* Page Content */}
        <main className="layout-content">
          <Outlet />
        </main>

      </div>
    </div>
  );
}