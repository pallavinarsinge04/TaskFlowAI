// =====================================================
// TaskFlowAI Dashboard Analytics Data
// Replace these mock values with API data later.
// =====================================================

// Weekly Productivity (Line Chart)
export const weeklyProductivity = [
  { day: "Mon", completed: 8, created: 10 },
  { day: "Tue", completed: 12, created: 14 },
  { day: "Wed", completed: 15, created: 17 },
  { day: "Thu", completed: 18, created: 20 },
  { day: "Fri", completed: 22, created: 24 },
  { day: "Sat", completed: 16, created: 18 },
  { day: "Sun", completed: 10, created: 12 },
];

// Task Status (Pie Chart)
export const taskStatus = [
  {
    name: "Completed",
    value: 48,
    color: "#10B981",
  },
  {
    name: "In Progress",
    value: 27,
    color: "#3B82F6",
  },
  {
    name: "Pending",
    value: 15,
    color: "#F59E0B",
  },
  {
    name: "Blocked",
    value: 10,
    color: "#EF4444",
  },
];

// Monthly Projects (Bar Chart)
export const monthlyProjects = [
  { month: "Jan", completed: 6 },
  { month: "Feb", completed: 8 },
  { month: "Mar", completed: 10 },
  { month: "Apr", completed: 14 },
  { month: "May", completed: 18 },
  { month: "Jun", completed: 21 },
  { month: "Jul", completed: 24 },
  { month: "Aug", completed: 27 },
];

// Team Performance
export const teamPerformance = [
  {
    member: "Pallavi",
    completed: 36,
    efficiency: 96,
  },
  {
    member: "Rahul",
    completed: 30,
    efficiency: 88,
  },
  {
    member: "Priya",
    completed: 27,
    efficiency: 84,
  },
  {
    member: "Aman",
    completed: 22,
    efficiency: 78,
  },
];

// Sprint Progress
export const sprintProgress = [
  {
    sprint: "Sprint 1",
    progress: 75,
  },
  {
    sprint: "Sprint 2",
    progress: 82,
  },
  {
    sprint: "Sprint 3",
    progress: 91,
  },
];

// AI Insights
export const aiInsights = [
  {
    id: 1,
    type: "success",
    message: "Productivity increased by 18% this week.",
  },
  {
    id: 2,
    type: "warning",
    message: "5 tasks are approaching their deadline.",
  },
  {
    id: 3,
    type: "info",
    message: "AI recommends assigning UI tasks to Pallavi.",
  },
];

// Dashboard Summary
export const dashboardSummary = {
  totalProjects: 24,
  totalTasks: 186,
  completedTasks: 148,
  pendingTasks: 38,
  teamMembers: 12,
  productivity: 94,
};