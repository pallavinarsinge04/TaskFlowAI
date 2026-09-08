import supabase from "../config/supabase.js";
import { getGeminiModel } from "../config/gemini.js";

// ============================================================
// CHAT
// ============================================================

export const chat = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const model = getGeminiModel();

    const result = await model.generateContent(message);

    const reply = result.response.text();

    return res.status(200).json({
      success: true,
      reply,
    });
  } catch (error) {
    console.error("AI Chat Error:", error);

    return res.status(500).json({
      success: false,
      message: "AI service failed",
      error: error.message,
    });
  }
};

// ============================================================
// IMAGE ANALYSIS
// ============================================================

export const analyzeImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image required",
      });
    }

    const prompt =
      req.body.prompt || "Describe this image.";

    const model = getGeminiModel();

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: req.file.mimetype,
          data: req.file.buffer.toString("base64"),
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      reply: result.response.text(),
    });
  } catch (error) {
    console.error("AI Image Analysis Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Image analysis failed",
    });
  }
};

// ============================================================
// ANALYZE PROJECT
// ============================================================

export const analyzeProject = async (req, res) => {
  try {
    const userId = req.user.id;
    const { projectId } = req.params;

    if (!projectId) {
      return res.status(400).json({
        success: false,
        message: "Project ID is required.",
      });
    }

    // --------------------------------------------------------
    // Verify project ownership
    // --------------------------------------------------------

    const {
      data: project,
      error: projectError,
    } = await supabase
      .from("projects")
      .select("*")
      .eq("id", projectId)
      .eq("owner", userId)
      .single();

    if (projectError || !project) {
      return res.status(404).json({
        success: false,
        message: "Project not found.",
      });
    }

    // --------------------------------------------------------
    // Get project tasks
    // --------------------------------------------------------

    const {
      data: tasks,
      error: taskError,
    } = await supabase
      .from("tasks")
      .select("*")
      .eq("project_id", projectId)
      .eq("user_id", userId)
      .order("created_at", {
        ascending: false,
      });

    if (taskError) {
      console.error("AI task fetch error:", taskError);

      return res.status(500).json({
        success: false,
        message: "Failed to load project tasks.",
      });
    }

    const projectTasks = tasks || [];

    const totalTasks = projectTasks.length;

    const completedTasks = projectTasks.filter(
      (task) =>
        task.completed === true ||
        task.status === "Completed"
    ).length;

    const inProgressTasks = projectTasks.filter(
      (task) => task.status === "In Progress"
    ).length;

    const pendingTasks = projectTasks.filter(
      (task) =>
        task.status === "Pending" &&
        task.completed !== true
    ).length;

    const today = new Date()
      .toISOString()
      .split("T")[0];

    const overdueTasks = projectTasks.filter((task) => {
      if (!task.due_date) return false;

      const completed =
        task.completed === true ||
        task.status === "Completed";

      return !completed && task.due_date < today;
    });

    const highPriorityTasks = projectTasks.filter(
      (task) =>
        task.priority === "High" &&
        task.completed !== true &&
        task.status !== "Completed"
    );

    const upcomingTasks = projectTasks.filter((task) => {
      if (!task.due_date) return false;

      const completed =
        task.completed === true ||
        task.status === "Completed";

      return !completed && task.due_date >= today;
    });

    const completionRate =
      totalTasks > 0
        ? Math.round(
            (completedTasks / totalTasks) * 100
          )
        : 0;

    return res.status(200).json({
      success: true,

      project: {
        id: project.id,
        name: project.name,
        status: project.status,
        priority: project.priority,
      },

      analytics: {
        totalTasks,
        completedTasks,
        inProgressTasks,
        pendingTasks,
        overdueTasks: overdueTasks.length,
        highPriorityTasks: highPriorityTasks.length,
        upcomingTasks: upcomingTasks.length,
        completionRate,
      },

      tasks: projectTasks,

      overdueTaskList: overdueTasks.slice(0, 10),

      highPriorityTaskList:
        highPriorityTasks.slice(0, 10),

      upcomingTaskList:
        upcomingTasks.slice(0, 10),
    });
  } catch (error) {
    console.error(
      "AI project analysis error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to analyze project.",
    });
  }
};

// ============================================================
// CHAT HISTORY
// ============================================================

