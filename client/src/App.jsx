import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import Projects from "./pages/Projects/ProjectPage";
import Team from "./pages/Team/TeamPage";
import Calendar from "./pages/Calendar/CalendarPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Admin from "./pages/Admin/Admin";
import Manager from "./pages/Manager/Manager";
import Member from "./pages/Member/Member";
import Profile from "./pages/Profile/Profile";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import AITaskAnalyzer from "./pages/AITaskAnalyzer/AITaskAnalyzer";
import TimeTracker from "./pages/TimeTracker/TimeTracker";
import Analytics from "./pages/Analytics/Analytics";
import Chat from "./pages/Chat/Chat";
import VoiceAssistantPage from "./pages/VoiceAssistant/VoiceAssistantPage";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Users from "./pages/Admin/Users";
import Tasks from "./pages/Tasks/Tasks";
import TaskDetails from "./pages/Tasks/TaskDetails";
import ProjectPage from "./pages/Projects/ProjectPage";
import KanbanBoard from "./pages/Kanban/KanbanBoard";
import AIAssistant from "./pages/AI/AIAssistant";
import Notifications from "./pages/Notifications/Notifications";
import Meetings from "./pages/Meetings/Meetings";
import Settings from "./pages/Settings/Settings";
import AppLayout from "./layouts/AppLayout";





function App() {
  return (
    <BrowserRouter>
   

<Routes>

    {/* Login */}
    <Route path="/login" element={<Login />} />

    {/* Register */}
    <Route path="/register" element={<Register />} />

    {/* Protected Layout */}
    <Route element={<AppLayout />}>

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/projects" element={<Projects />} />

        <Route path="/tasks" element={<Tasks />} />

        <Route path="/team" element={<Team />} />

        <Route path="/calendar" element={<Calendar />} />

        <Route path="/analytics" element={<Analytics />} />

        <Route path="/notifications" element={<Notifications />} />

        <Route path="/settings" element={<Settings />} />

        <Route path="/meetings" element={<Meetings />} />

        <Route path="/profile" element={<Profile />} />

    </Route>

</Routes>
      
    </BrowserRouter>
  );
}

export default App;