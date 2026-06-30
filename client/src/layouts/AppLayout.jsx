import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/layout/Navbar";
import "./AppLayout.css";

export default function AppLayout() {
  return (
    <div className="app-layout">

      {/* Sidebar */}
      <aside className="layout-sidebar">
        <Sidebar />
      </aside>

      {/* Right Area */}
      <div className="layout-right">

        {/* Fixed Navbar */}
        <header className="layout-navbar">
          <Navbar />
        </header>

        {/* Scrollable Pages */}
        <main className="layout-content">
          <Outlet />
        </main>

      </div>

    </div>
  );
}