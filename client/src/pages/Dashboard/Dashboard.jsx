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

function Dashboard() {
  return (
    <div className="dashboard-layout">

      {/* LEFT SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="dashboard-main">

        {/* TOP NAVBAR */}
        

        <div className="dashboard-container">

          {/* Welcome Banner */}
          <WelcomeBanner />

          {/* Statistics */}
          <StatsCards />

          {/* Productivity + AI */}
          <div className="dashboard-grid two-column">
            <div className="dashboard-card large">
              <ProductivityChart />
            </div>

            <div className="dashboard-card small">
              <AIInsights />
            </div>
          </div>

          {/* Projects + Tasks */}
          <div className="dashboard-grid two-column">
            <div className="dashboard-card large">
              <ProjectProgress />
            </div>

            <div className="dashboard-card small">
              <RecentTasks />
            </div>
          </div>

          {/* Team + Meetings */}
          <div className="dashboard-grid two-column">
            <div className="dashboard-card large">
              <TeamMembers />
            </div>

            <div className="dashboard-card small">
              <Meetings />
            </div>
          </div>

          {/* Activity + Notifications */}
          <div className="dashboard-grid two-column">
            <div className="dashboard-card large">
              <Activity />
            </div>

            <div className="dashboard-card small">
              <Notifications />
            </div>
          </div>

          {/* Calendar + Quick Actions */}
          <div className="dashboard-grid two-column">
            <div className="dashboard-card large">
              <CalendarWidget />
            </div>

            <div className="dashboard-card small">
              <QuickActions />
            </div>
          </div>

        </div>
      </div>

      {/* RIGHT SIDEBAR */}
      <RightSidebar />

    </div>
  );
}

export default Dashboard;