import "./Dashboard.css";

import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "./Navbar";

import WelcomeBanner from "../../components/dashboard/WelcomeBanner";
import StatsCards from "../../components/dashboard/StatsCard";
import ProjectProgress from "../../components/dashboard/ProjectProgress";
import RecentTasks from "./../../components/dashboard/RecentTasks";
import AIInsights from "../../components/dashboard/AIInsights";
import TeamMembers from "../../components/dashboard/TeamMembers";
import Meetings from "../../components/dashboard/Meetings";
import Notifications from "../../components/dashboard/Notifications";
import Activity from "../../components/dashboard/Activity";
import CalendarWidget from "./../../components/dashboard/CalendarWidget";
import QuickActions from "../../components/dashboard/QuickActions";

function Dashboard() {
  return (
    <div className="dashboard">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="dashboard-main">

        {/* Navbar */}
        <Navbar />

        <div className="dashboard-content">

          <WelcomeBanner />

          <StatsCards />

          <div className="dashboard-row">

            <div className="dashboard-large">
              <ProductivityChart />
            </div>

            <div className="dashboard-small">
              <AIInsights />
            </div>

          </div>

          <div className="dashboard-row">

            <div className="dashboard-large">
              <ProjectProgress />
            </div>

            <div className="dashboard-small">
              <RecentTasks />
            </div>

          </div>

          <div className="dashboard-row">

            <div className="dashboard-large">
              <TeamMembers />
            </div>

            <div className="dashboard-small">
              <Meetings />
            </div>

          </div>

          <div className="dashboard-row">

            <div className="dashboard-large">
              <Activity />
            </div>

            <div className="dashboard-small">
              <Notifications />
            </div>

          </div>

          <div className="dashboard-row">

            <div className="dashboard-large">
              <CalendarWidget />
            </div>

            <div className="dashboard-small">
              <QuickActions />
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;