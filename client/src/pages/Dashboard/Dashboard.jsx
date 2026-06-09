import Sidebar from "../../components/dashboard/Sidebar";
import Navbar from "../../components/dashboard/Navbar";
import StatCard from "../../components/dashboard/StatCard";

const Dashboard = () => {

  return (

    <div className="flex">

      <Sidebar />

      <div className="ml-64 w-full bg-gray-100 min-h-screen">

        <Navbar />

        <div className="p-8">

          <div className="grid grid-cols-4 gap-6">

            <StatCard

              title="Projects"

              value="8"

            />

            <StatCard

              title="Tasks"

              value="142"

            />

            <StatCard

              title="Completed"

              value="110"

            />

            <StatCard

              title="Team"

              value="12"

            />

          </div>

          <div className="mt-10 bg-white p-6 rounded-xl shadow">

            <h2 className="text-2xl font-bold mb-4">

              Recent Activity

            </h2>

            <ul className="space-y-3">

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