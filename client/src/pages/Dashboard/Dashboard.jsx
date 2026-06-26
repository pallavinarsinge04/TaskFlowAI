import "./Dashboard.css";
import Sidebar from "./../../components/Sidebar/Sidebar"

import Navbar from "./Navbar";
import StatsCard from "./StatsCard";
import ProductivityChart from "./ProductivityChart";
import ProjectProgress from "./ProjectProgress";
import RecentTasks from "./RecentTasks";
import AIInsights from "./AIInsights";
import TeamMembers from "./TeamMembers";
import Meetings from "./Meetings";
import Notifications from "./Notifications";
import Activity from "./Activity";

function Dashboard() {
  return (
    <div className="dashboard">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="dashboard-main">

        {/* Top Navbar */}
        <Navbar />

        {/* Welcome Section */}
        <section className="welcome-section">

          <div>
            <h1>Welcome Back 👋</h1>
            <p>
              Manage your projects, collaborate with your team and
              boost productivity using AI.
            </p>
          </div>

          <button className="create-btn">
            + New Project
          </button>

        </section>

        {/* Statistics */}
        <section className="stats-grid">

          <StatsCard
            title="Total Tasks"
            value="128"
            color="#2563EB"
            icon="📝"
          />

          <StatsCard
            title="Projects"
            value="14"
            color="#22C55E"
            icon="📁"
          />

          <StatsCard
            title="Completed"
            value="102"
            color="#8B5CF6"
            icon="✅"
          />

          <StatsCard
            title="Team Members"
            value="21"
            color="#F59E0B"
            icon="👥"
          />

          <StatsCard
            title="Productivity"
            value="92%"
            color="#EF4444"
            icon="🔥"
          />

          <StatsCard
            title="AI Score"
            value="9.4"
            color="#06B6D4"
            icon="🤖"
          />

        </section>

        {/* Charts */}
        <section className="chart-grid">

          <ProductivityChart />

          <ProjectProgress />

        </section>

        {/* Tasks & AI */}
        <section className="middle-grid">

          <RecentTasks />

          <AIInsights />

        </section>

        {/* Team */}
        <section className="middle-grid">

          <TeamMembers />

          <Notifications />

        </section>

        {/* Meetings */}
        <section className="middle-grid">

          <Meetings />

          <Activity />

        </section>

      </div>

    </div>
  );
}

export default Dashboard;