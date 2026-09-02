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
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabase/supabaseClient";

function Dashboard() {
  const navigate = useNavigate();

  // =========================================
  // DASHBOARD STATS
  // =========================================

  const [stats, setStats] = useState({
    projects: 0,
    activeProjects: 0,
    completedProjects: 0,

    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,

    teamMembers: 0,

    aiScore: 94,
  });

  // =========================================
  // RECENT PROJECTS
  // =========================================

  const [recentProjects, setRecentProjects] = useState([]);

  // =========================================
  // LOADING STATES
  // =========================================

  const [projectsLoading, setProjectsLoading] = useState(true);

  // =========================================
  // LOAD DASHBOARD DATA
  // =========================================

  useEffect(() => {
    let projectChannel = null;
    let teamChannel = null;

    let mounted = true;

    // =========================================
    // LOAD PROJECTS
    // =========================================

    const loadProjects = async () => {
      try {
        if (mounted) {
          setProjectsLoading(true);
        }

        // -----------------------------------------
        // GET CURRENT SESSION
        // -----------------------------------------

        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) {
          throw sessionError;
        }

        const token = session?.access_token;

        if (!token) {
          console.log("No access token found.");

          if (mounted) {
            setRecentProjects([]);

            setStats((prev) => ({
              ...prev,
              projects: 0,
              activeProjects: 0,
              completedProjects: 0,
            }));
          }

          return;
        }

        // -----------------------------------------
        // GET PROJECTS FROM BACKEND
        // -----------------------------------------

        const response = await fetch(
          "http://localhost:5000/api/projects",
          {
            method: "GET",

            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message || "Failed to load projects."
          );
        }

        // -----------------------------------------
        // SUPPORT BOTH RESPONSE FORMATS
        // -----------------------------------------

        const projects =
          result.projects ||
          result.data ||
          [];

        if (!Array.isArray(projects)) {
          throw new Error(
            "Invalid projects data received from server."
          );
        }

        if (!mounted) return;

        // -----------------------------------------
        // RECENT PROJECTS
        // -----------------------------------------

        // Backend already returns projects ordered
        // by created_at descending.

        setRecentProjects(
          projects.slice(0, 5)
        );

        // -----------------------------------------
        // PROJECT STATISTICS
        // -----------------------------------------

        const activeProjects =
          projects.filter((project) => {
            const status =
              project.status
                ?.toString()
                .trim()
                .toLowerCase();

            return (
              status === "active" ||
              status === "in progress"
            );
          }).length;

        const completedProjects =
          projects.filter((project) => {
            const status =
              project.status
                ?.toString()
                .trim()
                .toLowerCase();

            return status === "completed";
          }).length;

        // -----------------------------------------
        // UPDATE DASHBOARD STATS
        // -----------------------------------------

        setStats((prev) => ({
          ...prev,

          projects: projects.length,

          activeProjects,

          completedProjects,
        }));

        console.log(
          "Dashboard projects:",
          projects
        );
      } catch (error) {
        console.error(
          "Dashboard projects error:",
          error
        );

        if (mounted) {
          setRecentProjects([]);

          setStats((prev) => ({
            ...prev,
            projects: 0,
            activeProjects: 0,
            completedProjects: 0,
          }));
        }
      } finally {
        if (mounted) {
          setProjectsLoading(false);
        }
      }
    };

    // =========================================
    // LOAD TEAM COUNT
    // =========================================

    const loadTeamCount = async () => {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) {
          throw userError;
        }

        if (!user) {
          if (mounted) {
            setStats((prev) => ({
              ...prev,
              teamMembers: 0,
            }));
          }

          return;
        }

        // -----------------------------------------
        // GET TEAM MEMBER COUNT
        // -----------------------------------------

        const {
          count,
          error,
        } = await supabase
          .from("team_members")
          .select("*", {
            count: "exact",
            head: true,
          })
          .eq("user_id", user.id);

        if (error) {
          throw error;
        }

        if (!mounted) return;

        setStats((prev) => ({
          ...prev,
          teamMembers: count || 0,
        }));
      } catch (error) {
        console.error(
          "Dashboard team count error:",
          error
        );
      }
    };

    // =========================================
    // INITIAL DATA LOAD
    // =========================================

    loadProjects();

    loadTeamCount();

    // =========================================
    // PROJECT REALTIME
    // =========================================

    const setupProjectRealtime = async () => {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();

        if (error) {
          throw error;
        }

        if (!user || !mounted) {
          return;
        }

        // -----------------------------------------
        // CREATE PROJECT CHANNEL
        // -----------------------------------------

        projectChannel = supabase
          .channel(
            `dashboard-projects-${user.id}`
          )
          .on(
            "postgres_changes",
            {
              event: "*",

              schema: "public",

              table: "projects",

              filter: `owner=eq.${user.id}`,
            },
            () => {
              // -------------------------------------
              // RELOAD PROJECT DATA WHEN DB CHANGES
              // -------------------------------------

              if (mounted) {
                loadProjects();
              }
            }
          );

        // -----------------------------------------
        // SUBSCRIBE AFTER .on()
        // -----------------------------------------

        await projectChannel.subscribe();
      } catch (error) {
        console.error(
          "Dashboard project realtime error:",
          error
        );
      }
    };

    // =========================================
    // TEAM REALTIME
    // =========================================

    const setupTeamRealtime = async () => {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();

        if (error) {
          throw error;
        }

        if (!user || !mounted) {
          return;
        }

        // -----------------------------------------
        // CREATE TEAM CHANNEL
        // -----------------------------------------

        teamChannel = supabase
          .channel(
            `dashboard-team-count-${user.id}`
          )
          .on(
            "postgres_changes",
            {
              event: "*",

              schema: "public",

              table: "team_members",

              filter: `user_id=eq.${user.id}`,
            },
            () => {
              // -------------------------------------
              // RELOAD TEAM COUNT
              // -------------------------------------

              if (mounted) {
                loadTeamCount();
              }
            }
          );

        // -----------------------------------------
        // SUBSCRIBE AFTER .on()
        // -----------------------------------------

        await teamChannel.subscribe();
      } catch (error) {
        console.error(
          "Dashboard team realtime error:",
          error
        );
      }
    };

    // =========================================
    // START REALTIME
    // =========================================

    setupProjectRealtime();

    setupTeamRealtime();

    // =========================================
    // CLEANUP
    // =========================================

    return () => {
      mounted = false;

      // -----------------------------------------
      // REMOVE PROJECT CHANNEL
      // -----------------------------------------

      if (projectChannel) {
        supabase.removeChannel(
          projectChannel
        );

        projectChannel = null;
      }

      // -----------------------------------------
      // REMOVE TEAM CHANNEL
      // -----------------------------------------

      if (teamChannel) {
        supabase.removeChannel(
          teamChannel
        );

        teamChannel = null;
      }
    };
  }, []);

  // =========================================
  // TODAY TASKS
  // =========================================

  /*
    NOTE:
    Tasks are still demo data at this stage.

    We will connect the Tasks module to the
    backend/database in the next phase.
  */

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
    // =========================================
    // PROJECTS
    // =========================================

    {
      title: "Projects",

      value: stats.projects,

      icon: <FaFolderOpen />,

      color: "#2563eb",

      subtitle: `${stats.activeProjects} active`,

      path: "/projects",
    },

    // =========================================
    // TASKS
    // =========================================

    {
      title: "Tasks",

      value: stats.totalTasks,

      icon: <FaTasks />,

      color: "#10b981",

      subtitle: `${stats.pendingTasks} pending`,

      path: "/tasks",
    },

    // =========================================
    // TEAM
    // =========================================

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

    // =========================================
    // AI SCORE
    // =========================================

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

      {/* ===================================== */}
      {/* TOP STAT CARDS */}
      {/* ===================================== */}

      <DashboardCards
        cards={dashboardCards}
      />

      {/* ===================================== */}
      {/* MAIN DASHBOARD */}
      {/* ===================================== */}

      <div className="dashboard-main">

        {/* =================================== */}
        {/* LEFT SIDE */}
        {/* =================================== */}

        <div className="dashboard-left">

          {/* ================================= */}
          {/* PROJECT CHARTS */}
          {/* ================================= */}

          <DashboardCharts
            projects={recentProjects}
            loading={projectsLoading}
          />

          {/* ================================= */}
          {/* TODAY TASKS */}
          {/* ================================= */}

          <DashboardTasks
            tasks={todayTasks}
          />

          {/* ================================= */}
          {/* ACTIVITY */}
          {/* ================================= */}

          <DashboardActivity />

        </div>

        {/* =================================== */}
        {/* RIGHT SIDE */}
        {/* =================================== */}

        <div className="dashboard-right">

          {/* ================================= */}
          {/* INSIGHTS */}
          {/* ================================= */}

          <DashboardInsights />

          {/* ================================= */}
          {/* QUICK ACTIONS */}
          {/* ================================= */}

          <DashboardQuickActions />

          {/* ================================= */}
          {/* CALENDAR */}
          {/* ================================= */}

          <DashboardCalendar />

          {/* ================================= */}
          {/* REAL TEAM DATA */}
          {/* ================================= */}

          <DashboardTeam />

        </div>

      </div>

    </div>
  );
}

export default Dashboard;