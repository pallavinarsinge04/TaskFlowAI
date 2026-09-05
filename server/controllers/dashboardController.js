import supabase from "../config/supabase.js";

/**
 * GET /api/dashboard/analytics
 *
 * Returns dashboard analytics for the authenticated user.
 */
export const getDashboardAnalytics = async (req, res) => {
  try {
    const userId = req.user.id;

    // =====================================================
    // GET USER'S PROJECTS
    // =====================================================

    const {
      data: projects,
      error: projectsError,
    } = await supabase
      .from("projects")
      .select("*")
      .eq("owner", userId)
      .order("created_at", {
        ascending: false,
      });

    if (projectsError) {
      console.error(
        "Dashboard projects analytics error:",
        projectsError
      );

      return res.status(500).json({
        success: false,
        message: projectsError.message,
      });
    }

    const projectList = projects || [];

    const projectIds = projectList.map(
      (project) => project.id
    );

    // =====================================================
    // GET USER TASKS
    // =====================================================

    let tasks = [];

    if (projectIds.length > 0) {
      const {
        data,
        error: tasksError,
      } = await supabase
        .from("tasks")
        .select("*")
        .eq("user_id", userId)
        .in("project_id", projectIds)
        .order("created_at", {
          ascending: false,
        });

      if (tasksError) {
        console.error(
          "Dashboard tasks analytics error:",
          tasksError
        );

        return res.status(500).json({
          success: false,
          message: tasksError.message,
        });
      }

      tasks = data || [];
    }

    // =====================================================
    // TODAY
    // =====================================================

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const todayString =
      today.toISOString().split("T")[0];

    // =====================================================
    // TASK STATISTICS
    // =====================================================

    const totalTasks = tasks.length;

    const completedTasks = tasks.filter(
      (task) =>
        task.completed === true ||
        task.status
          ?.toString()
          .trim()
          .toLowerCase() === "completed"
    ).length;

    const inProgressTasks = tasks.filter(
      (task) =>
        task.status
          ?.toString()
          .trim()
          .toLowerCase() === "in progress"
    ).length;

    const pendingTasks = tasks.filter(
      (task) => {
        const status =
          task.status
            ?.toString()
            .trim()
            .toLowerCase();

        return (
          !task.completed &&
          status !== "completed" &&
          status !== "in progress"
        );
      }
    ).length;

    // =====================================================
    // OVERDUE TASKS
    // =====================================================

    const overdueTaskList = tasks.filter(
      (task) => {
        if (!task.due_date) {
          return false;
        }

        const isCompleted =
          task.completed === true ||
          task.status
            ?.toString()
            .trim()
            .toLowerCase() === "completed";

        if (isCompleted) {
          return false;
        }

        const dueDate = new Date(
          task.due_date
        );

        dueDate.setHours(0, 0, 0, 0);

        return dueDate < today;
      }
    );

    const overdueTasks =
      overdueTaskList.length;

    // =====================================================
    // TODAY'S TASKS
    // =====================================================

    const todayTasks = tasks.filter(
      (task) =>
        task.due_date === todayString
    );

    // =====================================================
    // COMPLETION RATE
    // =====================================================

    const completionRate =
      totalTasks > 0
        ? Math.round(
            (completedTasks /
              totalTasks) *
              100
          )
        : 0;

    // =====================================================
    // PROJECT STATISTICS
    // =====================================================

    const activeProjects =
      projectList.filter(
        (project) => {
          const status =
            project.status
              ?.toString()
              .trim()
              .toLowerCase();

          return (
            status === "active" ||
            status === "in progress"
          );
        }
      ).length;

    const completedProjects =
      projectList.filter(
        (project) => {
          const status =
            project.status
              ?.toString()
              .trim()
              .toLowerCase();

          return status === "completed";
        }
      ).length;

    // =====================================================
    // PROJECT-WISE ANALYTICS
    // =====================================================

    const projectAnalytics =
      projectList.map(
        (project) => {
          const projectTasks =
            tasks.filter(
              (task) =>
                task.project_id ===
                project.id
            );

          const projectCompleted =
            projectTasks.filter(
              (task) =>
                task.completed === true ||
                task.status
                  ?.toString()
                  .trim()
                  .toLowerCase() ===
                  "completed"
            ).length;

          const projectTotal =
            projectTasks.length;

          const projectCompletion =
            projectTotal > 0
              ? Math.round(
                  (projectCompleted /
                    projectTotal) *
                    100
                )
              : 0;

          const projectPending =
            projectTasks.filter(
              (task) => {
                const status =
                  task.status
                    ?.toString()
                    .trim()
                    .toLowerCase();

                return (
                  !task.completed &&
                  status !==
                    "completed" &&
                  status !==
                    "in progress"
                );
              }
            ).length;

          return {
            id: project.id,

            name:
              project.name,

            status:
              project.status,

            priority:
              project.priority,

            totalTasks:
              projectTotal,

            completedTasks:
              projectCompleted,

            pendingTasks:
              projectPending,

            completionRate:
              projectCompletion,
          };
        }
      );

    // =====================================================
    // TEAM PERFORMANCE
    // =====================================================

    const {
      data: teamMembers,
      error: teamError,
    } = await supabase
      .from("team_members")
      .select(
        "id, user_id, name, role, status, project_id"
      )
      .eq("user_id", userId);

    if (teamError) {
      console.error(
        "Team performance error:",
        teamError
      );
    }

    const teamPerformance =
      (teamMembers || []).map(
        (member) => {
          const memberTasks =
            tasks.filter(
              (task) =>
                task.assignee ===
                member.name
            );

          const completed =
            memberTasks.filter(
              (task) =>
                task.completed === true ||
                task.status
                  ?.toString()
                  .trim()
                  .toLowerCase() ===
                  "completed"
            ).length;

          const overdue =
            memberTasks.filter(
              (task) => {
                if (
                  !task.due_date
                ) {
                  return false;
                }

                const isCompleted =
                  task.completed ===
                    true ||
                  task.status
                    ?.toString()
                    .trim()
                    .toLowerCase() ===
                    "completed";

                if (
                  isCompleted
                ) {
                  return false;
                }

                return (
                  task.due_date <
                  todayString
                );
              }
            ).length;

          const memberCompletionRate =
            memberTasks.length >
            0
              ? Math.round(
                  (completed /
                    memberTasks.length) *
                    100
                )
              : 0;

          return {
            id: member.id,

            user_id:
              member.user_id,

            name:
              member.name ||
              "Unknown Member",

            role:
              member.role ||
              "member",

            status:
              member.status ||
              "active",

            project_id:
              member.project_id,

            totalTasks:
              memberTasks.length,

            completedTasks:
              completed,

            overdueTasks:
              overdue,

            completionRate:
              memberCompletionRate,
          };
        }
      );

    // =====================================================
    // PRODUCTIVITY SCORE
    // =====================================================

    // Completion = 60%
    const completionScore =
      completionRate * 0.6;

    // -----------------------------------------------------
    // Deadline performance = 25%
    // -----------------------------------------------------

    const tasksWithDueDates =
      tasks.filter(
        (task) =>
          task.due_date
      );

    let deadlineScore = 100;

    if (
      tasksWithDueDates.length >
      0
    ) {
      const onTimeTasks =
        tasksWithDueDates.filter(
          (task) => {
            const isCompleted =
              task.completed ===
                true ||
              task.status
                ?.toString()
                .trim()
                .toLowerCase() ===
                "completed";

            // Completed tasks count as successfully handled.
            if (isCompleted) {
              return true;
            }

            const dueDate =
              new Date(
                task.due_date
              );

            dueDate.setHours(
              0,
              0,
              0,
              0
            );

            // Task is not overdue.
            return (
              dueDate >= today
            );
          }
        ).length;

      deadlineScore =
        Math.round(
          (onTimeTasks /
            tasksWithDueDates.length) *
            100
        );
    }

    // -----------------------------------------------------
    // Overdue penalty = maximum 15 points
    // -----------------------------------------------------

    const overduePenalty =
      Math.min(
        overdueTasks * 5,
        15
      );

    // -----------------------------------------------------
    // Final productivity score
    // -----------------------------------------------------

    let productivityScore =
      completionScore +
      deadlineScore * 0.25 -
      overduePenalty;

    productivityScore =
      Math.round(
        Math.max(
          0,
          Math.min(
            100,
            productivityScore
          )
        )
      );

    // =====================================================
    // TASK TREND - LAST 7 DAYS
    // =====================================================

    const taskTrend = [];

    for (
      let i = 6;
      i >= 0;
      i--
    ) {
      const date =
        new Date(today);

      date.setDate(
        today.getDate() - i
      );

      const dateString =
        date
          .toISOString()
          .split("T")[0];

      const dayTasks =
        tasks.filter(
          (task) => {
            if (
              !task.created_at
            ) {
              return false;
            }

            return (
              task.created_at.split(
                "T"
              )[0] ===
              dateString
            );
          }
        );

      const completed =
        dayTasks.filter(
          (task) =>
            task.completed ===
              true ||
            task.status
              ?.toString()
              .trim()
              .toLowerCase() ===
              "completed"
        ).length;

      taskTrend.push({
        date: dateString,

        total:
          dayTasks.length,

        completed,
      });
    }

    // =====================================================
    // PRIORITY DISTRIBUTION
    // =====================================================

    const priorityDistribution = {
      High: tasks.filter(
        (task) =>
          task.priority
            ?.toString()
            .trim()
            .toLowerCase() ===
          "high"
      ).length,

      Medium: tasks.filter(
        (task) =>
          task.priority
            ?.toString()
            .trim()
            .toLowerCase() ===
          "medium"
      ).length,

      Low: tasks.filter(
        (task) =>
          task.priority
            ?.toString()
            .trim()
            .toLowerCase() ===
          "low"
      ).length,
    };

    // =====================================================
    // RECENT TASKS
    // =====================================================

    const recentTasks =
      tasks.slice(0, 10);

    // =====================================================
    // RESPONSE
    // =====================================================

    return res.status(200).json({
      success: true,

      analytics: {
        // -------------------------------------------------
        // PROJECT STATS
        // -------------------------------------------------

        projects:
          projectList.length,

        activeProjects,

        completedProjects,

        // -------------------------------------------------
        // TASK STATS
        // -------------------------------------------------

        totalTasks,

        completedTasks,

        pendingTasks,

        inProgressTasks,

        overdueTasks,

        todayTasks,

        completionRate,

        // -------------------------------------------------
        // PRODUCTIVITY
        // -------------------------------------------------

        productivityScore,

        // -------------------------------------------------
        // PROJECT ANALYTICS
        // -------------------------------------------------

        projectAnalytics,

        // -------------------------------------------------
        // TASK ANALYTICS
        // -------------------------------------------------

        taskTrend,

        priorityDistribution,

        overdueTaskList,

        recentTasks,

        // -------------------------------------------------
        // TEAM ANALYTICS
        // -------------------------------------------------

        teamPerformance,
      },
    });
  } catch (error) {
    console.error(
      "Dashboard analytics controller error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to load dashboard analytics.",
      error:
        error.message,
    });
  }
};