export const getHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      data,
      error,
    } = await supabase
      .from("ai_chats")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      throw error;
    }

    return res.status(200).json({
      success: true,
      history: data || [],
    });
  } catch (error) {
    console.error("AI history error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================================================
// GENERATE TASKS
// ============================================================

export const generateTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const { projectId } = req.params;
    const { requirement } = req.body;

    if (!projectId) {
      return res.status(400).json({
        success: false,
        message: "Project ID is required.",
      });
    }

    if (!requirement?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Requirement is required.",
      });
    }

    // --------------------------------------------------------
    // Verify project ownership
    // --------------------------------------------------------

    const {
      data: project,
      error: projectError,
    } = await supabase
      .from("projects")
      .select("id,name")
      .eq("id", projectId)
      .eq("owner", userId)
      .single();

    if (projectError || !project) {
      return res.status(404).json({
        success: false,
        message: "Project not found.",
      });
    }

    const prompt = `
You are an expert software project manager.

Generate actionable project tasks from the following requirement.

PROJECT:
${project.name}

REQUIREMENT:
${requirement}

Return ONLY valid JSON using exactly this structure:

{
  "tasks": [
    {
      "title": "short task title",
      "description": "clear task description",
      "priority": "High | Medium | Low",
      "status": "Pending"
    }
  ]
}

Rules:
- Generate between 3 and 10 tasks.
- Tasks must be actionable.
- Avoid duplicate tasks.
- Break large requirements into logical tasks.
- Do not invent unrelated requirements.
- Every generated task must have status "Pending".
`;

    const model = getGeminiModel();

    const result =
      await model.generateContent(prompt);

    const responseText =
      result.response.text();

    const cleanedResponse =
      responseText
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();

    let generated;

    try {
      generated =
        JSON.parse(cleanedResponse);
    } catch (parseError) {
      console.error(
        "AI task JSON parse error:",
        parseError
      );

      return res.status(500).json({
        success: false,
        message:
          "AI returned an invalid task response.",
      });
    }

    if (
      !generated.tasks ||
      !Array.isArray(generated.tasks)
    ) {
      return res.status(500).json({
        success: false,
        message:
          "AI did not return valid tasks.",
      });
    }

    const tasks = generated.tasks
      .slice(0, 10)
      .map((task) => ({
        title:
          String(
            task.title || ""
          ).trim(),

        description:
          String(
            task.description || ""
          ).trim(),

        priority:
          ["High", "Medium", "Low"].includes(
            task.priority
          )
            ? task.priority
            : "Medium",

        status: "Pending",
      }))
      .filter((task) => task.title);

    return res.status(200).json({
      success: true,

      project: {
        id: project.id,
        name: project.name,
      },

      tasks,
    });
  } catch (error) {
    console.error(
      "AI task generation error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to generate tasks.",
    });
  }
};

// ============================================================
// GENERATE PROJECT INSIGHTS
// ============================================================

export const generateProjectInsights = async (
  req,
  res
) => {
  try {
    const userId = req.user.id;
    const { projectId } = req.params;

    if (!projectId) {
      return res.status(400).json({
        success: false,
        message: "Project ID is required.",
      });
    }

    // --------------------------------------------------------
    // Get project
    // --------------------------------------------------------

    const {
      data: project,
      error: projectError,
    } = await supabase
      .from("projects")
      .select("*")
      .eq("id", projectId)
      .eq("owner", userId)
      .single();

    if (projectError || !project) {
      return res.status(404).json({
        success: false,
        message: "Project not found.",
      });
    }

    // --------------------------------------------------------
    // Get tasks
    // --------------------------------------------------------

    const {
      data: tasks,
      error: tasksError,
    } = await supabase
      .from("tasks")
      .select(
        "id,title,description,status,priority,due_date,completed,assignee"
      )
      .eq("project_id", projectId)
      .eq("user_id", userId)
      .order("created_at", {
        ascending: false,
      });

    if (tasksError) {
      console.error(
        "AI tasks error:",
        tasksError
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to load project tasks.",
      });
    }

    const projectTasks = tasks || [];

    const today = new Date()
      .toISOString()
      .split("T")[0];

    const totalTasks =
      projectTasks.length;

    const completedTasks =
      projectTasks.filter(
        (task) =>
          task.completed === true ||
          task.status === "Completed"
      ).length;

    const inProgressTasks =
      projectTasks.filter(
        (task) =>
          task.status === "In Progress"
      ).length;

    const pendingTasks =
      projectTasks.filter(
        (task) =>
          task.status === "Pending" &&
          task.completed !== true
      ).length;

    const overdueTasks =
      projectTasks.filter((task) => {
        if (!task.due_date) return false;

        const completed =
          task.completed === true ||
          task.status === "Completed";

        return (
          !completed &&
          task.due_date < today
        );
      });

    const highPriorityTasks =
      projectTasks.filter(
        (task) =>
          task.priority === "High" &&
          task.completed !== true &&
          task.status !== "Completed"
      );

    const upcomingTasks =
      projectTasks.filter((task) => {
        if (!task.due_date) return false;

        const completed =
          task.completed === true ||
          task.status === "Completed";

        return (
          !completed &&
          task.due_date >= today
        );
      });

    const completionRate =
      totalTasks > 0
        ? Math.round(
            (completedTasks /
              totalTasks) *
              100
          )
        : 0;

    // --------------------------------------------------------
    // Project context
    // --------------------------------------------------------

    const projectContext = {
      project: {
        name: project.name,
        status: project.status,
        priority: project.priority,
      },

      metrics: {
        totalTasks,
        completedTasks,
        inProgressTasks,
        pendingTasks,
        overdueTasks:
          overdueTasks.length,
        highPriorityTasks:
          highPriorityTasks.length,
        upcomingTasks:
          upcomingTasks.length,
        completionRate,
      },

      tasks: projectTasks.map(
        (task) => ({
          title: task.title,
          description:
            task.description,
          status: task.status,
          priority: task.priority,
          dueDate: task.due_date,
          completed:
            task.completed,
          assignee:
            task.assignee,
        })
      ),
    };

    // --------------------------------------------------------
    // Gemini prompt
    // --------------------------------------------------------

    const prompt = `
You are an expert project management assistant.

Analyze the following real project data.

PROJECT DATA:
${JSON.stringify(
  projectContext,
  null,
  2
)}

Provide practical productivity recommendations.

Return ONLY valid JSON using exactly this structure:

{
  "summary": "short project summary",
  "health": "Excellent | Good | Needs Attention | Critical",
  "recommendations": [
    {
      "title": "recommendation title",
      "description": "specific actionable recommendation",
      "priority": "High | Medium | Low"
    }
  ],
  "risks": [
    {
      "title": "risk title",
      "description": "specific risk explanation",
      "severity": "High | Medium | Low"
    }
  ],
  "nextActions": [
    "specific next action",
    "specific next action",
    "specific next action"
  ]
}

Rules:
- Base everything only on supplied project data.
- Do not invent team members.
- Do not invent tasks.
- Do not invent deadlines.
- Do not invent metrics.
- Highlight overdue and high-priority tasks when relevant.
- Recommendations must be actionable.
- Keep the response concise.
`;

    const model =
      getGeminiModel();

    const result =
      await model.generateContent(
        prompt
      );

    const responseText =
      result.response.text();

    const cleanedResponse =
      responseText
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();

    let insights;

    try {
      insights =
        JSON.parse(
          cleanedResponse
        );
    } catch (parseError) {
      console.error(
        "Gemini JSON parse error:",
        parseError
      );

      return res.status(500).json({
        success: false,
        message:
          "AI returned an invalid response. Please try again.",
      });
    }

    return res.status(200).json({
      success: true,

      project: {
        id: project.id,
        name: project.name,
      },

      metrics: {
        totalTasks,
        completedTasks,
        inProgressTasks,
        pendingTasks,
        overdueTasks:
          overdueTasks.length,
        highPriorityTasks:
          highPriorityTasks.length,
        upcomingTasks:
          upcomingTasks.length,
        completionRate,
      },

      insights,
    });
  } catch (error) {
    console.error(
      "Gemini project insights error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to generate AI project insights.",
    });
  }
};

