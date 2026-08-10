import "./Dashboard.css";

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

import { useEffect, useState } from "react";
import { supabase } from "../../supabase/supabaseClient";

function Dashboard() {
  // =========================================
  // DASHBOARD STATS
  // =========================================

  const [stats, setStats] = useState({
    projects: 24,
    activeProjects: 8,
    completedProjects: 16,

    totalTasks: 186,
    completedTasks: 142,
    pendingTasks: 44,

    teamMembers: 0,

    aiScore: 94,
  });

  // =========================================
  // LOAD REAL TEAM COUNT
  // =========================================

  useEffect(() => {
    let channel;

    const loadTeamCount = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          setStats((prev) => ({
            ...prev,
            teamMembers: 0,
          }));

          return;
        }

        const { count, error } = await supabase
          .from("team_members")
          .select("*", {
            count: "exact",
            head: true,
          })
          .eq("user_id", user.id);

        if (error) {
          throw error;
        }

        setStats((prev) => ({
          ...prev,
          teamMembers: count || 0,
        }));

        // =========================================
        // REALTIME TEAM COUNT
        // =========================================

        channel = supabase
          .channel(`dashboard-stats-${user.id}`)
          .on(
            "postgres_changes",
            {
              event: "*",
              schema: "public",
              table: "team_members",
              filter: `user_id=eq.${user.id}`,
            },
            () => {
              loadTeamCount();
            }
          )
          .subscribe();
      } catch (error) {
        console.error(
          "Dashboard team count error:",
          error
        );
      }
    };

    loadTeamCount();

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, []);

  // =========================================
  // RECENT PROJECTS
  // =========================================

  const recentProjects = [
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
  ];

  // =========================================
  // TODAY TASKS
  // =========================================

  const todayTasks = [
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
  ];

  // =========================================
  // DASHBOARD CARDS
  // =========================================

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

      subtitle:
        stats.teamMembers === 1
          ? "1 member"
          : `${stats.teamMembers} members`,

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

  // =========================================
  // RENDER
  // =========================================

  return (
    <div className="dashboard">

      {/* TOP STAT CARDS */}

      <DashboardCards
        cards={dashboardCards}
      />

      {/* MAIN DASHBOARD */}

      <div className="dashboard-main">

        {/* LEFT */}

        <div className="dashboard-left">

          <DashboardCharts
            projects={recentProjects}
          />

          <DashboardTasks
            tasks={todayTasks}
          />

          <DashboardActivity />

        </div>

        {/* RIGHT */}

        <div className="dashboard-right">

          <DashboardInsights />

          <DashboardQuickActions />

          <DashboardCalendar />

          {/* REAL TEAM DATA */}

          <DashboardTeam />

        </div>

      </div>

    </div>
  );
}

export default Dashboard;