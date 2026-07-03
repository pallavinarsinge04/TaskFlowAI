import "./Dashboard.css";

import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/layout/Navbar";
import RightSidebar from "../../components/dashboard/RightSidebar";

import WelcomeBanner from "../../components/dashboard/WelcomeBanner";
import StatsCards from "../../components/dashboard/StatsCard";
import ProductivityChart from "../../components/dashboard/ProductivityChart";
import ProjectProgress from "../../components/dashboard/ProjectProgress";
import RecentTasks from "../../components/dashboard/RecentTasks";
import AIInsights from "../../components/dashboard/AIInsights";
import TeamMembers from "../../components/dashboard/TeamMembers";
import Meetings from "../../components/dashboard/Meetings";
import Notifications from "../../components/dashboard/Notifications";
import Activity from "../../components/dashboard/Activity";
import CalendarWidget from "../../components/dashboard/CalendarWidget";
import QuickActions from "../../components/dashboard/QuickActions";

import { useState } from "react";
import { FaBars } from "react-icons/fa";

function Dashboard() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (

    <div className="dashboard-layout">

      {/* Mobile Overlay */}

      {sidebarOpen && (

        <div
          className="dashboard-overlay"
          onClick={() => setSidebarOpen(false)}
        />

      )}

      {/* Sidebar */}

      <div className={`dashboard-sidebar ${sidebarOpen ? "open" : ""}`}>

        <Sidebar />

      </div>

      {/* Main */}

      <div className="dashboard-main">

        <div className="mobile-header">

          <button
            className="menu-btn"
            onClick={() => setSidebarOpen(true)}
          >
            <FaBars />
          </button>

          <h2>TaskFlow AI</h2>

        </div>

        <Navbar />

        <div className="dashboard-container">

          <WelcomeBanner />

          <StatsCards />

          <div className="dashboard-grid">

            <div className="dashboard-card chart">

              <ProductivityChart />

            </div>

            <div className="dashboard-card">

              <AIInsights />

            </div>

          </div>

          <div className="dashboard-grid">

            <div className="dashboard-card">

              <ProjectProgress />

            </div>

            <div className="dashboard-card">

              <RecentTasks />

            </div>

          </div>

          <div className="dashboard-grid">

            <div className="dashboard-card">

              <TeamMembers />

            </div>

            <div className="dashboard-card">

              <Meetings />

            </div>

          </div>

          <div className="dashboard-grid">

            <div className="dashboard-card">

              <Activity />

            </div>

            <div className="dashboard-card">

              <Notifications />

            </div>

          </div>

          <div className="dashboard-grid">

            <div className="dashboard-card">

              <CalendarWidget />

            </div>

            <div className="dashboard-card">

              <QuickActions />

            </div>

          </div>

        </div>

      </div>

      {/* Right Sidebar */}

      <div className="dashboard-right">

        <RightSidebar />

      </div>

    </div>

  );

}

export default Dashboard;