import {
  FaHome,
  FaTasks,
  FaProjectDiagram,
  FaUsers,
  FaRobot,
  FaCog
} from "react-icons/fa";

const Sidebar = () => {

  return (

    <div className="w-64 h-screen bg-slate-900 text-white fixed">

      <h1 className="text-3xl font-bold p-6 text-blue-400">

        🚀 TaskFlow AI

      </h1>

      <ul className="space-y-2 p-4">

        <li className="flex items-center gap-3 p-3 rounded hover:bg-slate-700 cursor-pointer">

          <FaHome />

          Dashboard

        </li>

        <li className="flex items-center gap-3 p-3 rounded hover:bg-slate-700 cursor-pointer">

          <FaProjectDiagram />

          Projects

        </li>

        <li className="flex items-center gap-3 p-3 rounded hover:bg-slate-700 cursor-pointer">

          <FaTasks />

          Tasks

        </li>

        <li className="flex items-center gap-3 p-3 rounded hover:bg-slate-700 cursor-pointer">

          <FaUsers />

          Team

        </li>

        <li className="flex items-center gap-3 p-3 rounded hover:bg-slate-700 cursor-pointer">

          <FaRobot />

          AI Assistant

        </li>

        <li className="flex items-center gap-3 p-3 rounded hover:bg-slate-700 cursor-pointer">

          <FaCog />

          Settings

        </li>

      </ul>

    </div>

  );

};

export default Sidebar;