// ============================================================
// PRIORITIZE TASKS
// ============================================================

export const prioritizeTasks = async (
  req,
  res
) => {
  try {
    const userId = req.user.id;
    const { projectId } = req.params;

    if (!projectId) {
      return res.status(400).json({
        success: false,
        message:
          "Project ID is required.",
      });
    }

    // --------------------------------------------------------
    // Verify project ownership
    // --------------------------------------------------------

    const {
      data: project,
      error: projectError,
    } = await supabase
      .from("projects")
      .select("id,name")
      .eq("id", projectId)
      .eq("owner", userId)
      .single();

    if (projectError || !project) {
      return res.status(404).json({
        success: false,
        message:
          "Project not found or access denied.",
      });
    }

    // --------------------------------------------------------
    // Get unfinished tasks
    // --------------------------------------------------------

    const {
      data: tasks,
      error: tasksError,
    } = await supabase
      .from("tasks")
      .select(`
        id,
        title,
        description,
        priority,
        status,
        due_date,
        completed,
        assignee,
        created_at
      `)
      .eq("project_id", projectId)
      .eq("user_id", userId)
      .neq("completed", true)
      .order("created_at", {
        ascending: true,
      });

    if (tasksError) {
      console.error(
        "AI task prioritization error:",
        tasksError
      );

      return res.status(500).json({
        success: false,
        message: tasksError.message,
      });
    }

    if (!tasks || tasks.length === 0) {
      return res.status(200).json({
        success: true,
        project,
        recommendations: [],
        message:
          "No unfinished tasks available for analysis.",
      });
    }

    // --------------------------------------------------------
    // Get team members
    // --------------------------------------------------------

    const {
      data: teamMembers,
      error: teamError,
    } = await supabase
      .from("team_members")
      .select(
        "id,name,role,status"
      )
      .eq("project_id", projectId);

    if (teamError) {
      console.warn(
        "Team member lookup warning:",
        teamError.message
      );
    }

    const members =
      (teamMembers || [])
        .filter(
          (member) =>
            member.status !==
            "inactive"
        )
        .map((member) => ({
          id: member.id,
          name: member.name,
          role: member.role,
        }));

    const today =
      new Date()
        .toISOString()
        .split("T")[0];

    // --------------------------------------------------------
    // Gemini prompt
    // --------------------------------------------------------

    const prompt = `
You are an expert project manager and productivity assistant.

Analyze the unfinished tasks for this project and recommend the best execution order.

PROJECT:
${JSON.stringify(project)}

TODAY:
${today}

TEAM MEMBERS:
${JSON.stringify(members)}

UNFINISHED TASKS:
${JSON.stringify(tasks)}

Return ONLY valid JSON.

Use exactly this structure:

{
  "recommendations": [
    {
      "taskId": "existing task UUID",
      "rank": 1,
      "recommendedPriority": "High | Medium | Low",
      "suggestedDueDate": "YYYY-MM-DD or null",
      "suggestedAssignee": "existing team member name or null",
      "risk": "High | Medium | Low",
      "reason": "short explanation"
    }
  ]
}

Rules:

1. Include every unfinished task exactly once.
2. taskId MUST be an existing task ID.
3. Do not invent task IDs.
4. Do not invent team member names.
5. suggestedAssignee must be null or an existing team member name.
6. Rank tasks from most important to least important.
7. Consider current priority.
8. Consider current status.
9. Consider existing due date.
10. Consider overdue status.
11. Consider task description.
12. Consider dependencies implied by descriptions.
13. Do not change completed tasks.
14. Keep reasonable existing due dates.
15. If no due date exists, suggest a realistic future date.
16. Keep explanations concise.
`;

    const model =
      getGeminiModel();

    const result =
      await model.generateContent(
        prompt
      );

    const responseText =
      result.response.text();

    const cleanedResponse =
      responseText
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();

    let generated;

    try {
      generated =
        JSON.parse(
          cleanedResponse
        );
    } catch (parseError) {
      console.error(
        "AI prioritization JSON error:",
        parseError
      );

      console.error(
        "Gemini response:",
        responseText
      );

      return res.status(500).json({
        success: false,
        message:
          "AI returned an invalid response.",
      });
    }

    if (
      !generated.recommendations ||
      !Array.isArray(
        generated.recommendations
      )
    ) {
      return res.status(500).json({
        success: false,
        message:
          "AI recommendations are missing.",
      });
    }

    // --------------------------------------------------------
    // Validate recommendations
    // --------------------------------------------------------

    const validTaskIds =
      new Set(
        tasks.map(
          (task) => task.id
        )
      );

    const validMemberNames =
      new Set(
        members
          .map(
            (member) =>
              member.name
          )
          .filter(Boolean)
      );

    const allowedPriorities = [
      "High",
      "Medium",
      "Low",
    ];

    const allowedRisks = [
      "High",
      "Medium",
      "Low",
    ];

    const recommendations =
      generated.recommendations
        .filter(
          (recommendation) =>
            validTaskIds.has(
              recommendation.taskId
            )
        )
        .map(
          (
            recommendation,
            index
          ) => {
            let suggestedDueDate =
              recommendation.suggestedDueDate ||
              null;

            if (
              suggestedDueDate &&
              !/^\d{4}-\d{2}-\d{2}$/.test(
                suggestedDueDate
              )
            ) {
              suggestedDueDate =
                null;
            }

            let suggestedAssignee =
              recommendation.suggestedAssignee ||
              null;

            if (
              suggestedAssignee &&
              !validMemberNames.has(
                suggestedAssignee
              )
            ) {
              suggestedAssignee =
                null;
            }

            return {
              taskId:
                recommendation.taskId,

              rank:
                Number(
                  recommendation.rank
                ) ||
                index + 1,

              recommendedPriority:
                allowedPriorities.includes(
                  recommendation.recommendedPriority
                )
                  ? recommendation.recommendedPriority
                  : "Medium",

              suggestedDueDate,

              suggestedAssignee,

              risk:
                allowedRisks.includes(
                  recommendation.risk
                )
                  ? recommendation.risk
                  : "Medium",

              reason:
                String(
                  recommendation.reason ||
                    ""
                ).trim(),
            };
          }
        );

    recommendations.sort(
      (a, b) =>
        a.rank - b.rank
    );

    return res.status(200).json({
      success: true,
      project,
      recommendations,
    });
  } catch (error) {
    console.error(
      "AI task prioritization controller error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to prioritize tasks.",
    });
  }
};

