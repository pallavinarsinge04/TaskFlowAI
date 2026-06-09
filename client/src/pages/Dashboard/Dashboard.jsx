import Sidebar from "./Sidebar";
import Navbar from "../../components/layout/Navbar";
import StatCard from "./StatsCard";
import Board from "./../../components/kanban/Board";
import AIAssistant from "./AIAssistant";

const Dashboard = () => {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}

      <Sidebar />

      {/* Main Content */}

      <div className="ml-64 flex-1">
        {/* Navbar */}

        <Navbar />

        <div className="p-8">
          {/* Stats */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Projects" value="8" />

            <StatCard title="Tasks" value="142" />

            <StatCard title="Completed" value="110" />

            <StatCard title="Team" value="12" />
          </div>

          {/* Kanban Board */}

          <div className="mt-10">
            <Board />
          </div>

          {/* AI Assistant */}

          <div className="mt-10">
            <AIAssistant />
          </div>

          {/* Recent Activity */}

          <div className="mt-10 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-3xl font-bold text-center mb-8">
              Recent Activity
            </h2>

            <div className="space-y-5 text-xl">
              <div className="flex items-center gap-4">
                <span>✅</span>

                <span>Login page completed</span>
              </div>

              <div className="flex items-center gap-4">
                <span>📋</span>

                <span>New task assigned</span>
              </div>

              <div className="flex items-center gap-4">
                <span>🤖</span>

                <span>AI suggested task priority</span>
              </div>

              <div className="flex items-center gap-4">
                <span>📁</span>

                <span>New project created</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;