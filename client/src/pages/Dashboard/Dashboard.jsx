import Sidebar from "./Sidebar";
import StatCard from "./StatsCard";
import Board from "./../../components/kanban/Board";
import Navbar from "./../../components/layout/Navbar";

const Dashboard = () => {
  return (
    <div className="flex bg-gray-100 min-h-screen">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-64 w-full">

        {/* Navbar */}
        <Navbar />

        <div className="p-8">

          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800">
              👋 Welcome to TaskFlow AI
            </h1>
            <p className="text-gray-500 mt-2">
              Manage your projects smarter with AI-powered collaboration.
            </p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            <StatCard title="Projects" value="8" />

            <StatCard title="Tasks" value="142" />

            <StatCard title="Completed" value="110" />

            <StatCard title="Team Members" value="12" />

          </div>

          {/* Recent Activity */}
          <div className="mt-10 bg-white p-6 rounded-xl shadow-lg">

            <h2 className="text-2xl font-bold mb-4">
              📢 Recent Activity
            </h2>

            <ul className="space-y-3">

              <li className="border-b pb-2">
                ✅ Login page completed
              </li>

              <li className="border-b pb-2">
                📋 New task assigned to John
              </li>

              <li className="border-b pb-2">
                🤖 AI suggested High Priority
              </li>

              <li className="border-b pb-2">
                📁 New project "TaskFlow AI" created
              </li>

              <li>
                👥 Team member joined workspace
              </li>

            </ul>

          </div>

          {/* Kanban Board */}
          <div className="mt-10">

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-3xl font-bold text-gray-800">
                📌 Kanban Board
              </h2>

              <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition">

                + Add Task

              </button>

            </div>

            <Board />

          </div>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;