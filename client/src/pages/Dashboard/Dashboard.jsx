import "./Dashboard.css";

import DashboardCards from "./DashboardCards";
import DashboardCharts from "./DashboardCharts";
import DashboardInsights from "./DashboardInsights";
import DashboardCalendar from "./DashboardCalendar";
import DashboardActivity from "./DashboardActivity";
import DashboardTeam from "./DashboardTeam";
import DashboardQuickActions from "./DashboardQuickActions";
import DashboardTasks from "./DashboardTasks";
import ProductivityScore from "./ProductivityScore";

import {
  FaFolderOpen,
  FaTasks,
  FaUsers,
  FaRobot,
} from "react-icons/fa";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { supabase } from "../../supabase/supabaseClient";
import socket from "../../socket/socket";

import TaskAnalytics from "./TaskAnalytics";
import TeamPerformance from "./TeamPerformance";
import AICommandCenter from "./AICommandCenter";

function Dashboard() {
  // =====================================================
  // DASHBOARD STATS
  // =====================================================

  const [stats, setStats] = useState({
    projects: 0,
    activeProjects: 0,
    completedProjects: 0,

    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    inProgressTasks: 0,
    overdueTasks: 0,

    teamMembers: 0,

    completionRate: 0,
    productivityScore: 0,
  });

  // =====================================================
  // PROJECTS
  // =====================================================

  const [recentProjects, setRecentProjects] =
    useState([]);

  // =====================================================
  // TODAY TASKS
  // =====================================================

  const [todayTasks, setTodayTasks] =
    useState([]);

  // =====================================================
  // PROJECT ANALYTICS
  // =====================================================

  const [projectAnalytics, setProjectAnalytics] =
    useState([]);

  // =====================================================
  // TASK ANALYTICS
  // =====================================================

  const [taskTrend, setTaskTrend] =
    useState([]);

  const [priorityDistribution, setPriorityDistribution] =
    useState({
      High: 0,
      Medium: 0,
      Low: 0,
    });

  const [overdueTaskList, setOverdueTaskList] =
    useState([]);

  // =====================================================
  // TEAM PERFORMANCE
  // =====================================================

  const [teamPerformance, setTeamPerformance] =
    useState([]);

  // =====================================================
  // LOADING
  // =====================================================

  const [loading, setLoading] =
    useState(true);

  // =====================================================
  // LOAD DASHBOARD ANALYTICS
  // =====================================================

  const loadAnalytics = useCallback(
    async () => {
      try {
        setLoading(true);

        // ---------------------------------------------
        // GET SUPABASE SESSION
        // ---------------------------------------------

        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) {
          throw sessionError;
        }

        const token =
          session?.access_token;

        if (!token) {
          console.log(
            "Dashboard: no access token."
          );

          return;
        }

        // ---------------------------------------------
        // GET DASHBOARD ANALYTICS
        // ---------------------------------------------

        const response = await fetch(
          "http://localhost:5000/api/dashboard/analytics",
          {
            method: "GET",

            headers: {
              Authorization:
                `Bearer ${token}`,

              "Content-Type":
                "application/json",
            },
          }
        );

        const result =
          await response.json();

        if (!response.ok) {
          throw new Error(
            result.message ||
              "Failed to load dashboard analytics."
          );
        }

        const analytics =
          result.analytics || {};

        // ---------------------------------------------
        // UPDATE MAIN STATS
        // ---------------------------------------------

        setStats((prev) => ({
          ...prev,

          projects:
            analytics.projects || 0,

          activeProjects:
            analytics.activeProjects || 0,

          completedProjects:
            analytics.completedProjects || 0,

          totalTasks:
            analytics.totalTasks || 0,

          completedTasks:
            analytics.completedTasks || 0,

          pendingTasks:
            analytics.pendingTasks || 0,

          inProgressTasks:
            analytics.inProgressTasks || 0,

          overdueTasks:
            analytics.overdueTasks || 0,

          teamMembers:
            analytics.teamMembers ||
            prev.teamMembers ||
            0,

          completionRate:
            analytics.completionRate || 0,

          productivityScore:
            analytics.productivityScore || 0,
        }));

        // ---------------------------------------------
        // PROJECT ANALYTICS
        // ---------------------------------------------

        setProjectAnalytics(
          analytics.projectAnalytics || []
        );

        // ---------------------------------------------
        // TODAY TASKS
        // ---------------------------------------------

        setTodayTasks(
          analytics.todayTasks || []
        );

        // ---------------------------------------------
        // TASK TREND
        // ---------------------------------------------

        setTaskTrend(
          analytics.taskTrend || []
        );

        // ---------------------------------------------
        // PRIORITY DISTRIBUTION
        // ---------------------------------------------

        setPriorityDistribution(
          analytics.priorityDistribution || {
            High: 0,
            Medium: 0,
            Low: 0,
          }
        );

        // ---------------------------------------------
        // OVERDUE TASK LIST
        // ---------------------------------------------

        setOverdueTaskList(
          analytics.overdueTaskList || []
        );

        // ---------------------------------------------
        // TEAM PERFORMANCE
        // ---------------------------------------------

        setTeamPerformance(
          analytics.teamPerformance || []
        );

        // ---------------------------------------------
        // RECENT PROJECTS
        // ---------------------------------------------

        setRecentProjects(
          (
            analytics.projectAnalytics ||
            []
          ).slice(0, 5)
        );

        // ---------------------------------------------
        // DEBUG
        // ---------------------------------------------

        console.log(
          "📊 Dashboard analytics:",
          analytics
        );
      } catch (error) {
        console.error(
          "Dashboard analytics error:",
          error
        );
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // =====================================================
  // LOAD TEAM COUNT
  // =====================================================

  const loadTeamCount =
    useCallback(async () => {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) {
          throw userError;
        }

        if (!user) {
          setStats((prev) => ({
            ...prev,
            teamMembers: 0,
          }));

          return;
        }

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
    }, []);

  // =====================================================
  // INITIAL LOAD + REALTIME
  // =====================================================

  useEffect(() => {
    let mounted = true;

    let projectChannel = null;
    let teamChannel = null;
    let taskChannel = null;

    // ===================================================
    // SUPABASE REALTIME
    // ===================================================

    const setupRealtime = async () => {
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

        // -----------------------------------------------
        // PROJECT REALTIME
        // -----------------------------------------------

        projectChannel =
          supabase
            .channel(
              `dashboard-projects-${user.id}`
            )
            .on(
              "postgres_changes",
              {
                event: "*",
                schema: "public",
                table: "projects",
                filter:
                  `owner=eq.${user.id}`,
              },
              () => {
                if (mounted) {
                  loadAnalytics();
                }
              }
            );

        await projectChannel.subscribe();

        // -----------------------------------------------
        // TEAM REALTIME
        // -----------------------------------------------

        teamChannel =
          supabase
            .channel(
              `dashboard-team-count-${user.id}`
            )
            .on(
              "postgres_changes",
              {
                event: "*",
                schema: "public",
                table: "team_members",
                filter:
                  `user_id=eq.${user.id}`,
              },
              () => {
                if (mounted) {
                  loadTeamCount();
                  loadAnalytics();
                }
              }
            );

        await teamChannel.subscribe();

        // -----------------------------------------------
        // TASK REALTIME
        // -----------------------------------------------

        taskChannel =
          supabase
            .channel(
              `dashboard-tasks-${user.id}`
            )
            .on(
              "postgres_changes",
              {
                event: "*",
                schema: "public",
                table: "tasks",
                filter:
                  `user_id=eq.${user.id}`,
              },
              () => {
                if (mounted) {
                  loadAnalytics();
                }
              }
            );

        await taskChannel.subscribe();

      } catch (error) {
        console.error(
          "Dashboard realtime error:",
          error
        );
      }
    };

    // ===================================================
    // INITIAL DATA
    // ===================================================

    loadAnalytics();
    loadTeamCount();
    setupRealtime();

    // ===================================================
    // SOCKET.IO TASK EVENTS
    // ===================================================

    const handleTaskCreated = () => {
      if (mounted) {
        loadAnalytics();
      }
    };

    const handleTaskUpdated = () => {
      if (mounted) {
        loadAnalytics();
      }
    };

    const handleTaskDeleted = () => {
      if (mounted) {
        loadAnalytics();
      }
    };

    socket.on(
      "taskCreated",
      handleTaskCreated
    );

    socket.on(
      "taskUpdated",
      handleTaskUpdated
    );

    socket.on(
      "taskDeleted",
      handleTaskDeleted
    );

    // ===================================================
    // CLEANUP
    // ===================================================

    return () => {
      mounted = false;

      socket.off(
        "taskCreated",
        handleTaskCreated
      );

      socket.off(
        "taskUpdated",
        handleTaskUpdated
      );

      socket.off(
        "taskDeleted",
        handleTaskDeleted
      );

      if (projectChannel) {
        supabase.removeChannel(
          projectChannel
        );
      }

      if (teamChannel) {
        supabase.removeChannel(
          teamChannel
        );
      }

      if (taskChannel) {
        supabase.removeChannel(
          taskChannel
        );
      }
    };
  }, [
    loadAnalytics,
    loadTeamCount,
  ]);

  // =====================================================
  // DASHBOARD CARDS
  // =====================================================

  const dashboardCards = [
    {
      title: "Projects",

      value: stats.projects,

      icon: <FaFolderOpen />,

      color: "#2563eb",

      subtitle:
        `${stats.activeProjects} active`,

      path: "/projects",
    },

    {
      title: "Tasks",

      value: stats.totalTasks,

      icon: <FaTasks />,

      color: "#10b981",

      subtitle:
        `${stats.completedTasks} completed`,

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

      value:
        `${stats.productivityScore}%`,

      icon: <FaRobot />,

      color: "#8b5cf6",

      subtitle:
        "Productivity rating",

      path: "/ai-assistant",
    },
  ];

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="dashboard">

      {/* ================================================= */}
      {/* TOP CARDS */}
      {/* ================================================= */}

      <DashboardCards
        cards={dashboardCards}
      />

      {/* ================================================= */}
      {/* ANALYTICS SUMMARY */}
      {/* ================================================= */}

      <div className="dashboard-analytics-summary">

        <div className="analytics-item">
          <span>Total Tasks</span>

          <strong>
            {loading
              ? "..."
              : stats.totalTasks}
          </strong>
        </div>

        <div className="analytics-item">
          <span>Completed</span>

          <strong>
            {loading
              ? "..."
              : stats.completedTasks}
          </strong>
        </div>

        <div className="analytics-item">
          <span>In Progress</span>

          <strong>
            {loading
              ? "..."
              : stats.inProgressTasks}
          </strong>
        </div>

        <div className="analytics-item">
          <span>Pending</span>

          <strong>
            {loading
              ? "..."
              : stats.pendingTasks}
          </strong>
        </div>

        <div className="analytics-item">
          <span>Overdue</span>

          <strong>
            {loading
              ? "..."
              : stats.overdueTasks}
          </strong>
        </div>

        <div className="analytics-item">
          <span>Completion Rate</span>

          <strong>
            {loading
              ? "..."
              : `${stats.completionRate}%`}
          </strong>
        </div>

      </div>

      {/* ================================================= */}
      {/* MAIN DASHBOARD */}
      {/* ================================================= */}

      <div className="dashboard-main">

        {/* =============================================== */}
        {/* LEFT SIDE */}
        {/* =============================================== */}

        <div className="dashboard-left">

          {/* --------------------------------------------- */}
          {/* PROJECT PRODUCTIVITY */}
          {/* --------------------------------------------- */}

          <DashboardCharts
            projects={recentProjects}
          />

          {/* --------------------------------------------- */}
          {/* TASK ANALYTICS */}
          {/* --------------------------------------------- */}

          <TaskAnalytics
            taskTrend={taskTrend}
            priorityDistribution={
              priorityDistribution
            }
            overdueTaskList={
              overdueTaskList
            }
          />

          {/* --------------------------------------------- */}
          {/* TEAM PERFORMANCE */}
          {/* --------------------------------------------- */}

          <TeamPerformance
            members={teamPerformance}
          />

          {/* --------------------------------------------- */}
          {/* TODAY'S TASKS */}
          {/* --------------------------------------------- */}

          <DashboardTasks
            tasks={todayTasks}
          />

          {/* --------------------------------------------- */}
          {/* ACTIVITY */}
          {/* --------------------------------------------- */}

          <DashboardActivity />

        </div>

        {/* =============================================== */}
        {/* RIGHT SIDE */}
        {/* =============================================== */}

        <div className="dashboard-right">

          {/* --------------------------------------------- */}
          {/* PRODUCTIVITY SCORE */}
          {/* --------------------------------------------- */}

          <ProductivityScore
            score={
              stats.productivityScore
            }
          />

          {/* --------------------------------------------- */}
          {/* DASHBOARD INSIGHTS */}
          {/* --------------------------------------------- */}

          <DashboardInsights
            stats={stats}
          />

          {/* --------------------------------------------- */}
          {/* QUICK ACTIONS */}
          {/* --------------------------------------------- */}

          <DashboardQuickActions />

          {/* --------------------------------------------- */}
          {/* CALENDAR */}
          {/* --------------------------------------------- */}

          <DashboardCalendar />

          {/* --------------------------------------------- */}
          {/* TEAM */}
          {/* --------------------------------------------- */}

          <DashboardTeam />

          {/* --------------------------------------------- */}
          {/* AI COMMAND CENTER */}
          {/* --------------------------------------------- */}

          <AICommandCenter
            project={recentProjects[0]}
            onTasksUpdated={() => {
              loadAnalytics();
            }}
          />

        </div>

      </div>

    </div>
  );
}

export default Dashboard;