// ============================================================
// DAILY PLAN
// ============================================================

export const generateDailyPlan = async (
  req,
  res
) => {
  try {
    const userId = req.user.id;
    const { projectId } = req.body;

    const today =
      new Date()
        .toISOString()
        .split("T")[0];

    // --------------------------------------------------------
    // Get unfinished tasks
    // --------------------------------------------------------

    let taskQuery =
      supabase
        .from("tasks")
        .select(`
          id,
          project_id,
          title,
          description,
          priority,
          status,
          due_date,
          completed,
          assignee,
          created_at
        `)
        .eq("user_id", userId)
        .neq("completed", true);

    if (projectId) {
      taskQuery =
        taskQuery.eq(
          "project_id",
          projectId
        );
    }

    const {
      data: tasks,
      error: taskError,
    } = await taskQuery.order(
      "due_date",
      {
        ascending: true,
      }
    );

    if (taskError) {
      console.error(
        "Daily planner task error:",
        taskError
      );

      return res.status(500).json({
        success: false,
        message:
          taskError.message,
      });
    }

    // --------------------------------------------------------
    // No tasks
    // --------------------------------------------------------

    if (!tasks || tasks.length === 0) {
      return res.status(200).json({
        success: true,

        plan: {
          greeting:
            "You have no unfinished tasks today. Great job! 🎉",

          summary:
            "Your task list is clear.",

          topPriorities: [],

          schedule: [],

          warnings: [],

          productivityTip:
            "Use this time to plan your next project.",
        },
      });
    }

    // --------------------------------------------------------
    // Get projects
    // --------------------------------------------------------

    const projectIds = [
      ...new Set(
        tasks
          .map(
            (task) =>
              task.project_id
          )
          .filter(Boolean)
      ),
    ];

    let projects = [];

    if (projectIds.length > 0) {
      const {
        data: projectData,
        error: projectError,
      } = await supabase
        .from("projects")
        .select(
          "id,name,priority,status"
        )
        .in("id", projectIds)
        .eq("owner", userId);

      if (!projectError) {
        projects =
          projectData || [];
      }
    }

    const projectMap =
      Object.fromEntries(
        projects.map(
          (project) => [
            project.id,
            project,
          ]
        )
      );

    const taskContext =
      tasks.map((task) => ({
        id: task.id,

        project:
          projectMap[
            task.project_id
          ]?.name ||
          "Unknown Project",

        title: task.title,

        description:
          task.description,

        priority:
          task.priority,

        status:
          task.status,

        dueDate:
          task.due_date,

        assignee:
          task.assignee,
      }));

    // --------------------------------------------------------
    // Gemini prompt
    // --------------------------------------------------------

    const prompt = `
You are an expert productivity coach and project manager.

Create a practical daily work plan for the user.

TODAY:
${today}

TASKS:
${JSON.stringify(
  taskContext
)}

Return ONLY valid JSON using exactly this structure:

{
  "greeting": "short motivating greeting",
  "summary": "short summary of today's workload",
  "topPriorities": [
    {
      "taskId": "existing task UUID",
      "title": "existing task title",
      "reason": "why this should be prioritized"
    }
  ],
  "schedule": [
    {
      "startTime": "09:00",
      "endTime": "10:00",
      "taskId": "existing task UUID",
      "title": "existing task title",
      "reason": "short reason"
    }
  ],
  "warnings": [
    {
      "taskId": "existing task UUID or null",
      "message": "warning"
    }
  ],
  "productivityTip": "one practical productivity tip"
}

Rules:

1. Use only existing task IDs.
2. Do not invent tasks.
3. Do not schedule completed tasks.
4. Prioritize overdue and high-priority tasks.
5. Consider existing due dates.
6. Use focused work periods for important tasks.
7. Top priorities should contain at most 3 tasks.
8. Schedule realistic work blocks.
9. Do not schedule more than 8 working hours.
10. Avoid unnecessary task switching.
11. Mention deadline risks in warnings.
12. Keep explanations concise.
`;

    const model =
      getGeminiModel();

    const result =
      await model.generateContent(
        prompt
      );

    const responseText =
      result.response.text();

    const cleanedResponse =
      responseText
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();

    let generated;

    try {
      generated =
        JSON.parse(
          cleanedResponse
        );
    } catch (parseError) {
      console.error(
        "Daily planner JSON error:",
        parseError
      );

      console.error(
        "Gemini response:",
        responseText
      );

      return res.status(500).json({
        success: false,
        message:
          "AI returned an invalid daily plan.",
      });
    }

    // --------------------------------------------------------
    // Validate tasks
    // --------------------------------------------------------

    const validTaskIds =
      new Set(
        tasks.map(
          (task) => task.id
        )
      );

    const validTasks =
      new Map(
        tasks.map(
          (task) => [
            task.id,
            task,
          ]
        )
      );

    const topPriorities =
      Array.isArray(
        generated.topPriorities
      )
        ? generated.topPriorities
            .filter(
              (item) =>
                validTaskIds.has(
                  item.taskId
                )
            )
            .slice(0, 3)
            .map((item) => ({
              taskId:
                item.taskId,

              title:
                validTasks.get(
                  item.taskId
                )?.title ||
                item.title,

              reason:
                String(
                  item.reason ||
                    ""
                ).trim(),
            }))
        : [];

    const schedule =
      Array.isArray(
        generated.schedule
      )
        ? generated.schedule
            .filter(
              (item) =>
                validTaskIds.has(
                  item.taskId
                )
            )
            .map((item) => ({
              startTime:
                item.startTime,

              endTime:
                item.endTime,

              taskId:
                item.taskId,

              title:
                validTasks.get(
                  item.taskId
                )?.title ||
                item.title,

              reason:
                String(
                  item.reason ||
                    ""
                ).trim(),
            }))
        : [];

    const warnings =
      Array.isArray(
        generated.warnings
      )
        ? generated.warnings
            .filter(
              (item) =>
                item.taskId ===
                  null ||
                validTaskIds.has(
                  item.taskId
                )
            )
            .map((item) => ({
              taskId:
                item.taskId ||
                null,

              message:
                String(
                  item.message ||
                    ""
                ).trim(),
            }))
        : [];

    return res.status(200).json({
      success: true,

      date: today,

      plan: {
        greeting:
          generated.greeting ||
          "Good morning! Let's get productive. 🚀",

        summary:
          generated.summary ||
          "Here is your plan for today.",

        topPriorities,

        schedule,

        warnings,

        productivityTip:
          generated.productivityTip ||
          "Focus on one important task at a time.",
      },
    });
  } catch (error) {
    console.error(
      "Daily planner controller error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to generate daily plan.",
    });
  }
};

