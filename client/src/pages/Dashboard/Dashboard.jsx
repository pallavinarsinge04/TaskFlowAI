import "./Dashboard.css";

import DashboardHeader from "./DashboardHeader";
import KpiCard from "./components/KpiCard";
import DashboardCharts from "./components/DashboardCharts";
import AIInsights from "../../components/dashboard/AIInsights";
import CalendarWidget from "../../components/dashboard/CalendarWidget";
import Activity from "../../components/dashboard/Activity";
import TeamMembers from "../../components/dashboard/TeamMembers";
import QuickActions from "../../components/dashboard/QuickActions";
import RecentTasks from "../../components/dashboard/RecentTasks";

import {
  FaFolderOpen,
  FaTasks,
  FaUsers,
  FaRobot
} from "react-icons/fa";

import { useEffect, useState } from "react";
import API from "../../api/axios";

function Dashboard() {
  const storedUser = JSON.parse(localStorage.getItem("user")) || {};
  const userId = storedUser._id || storedUser.id || storedUser.userId || storedUser.uid;

  const [stats, setStats] = useState({
    projects: 0,
    activeProjects: 0,
    completedProjects: 0,
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    overdueTasks: 0,
    teamMembers: 0,
    aiScore: 0,
  });

  const [recentProjects, setRecentProjects] = useState([]);
  const [todayTasks, setTodayTasks] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    let mounted = true;

    async function fetchData() {
      try {
        const [projectsRes, tasksRes, teamRes, notificationsRes] = await Promise.all([
          API.get("/projects"),
          API.get("/tasks"),
          API.get("/team"),
          API.get("/notifications"),
        ]);

        const projects = projectsRes.data?.projects || [];
        const tasks = tasksRes.data?.tasks || [];
        const members = teamRes.data?.members || [];
        const notifications = notificationsRes.data || [];

        const totalTasks = tasks.length;
        const completedTasks = tasks.filter(
          (t) => (t.status || "").toString().toLowerCase() === "completed" || (t.status || "").toString().toLowerCase() === "done"
        ).length;

        const now = new Date();
        const overdueTasks = tasks.filter((t) => {
          if (!t.deadline) return false;
          const d = new Date(t.deadline);
          return d < now && (t.status || "").toString().toLowerCase() !== "completed";
        }).length;

        const activeProjects = projects.filter((p) => {
          const s = (p.status || "").toString().toLowerCase();
          return s === "active" || s === "in progress" || (Number(p.progress) < 100 && s !== "completed");
        }).length;

        const completedProjects = projects.filter((p) => {
          const s = (p.status || "").toString().toLowerCase();
          return s === "completed" || Number(p.progress) >= 100;
        }).length;

        const aiScore = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

        if (!mounted) return;

        setStats({
          projects: projects.length,
          activeProjects,
          completedProjects,
          totalTasks,
          completedTasks,
          pendingTasks: Math.max(0, totalTasks - completedTasks),
          overdueTasks,
          teamMembers: members.length,
          aiScore,
        });

        setRecentProjects(projects.slice(0, 5));

        // tasks due today
        const today = new Date();
        const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const end = new Date(start);
        end.setDate(end.getDate() + 1);

        const tasksToday = tasks.filter((t) => {
          if (!t.deadline) return false;
          const d = new Date(t.deadline);
          return d >= start && d < end;
        });

        setTodayTasks(tasksToday.length ? tasksToday.slice(0, 8) : tasks.slice(0, 8));
        setRecentActivity(notifications.slice(0, 8));
        setTeamMembers(members.slice(0, 8));
      } catch (err) {
        console.error("Dashboard fetch error", err);
      }
    }

    fetchData();

    return () => {
      mounted = false;
    };
  }, [userId]);

  const dashboardCards = [
    {
      title: "Projects",
      value: stats.projects,
      icon: <FaFolderOpen />,
      color: "#2563eb",
      progress: stats.projects ? Math.round((stats.completedProjects / stats.projects) * 100) : 0,
      subtitle: `${stats.activeProjects} active • ${stats.completedProjects} completed`,
    },
    {
      title: "Tasks",
      value: stats.totalTasks,
      icon: <FaTasks />,
      color: "#10b981",
      progress: stats.totalTasks ? Math.round((stats.completedTasks / stats.totalTasks) * 100) : 0,
      subtitle: `${stats.completedTasks} completed • ${stats.overdueTasks} overdue`,
    },
    {
      title: "Team",
      value: stats.teamMembers,
      icon: <FaUsers />,
      color: "#f59e0b",
      progress: 0,
      subtitle: `${teamMembers.length} shown`,
    },
    {
      title: "AI Score",
      value: `${stats.aiScore}%`,
      icon: <FaRobot />,
      color: "#8b5cf6",
      progress: stats.aiScore,
      subtitle: `Productivity score`,
    },
  ];

  return (
    <div className="dashboard">
      <DashboardHeader />

      <div className="dashboard-cards">
        {dashboardCards.map((c, i) => (
          <div key={i} style={{ width: 260, marginRight: 12 }}>
            <KpiCard
              title={c.title}
              value={c.value}
              icon={c.icon}
              color={c.color}
              progress={c.progress}
              subtitle={c.subtitle}
            />
          </div>
        ))}
      </div>

      <div className="dashboard-main">
        <div className="dashboard-left">
          <DashboardCharts projects={recentProjects} />

                    <RecentTasks tasks={todayTasks} />

                    <Activity activity={recentActivity} />
        </div>

        <div className="dashboard-right">
          <AIInsights />

                    <QuickActions />

                    <CalendarWidget events={todayTasks} />

                    <TeamMembers members={teamMembers} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;