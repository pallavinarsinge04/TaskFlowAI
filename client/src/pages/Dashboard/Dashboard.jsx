import "./Dashboard.css";

import DashboardHeader from "./DashboardHeader";
import DashboardCards from "./DashboardCards";
import DashboardCharts from "./DashboardCharts";
import DashboardInsights from "./DashboardInsights";
import DashboardCalendar from "./DashboardCalendar";
import DashboardActivity from "./DashboardActivity";
import DashboardTeam from "./DashboardTeam";
import DashboardQuickActions from "./DashboardQuickActions";
import DashboardTasks from "./DashboardTasks";

import {
  FaFolderOpen,
  FaTasks,
  FaUsers,
  FaRobot,
} from "react-icons/fa";

import { useState } from "react";

function Dashboard() {
  const [stats] = useState({
    projects: 24,
    activeProjects: 8,
    completedProjects: 16,
    totalTasks: 186,
    completedTasks: 142,
    pendingTasks: 44,
    teamMembers: 12,
    aiScore: 94,
  });

  const [recentProjects] = useState([
    {
      id: 1,
      name: "TaskFlowAI",
      progress: 82,
      status: "Active",
      priority: "High",
    },
    {
      id: 2,
      name: "HR Portal",
      progress: 45,
      status: "Planning",
      priority: "Medium",
    },
    {
      id: 3,
      name: "E-Commerce",
      progress: 100,
      status: "Completed",
      priority: "High",
    },
  ]);

  const [todayTasks] = useState([
    {
      id: 1,
      title: "Finish Dashboard UI",
      priority: "High",
      completed: false,
    },
    {
      id: 2,
      title: "Review Sprint Board",
      priority: "Medium",
      completed: true,
    },
    {
      id: 3,
      title: "Deploy Backend",
      priority: "High",
      completed: false,
    },
    {
      id: 4,
      title: "Update documentation",
      priority: "Low",
      completed: false,
    },
  ]);

  const dashboardCards = [
    {
      title: "Projects",
      value: stats.projects,
      icon: <FaFolderOpen />,
      color: "#2563eb",
      subtitle: `${stats.activeProjects} active`,
      path: "/projects",
    },
    {
      title: "Tasks",
      value: stats.totalTasks,
      icon: <FaTasks />,
      color: "#10b981",
      subtitle: `${stats.pendingTasks} pending`,
      path: "/tasks",
    },
    {
      title: "Team",
      value: stats.teamMembers,
      icon: <FaUsers />,
      color: "#f59e0b",
      subtitle: "Members online",
      path: "/team",
    },
    {
      title: "AI Score",
      value: `${stats.aiScore}%`,
      icon: <FaRobot />,
      color: "#8b5cf6",
      subtitle: "Productivity rating",
      path: "/ai-assistant",
    },
  ];

  return (
    <div className="dashboard">
      <DashboardHeader />

      <DashboardCards cards={dashboardCards} />

      <div className="dashboard-main">
        <div className="dashboard-left">
          <DashboardCharts projects={recentProjects} />
          <DashboardTasks tasks={todayTasks} />
          <DashboardActivity />
        </div>

        <div className="dashboard-right">
          <DashboardInsights />
          <DashboardQuickActions />
          <DashboardCalendar />
          <DashboardTeam />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