// ============================================================
// AI CHAT ASSISTANT
// ============================================================

export const chatWithAI = async (
  req,
  res
) => {
  try {
    const userId = req.user.id;
    const { message } = req.body;

    if (
      !message ||
      !message.trim()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Message is required.",
      });
    }

    // --------------------------------------------------------
    // Get projects
    // --------------------------------------------------------

    const {
      data: projects,
      error: projectError,
    } = await supabase
      .from("projects")
      .select(
        "id,name,description,status,priority,created_at"
      )
      .eq("owner", userId)
      .order("created_at", {
        ascending: false,
      });

    if (projectError) {
      console.error(
        "AI chat project error:",
        projectError
      );

      return res.status(500).json({
        success: false,
        message:
          projectError.message,
      });
    }

    // --------------------------------------------------------
    // Get tasks
    // --------------------------------------------------------

    const {
      data: tasks,
      error: taskError,
    } = await supabase
      .from("tasks")
      .select(`
        id,
        project_id,
        title,
        description,
        status,
        priority,
        due_date,
        completed,
        assignee,
        created_at
      `)
      .eq("user_id", userId)
      .order("created_at", {
        ascending: false,
      });

    if (taskError) {
      console.error(
        "AI chat task error:",
        taskError
      );

      return res.status(500).json({
        success: false,
        message:
          taskError.message,
      });
    }

    // --------------------------------------------------------
    // Get team members
    // --------------------------------------------------------

    const {
      data: teamMembers,
    } = await supabase
      .from("team_members")
      .select(
        "id,name,role,status,project_id"
      )
      .eq("user_id", userId);

    // --------------------------------------------------------
    // Project lookup
    // --------------------------------------------------------

    const projectMap =
      Object.fromEntries(
        (projects || []).map(
          (project) => [
            project.id,
            project,
          ]
        )
      );

    // --------------------------------------------------------
    // Task context
    // --------------------------------------------------------

    const taskContext =
      (tasks || []).map(
        (task) => ({
          id: task.id,

          project:
            projectMap[
              task.project_id
            ]?.name ||
            "Unknown Project",

          title:
            task.title,

          description:
            task.description ||
            "",

          status:
            task.status ||
            "Pending",

          priority:
            task.priority ||
            "Medium",

          dueDate:
            task.due_date ||
            null,

          completed:
            task.completed === true,

          assignee:
            task.assignee ||
            null,
        })
      );

    // --------------------------------------------------------
    // Statistics
    // --------------------------------------------------------

    const today =
      new Date()
        .toISOString()
        .split("T")[0];

    const totalTasks =
      taskContext.length;

    const completedTasks =
      taskContext.filter(
        (task) =>
          task.completed ||
          task.status ===
            "Completed"
      ).length;

    const pendingTasks =
      taskContext.filter(
        (task) =>
          !task.completed &&
          task.status ===
            "Pending"
      ).length;

    const inProgressTasks =
      taskContext.filter(
        (task) =>
          !task.completed &&
          task.status ===
            "In Progress"
      ).length;

    const overdueTasks =
      taskContext.filter(
        (task) =>
          !task.completed &&
          task.dueDate &&
          task.dueDate < today
      );

    const highPriorityTasks =
      taskContext.filter(
        (task) =>
          !task.completed &&
          task.priority ===
            "High"
      );

    // --------------------------------------------------------
    // Gemini prompt
    // --------------------------------------------------------

    const prompt = `
You are TaskFlowAI's intelligent project management assistant.

Answer the user's question using ONLY the project, task, and team data provided below.

USER QUESTION:
${message.trim()}

TODAY:
${today}

PROJECTS:
${JSON.stringify(
  projects || []
)}

TASKS:
${JSON.stringify(
  taskContext
)}

TEAM MEMBERS:
${JSON.stringify(
  teamMembers || []
)}

STATISTICS:
${JSON.stringify({
  totalProjects:
    projects?.length || 0,

  totalTasks,

  completedTasks,

  pendingTasks,

  inProgressTasks,

  overdueTasks:
    overdueTasks.length,

  highPriorityTasks:
    highPriorityTasks.length,
})}

IMPORTANT RULES:

1. Do not invent projects.
2. Do not invent tasks.
3. Do not invent team members.
4. Use actual task titles and project names.
5. If requested information is unavailable, say so.
6. Give practical project-management advice when appropriate.
7. Keep the answer concise but useful.
8. Use bullet points when appropriate.
9. Mention the project when discussing an individual task.
10. Do not expose internal database IDs unless specifically requested.

Return a natural-language answer only.
`;

    const model =
      getGeminiModel();

    const result =
      await model.generateContent(
        prompt
      );

    const answer =
      result.response
        .text()
        .trim();

    return res.status(200).json({
      success: true,

      answer,

      stats: {
        totalProjects:
          projects?.length || 0,

        totalTasks,

        completedTasks,

        pendingTasks,

        inProgressTasks,

        overdueTasks:
          overdueTasks.length,

        highPriorityTasks:
          highPriorityTasks.length,
      },
    });
  } catch (error) {
    console.error(
      "AI chat controller error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to process AI chat.",
    });
  }
};
export const executeTaskCommand = async (req, res) => {
  try {
    const userId = req.user.id;
    const { message, projectId, confirmed = false } = req.body;

    if (!message?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Command is required.",
      });
    }

    if (!projectId) {
      return res.status(400).json({
        success: false,
        message: "Project ID is required.",
      });
    }

    // --------------------------------------------------
    // 1. Verify project ownership
    // --------------------------------------------------

    const { data: project, error: projectError } = await supabase
      .from("projects")
      .select("id, name")
      .eq("id", projectId)
      .eq("owner", userId)
      .single();

    if (projectError || !project) {
      return res.status(404).json({
        success: false,
        message: "Project not found or access denied.",
      });
    }

    // --------------------------------------------------
    // 2. Get existing tasks
    // --------------------------------------------------

    const { data: existingTasks, error: tasksError } = await supabase
      .from("tasks")
      .select(
        "id, project_id, title, description, priority, status, due_date, completed, assignee"
      )
      .eq("project_id", projectId)
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (tasksError) {
      console.error("AI command task fetch error:", tasksError);

      return res.status(500).json({
        success: false,
        message: "Failed to load project tasks.",
      });
    }

    const taskContext = (existingTasks || []).map((task) => ({
      id: task.id,
      title: task.title,
      description: task.description || "",
      priority: task.priority || "Medium",
      status: task.status || "Pending",
      dueDate: task.due_date || null,
      completed: task.completed || false,
      assignee: task.assignee || "",
    }));

    // --------------------------------------------------
    // 3. Ask Gemini to understand command
    // --------------------------------------------------

    const model = getGeminiModel();

    const prompt = `
You are an AI project management assistant.

PROJECT:
${project.name}

USER COMMAND:
${message}

EXISTING TASKS:
${JSON.stringify(taskContext, null, 2)}

Convert the user's command into exactly ONE task action.

Return ONLY valid JSON:

{
  "action": "create_task | update_task | delete_task | unknown",
  "taskId": null,
  "title": "",
  "description": "",
  "priority": "High | Medium | Low",
  "status": "Pending | In Progress | Completed",
  "dueDate": null
}

RULES:

1. create_task:
   - Use when the user wants to create a new task.
   - title is required.
   - taskId must be null.

2. update_task:
   - Use when the user wants to modify an existing task.
   - Match the user's requested task against EXISTING TASKS.
   - taskId MUST be the ID of an existing task.
   - Never invent a task ID.
   - Only provide fields that need changing.

3. delete_task:
   - Use ONLY when the user explicitly asks to delete/remove a task.
   - Match the requested task against EXISTING TASKS.
   - taskId MUST be an existing task ID.
   - Never invent a task ID.

4. unknown:
   - Use when the command is unclear.
   - Use when an existing task cannot be confidently identified.

5. Priority must be exactly:
   High
   Medium
   Low

6. Status must be exactly:
   Pending
   In Progress
   Completed

7. dueDate must use:
   YYYY-MM-DD
   or null.

8. Do not invent tasks or task IDs.
`;

    const result = await model.generateContent(prompt);

    const responseText = result.response.text();

    const cleanedResponse = responseText
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    let command;

    try {
      command = JSON.parse(cleanedResponse);
    } catch (parseError) {
      console.error("AI command JSON parse error:", parseError);
      console.error("Gemini response:", responseText);

      return res.status(500).json({
        success: false,
        message: "AI returned an invalid command.",
      });
    }

    // --------------------------------------------------
    // 4. Validate action
    // --------------------------------------------------

    const allowedActions = [
      "create_task",
      "update_task",
      "delete_task",
    ];

    if (!allowedActions.includes(command.action)) {
      return res.status(400).json({
        success: false,
        action: "unknown",
        message:
          "I could not understand the task command. Please be more specific.",
      });
    }

    // --------------------------------------------------
    // 5. CREATE TASK
    // --------------------------------------------------

    if (command.action === "create_task") {
      if (!command.title?.trim()) {
        return res.status(400).json({
          success: false,
          message: "Task title is required.",
        });
      }

      const priority = ["High", "Medium", "Low"].includes(command.priority)
        ? command.priority
        : "Medium";

      const status = ["Pending", "In Progress", "Completed"].includes(
        command.status
      )
        ? command.status
        : "Pending";

      const completed = status === "Completed";

      const { data: task, error: createError } = await supabase
        .from("tasks")
        .insert({
          project_id: project.id,
          user_id: userId,
          title: command.title.trim(),
          description: command.description?.trim() || "",
          priority,
          status,
          completed,
          assignee: "",
          due_date: command.dueDate || null,
        })
        .select()
        .single();

      if (createError) {
        console.error("AI create task error:", createError);

        return res.status(500).json({
          success: false,
          message: "Failed to create task.",
        });
      }

      // Activity log
      try {
        await createActivityLog({
          userId,
          projectId: project.id,
          action: "created",
          entityType: "task",
          entityId: task.id,
          description: `AI created task "${task.title}"`,
          metadata: {
            source: "AI",
            priority: task.priority,
            status: task.status,
          },
        });
      } catch (activityError) {
        console.warn(
          "AI task activity log skipped:",
          activityError.message
        );
      }

      // Socket event
      try {
        getIO().emit("taskCreated", task);
      } catch (socketError) {
        console.warn(
          "AI task socket event skipped:",
          socketError.message
        );
      }

      return res.status(201).json({
        success: true,
        action: "create_task",
        message: `Task "${task.title}" created successfully.`,
        task,
      });
    }

    // --------------------------------------------------
    // 6. UPDATE TASK
    // --------------------------------------------------

    if (command.action === "update_task") {
      if (!command.taskId) {
        return res.status(400).json({
          success: false,
          message:
            "I could not identify which task you want to update.",
        });
      }

      const existingTask = taskContext.find(
        (task) => task.id === command.taskId
      );

      if (!existingTask) {
        return res.status(404).json({
          success: false,
          message: "The requested task was not found.",
        });
      }

      const updateData = {};

      if (command.title?.trim()) {
        updateData.title = command.title.trim();
      }

      if (typeof command.description === "string") {
        updateData.description = command.description.trim();
      }

      if (
        ["High", "Medium", "Low"].includes(command.priority)
      ) {
        updateData.priority = command.priority;
      }

      if (
        ["Pending", "In Progress", "Completed"].includes(
          command.status
        )
      ) {
        updateData.status = command.status;
        updateData.completed = command.status === "Completed";
      }

      if (command.dueDate !== undefined) {
        updateData.due_date = command.dueDate || null;
      }

      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({
          success: false,
          message: "No valid task changes were detected.",
        });
      }

      const { data: updatedTask, error: updateError } = await supabase
        .from("tasks")
        .update(updateData)
        .eq("id", existingTask.id)
        .eq("project_id", project.id)
        .eq("user_id", userId)
        .select()
        .single();

      if (updateError) {
        console.error("AI update task error:", updateError);

        return res.status(500).json({
          success: false,
          message: "Failed to update task.",
        });
      }

      // Activity log
      try {
        await createActivityLog({
          userId,
          projectId: project.id,
          action: "updated",
          entityType: "task",
          entityId: updatedTask.id,
          description: `AI updated task "${updatedTask.title}"`,
          metadata: {
            source: "AI",
            updatedFields: Object.keys(updateData),
          },
        });
      } catch (activityError) {
        console.warn(
          "AI update activity log skipped:",
          activityError.message
        );
      }

      // Socket event
      try {
        getIO().emit("taskUpdated", updatedTask);
      } catch (socketError) {
        console.warn(
          "AI task update socket event skipped:",
          socketError.message
        );
      }

      return res.status(200).json({
        success: true,
        action: "update_task",
        message: `Task "${updatedTask.title}" updated successfully.`,
        task: updatedTask,
      });
    }

    // --------------------------------------------------
    // 7. DELETE TASK
    // --------------------------------------------------

    if (command.action === "delete_task") {
      if (!command.taskId) {
        return res.status(400).json({
          success: false,
          message:
            "I could not identify which task you want to delete.",
        });
      }

      const existingTask = taskContext.find(
        (task) => task.id === command.taskId
      );

      if (!existingTask) {
        return res.status(404).json({
          success: false,
          message: "The requested task was not found.",
        });
      }

      // First request confirmation
      if (!confirmed) {
        return res.status(200).json({
          success: true,
          requiresConfirmation: true,
          action: "delete_task",
          task: existingTask,
          message: `Are you sure you want to delete "${existingTask.title}"?`,
        });
      }

      // Actual deletion
      const { error: deleteError } = await supabase
        .from("tasks")
        .delete()
        .eq("id", existingTask.id)
        .eq("project_id", project.id)
        .eq("user_id", userId);

      if (deleteError) {
        console.error("AI delete task error:", deleteError);

        return res.status(500).json({
          success: false,
          message: "Failed to delete task.",
        });
      }

      // Activity log
      try {
        await createActivityLog({
          userId,
          projectId: project.id,
          action: "deleted",
          entityType: "task",
          entityId: existingTask.id,
          description: `AI deleted task "${existingTask.title}"`,
          metadata: {
            source: "AI",
            priority: existingTask.priority,
            status: existingTask.status,
          },
        });
      } catch (activityError) {
        console.warn(
          "AI delete activity log skipped:",
          activityError.message
        );
      }

      // Socket event
      try {
        getIO().emit("taskDeleted", {
          id: existingTask.id,
          project_id: project.id,
        });
      } catch (socketError) {
        console.warn(
          "AI task delete socket event skipped:",
          socketError.message
        );
      }

      return res.status(200).json({
        success: true,
        action: "delete_task",
        message: `Task "${existingTask.title}" deleted successfully.`,
        taskId: existingTask.id,
      });
    }

    return res.status(400).json({
      success: false,
      message: "Unsupported AI task command.",
    });
  } catch (error) {
    console.error("Execute AI task command error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to execute AI task command.",
      error: error.message,
    });
  }
};