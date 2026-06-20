import Sidebar from "./Sidebar";
import Navbar from "../../components/layout/Navbar";
import StatCard from "./StatsCard";
import Board from "./../../components/kanban/Board";
import AIAssistant from "./AIAssistant";
import NotificationPanel from "./../../components/notifications/NotificationPanel";
const Dashboard = () => {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}

      <Sidebar />

      {/* Main Content */}

      <div className="ml-64 flex-1">
        {/* Navbar */}

        <Navbar />

        <div className="mt-8 bg-white p-6 rounded-xl shadow">
  <h2 className="text-2xl font-bold mb-4">
    📅 Upcoming Deadlines
  </h2>

  <p>
    View all upcoming task deadlines from the Calendar page.
  </p>

  <button
    onClick={() => window.location.href = "/calendar"}
    className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg"
  >
    Open Calendar
  </button>
</div>
      </div>
    </div>
  );
};

export default Dashboard;