import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="flex bg-gray-100 min-h-screen">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1">

        {/* Navbar */}
        <div className="bg-blue-700 text-white flex justify-between items-center px-10 py-5 shadow">

          <h1 className="text-3xl font-bold">
            🚀 TaskFlow AI Dashboard
          </h1>

          <button
            onClick={() => navigate("/login")}
            className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg"
          >
            Logout
          </button>

        </div>

        {/* Welcome */}

        <div className="px-10 py-8">

          <h2 className="text-4xl font-bold">
            Welcome Back 👋
          </h2>

          <p className="text-gray-500 mt-2">
            Manage your projects from one place.
          </p>

        </div>

        {/* Statistics */}

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 px-10">

          <div className="bg-white p-6 rounded-xl shadow">
            <h3>Total Tasks</h3>
            <h1 className="text-4xl text-blue-600 font-bold mt-2">24</h1>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3>Projects</h3>
            <h1 className="text-4xl text-green-600 font-bold mt-2">8</h1>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3>Completed</h3>
            <h1 className="text-4xl text-purple-600 font-bold mt-2">17</h1>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3>Productivity</h3>
            <h1 className="text-4xl text-orange-600 font-bold mt-2">
              89%
            </h1>
          </div>

        </div>

        {/* Recent Activity */}

        <div className="px-10 py-10">

          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-2xl font-bold mb-5">
              📈 Recent Activity
            </h2>

            <ul className="space-y-4">

              <li>✅ Completed Login Module</li>

              <li>📁 New Project Created</li>

              <li>🤖 AI analyzed 12 Tasks</li>

              <li>💬 New Team Message</li>

              <li>📅 Meeting Tomorrow 10:00 AM</li>

            </ul>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;