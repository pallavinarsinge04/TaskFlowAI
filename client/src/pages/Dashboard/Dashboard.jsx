import Sidebar from "./Sidebar";
import Navbar from "../../components/layout/Navbar";
import StatCard from "./StatsCard";
import Board from "./../../components/kanban/Board";
import AIAssistant from "./AIAssistant";
import NotificationPanel from "./../../components/notifications/NotificationPanel";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "📝 Tasks",
      description: "Manage and organize your daily tasks.",
      path: "/tasks",
    },
    {
      title: "📁 Projects",
      description: "Create and manage your projects.",
      path: "/projects",
    },
    {
      title: "🤖 AI Task Analyzer",
      description: "Analyze task priority and difficulty using AI.",
      path: "/ai-task-analyzer",
    },
    {
      title: "🤖 AI Assistant",
      description: "Get AI suggestions for your tasks.",
      path: "/ai-assistant",
    },
    {
      title: "📊 Analytics",
      description: "View productivity and performance analytics.",
      path: "/analytics",
    },
    {
      title: "⏱ Time Tracker",
      description: "Track working hours and productivity.",
      path: "/time-tracker",
    },
    {
      title: "💬 Team Chat",
      description: "Communicate with your team members.",
      path: "/chat",
    },
    {
      title: "🎥 Meeting",
      description: "Join online team meetings.",
      path: "/meeting",
    },
    {
      title: "👥 Team",
      description: "Manage team members and roles.",
      path: "/team",
    },
    {
      title: "📅 Calendar",
      description: "Schedule tasks and upcoming events.",
      path: "/calendar",
    },
    {
      title: "🔔 Notifications",
      description: "View recent notifications.",
      path: "/notifications",
    },
    {
      title: "👤 Profile",
      description: "Manage your personal profile.",
      path: "/profile",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}

      <div className="bg-blue-700 text-white px-10 py-5 flex justify-between items-center shadow-lg">

        <h1 className="text-3xl font-bold">
          🚀 TaskFlowAI Dashboard
        </h1>

        <button
          onClick={() => navigate("/login")}
          className="bg-red-500 px-5 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>

      </div>

      {/* Welcome */}

      <div className="px-10 py-8">

        <h2 className="text-4xl font-bold">
          Welcome Back 👋
        </h2>

        <p className="text-gray-600 mt-2">
          Manage your projects, tasks and AI workflow from one place.
        </p>

      </div>

      {/* Statistics */}

      <div className="grid md:grid-cols-4 gap-6 px-10">

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold">
            Total Tasks
          </h3>
          <p className="text-4xl font-bold mt-3 text-blue-600">
            24
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold">
            Projects
          </h3>
          <p className="text-4xl font-bold mt-3 text-green-600">
            8
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold">
            Completed
          </h3>
          <p className="text-4xl font-bold mt-3 text-purple-600">
            17
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold">
            Productivity
          </h3>
          <p className="text-4xl font-bold mt-3 text-orange-600">
            89%
          </p>
        </div>

      </div>

      {/* Feature Cards */}

      <div className="grid md:grid-cols-3 gap-8 px-10 py-10">

        {cards.map((card, index) => (

          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition duration-300"
          >

            <h2 className="text-2xl font-bold">
              {card.title}
            </h2>

            <p className="mt-3 text-gray-600">
              {card.description}
            </p>

            <button
              onClick={() => navigate(card.path)}
              className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
              Open
            </button>

          </div>

        ))}

      </div>

      {/* Recent Activity */}

      <div className="px-10 pb-10">

        <div className="bg-white rounded-xl shadow-lg p-6">

          <h2 className="text-2xl font-bold mb-5">
            📈 Recent Activity
          </h2>

          <ul className="space-y-4">

            <li className="border-b pb-2">
              ✅ Completed Login Module
            </li>

            <li className="border-b pb-2">
              🤖 AI analyzed 12 tasks today
            </li>

            <li className="border-b pb-2">
              📁 Created new project
            </li>

            <li className="border-b pb-2">
              💬 New team message received
            </li>

            <li>
              📅 Upcoming meeting tomorrow at 10:00 AM
            </li>

          </ul>

        </div>

      </div>

      {/* Footer */}

      <div className="bg-gray-900 text-white text-center py-5">

        © 2026 TaskFlowAI | Smart AI Project Management Platform

      </div>

    </div>
  );
}

export default Dashboard;