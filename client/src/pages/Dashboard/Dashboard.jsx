import Sidebar from "./Sidebar";
import Navbar from "../../components/layout/Navbar";
import StatCard from "./StatsCard";
import Board from "../../components/kanban/Board";
import AIAssistant from "../../components/ai/AIAssistant";

const Dashboard = () => {
  return (
    <div className="flex">

      <Sidebar />

      <div className="ml-64 w-full min-h-screen bg-gray-100">

        <Navbar />

        <div className="p-8">

          <div className="grid grid-cols-4 gap-6">

            <StatCard title="Projects" value="8" />

            <StatCard title="Tasks" value="142" />

            <StatCard title="Completed" value="110" />

            <StatCard title="Team" value="12" />

          </div>

          <div className="mt-10">

            <Board />

          </div>

          <AIAssistant />

          <div className="mt-10 bg-white rounded-xl shadow-lg p-6">

            <h2 className="text-2xl font-bold mb-5">

              Recent Activity

            </h2>

            <ul className="space-y-3 text-lg">

              <li>✅ Login page completed</li>

              <li>📋 New task assigned</li>

              <li>🤖 AI suggested task priority</li>

              <li>📁 New project created</li>

            </ul>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;