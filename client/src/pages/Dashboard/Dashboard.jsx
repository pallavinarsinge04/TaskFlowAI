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

    <WelcomeBanner />

    <StatsCards />

    <section className="dashboard-section">
        <div className="dashboard-card large">
            <ProductivityChart />
        </div>

        <div className="dashboard-card small">
            <AIInsights />
        </div>
    </section>

    <section className="dashboard-section">
        <div className="dashboard-card large">
            <ProjectProgress />
        </div>

        <div className="dashboard-card small">
            <RecentTasks />
        </div>
    </section>

    <section className="dashboard-section">
        <div className="dashboard-card large">
            <TeamMembers />
        </div>

        <div className="dashboard-card small">
            <Meetings />
        </div>
    </section>

    <section className="dashboard-section">
        <div className="dashboard-card large">
            <Activity />
        </div>

        <div className="dashboard-card small">
            <Notifications />
        </div>
    </section>

    <section className="dashboard-section">
        <div className="dashboard-card large">
            <CalendarWidget />
        </div>

        <div className="dashboard-card small">
            <QuickActions />
        </div>
    </section>

</div>
      </div>

      {/* RIGHT SIDEBAR */}
      <RightSidebar />

    </div>
  );
}

export default Dashboard;