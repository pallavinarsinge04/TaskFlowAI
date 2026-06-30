import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import Projects from "./pages/Projects/ProjectPage";
import Team from "./pages/Team/TeamPage";
import Calendar from "./pages/Calendar/CalendarPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile/Profile";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Analytics from "./pages/Analytics/Analytics";
import Chat from "./pages/Chat/Chat";
import Tasks from "./pages/Tasks/Tasks";
import TaskDetails from "./pages/Tasks/TaskDetails";
import KanbanBoard from "./pages/Kanban/KanbanBoard";
import AIAssistant from "./pages/AI/AIAssistant";
import AITaskAnalyzer from "./pages/AITaskAnalyzer/AITaskAnalyzer";
import TimeTracker from "./pages/TimeTracker/TimeTracker";
import Notifications from "./pages/Notifications/Notifications";
import Meetings from "./pages/Meetings/Meetings";
import Settings from "./pages/Settings/Settings";
import VoiceAssistantPage from "./pages/VoiceAssistant/VoiceAssistantPage";
import AppLayout from "./layouts/AppLayout";
import { Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* PROTECTED APP */}
        <Route element={<AppLayout />}>

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/tasks/:id" element={<TaskDetails />} />

          <Route path="/team" element={<Team />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/analytics" element={<Analytics />} />

          <Route path="/chat" element={<Chat />} />
          <Route path="/time-tracker" element={<TimeTracker />} />

          <Route path="/notifications" element={<Notifications />} />
          <Route path="/meetings" element={<Meetings />} />
          <Route path="/settings" element={<Settings />} />

          <Route path="/profile" element={<Profile />} />

          <Route path="/ai-assistant" element={<AIAssistant />} />
          <Route path="/ai-analyzer" element={<AITaskAnalyzer />} />

          <Route path="/voice" element={<VoiceAssistantPage />} />

          <Route path="/kanban" element={<KanbanBoard />} />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}
export default App;