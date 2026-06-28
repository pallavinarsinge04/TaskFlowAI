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
import Meeting from "./pages/Meeting/Meeting";
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


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Landing Page */}
        <Route
          path="/"
          element={<Landing />}
        />

        {/* Authentication */}
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* Projects */}
        <Route
          path="/projects"
          element={<Projects />}
        />

        <Route
  path="/team"
  element={<Team />}
/>

<Route
  path="/calendar"
  element={<Calendar />}
/>


<Route
  path="/manager"
  element={
    <ProtectedRoute role="Manager">
      <Manager />
    </ProtectedRoute>
  }
/>

<Route
  path="/member"
  element={
    <ProtectedRoute role="Member">
      <Member />
    </ProtectedRoute>
  }
/>
<Route
  path="/profile"
  element={<Profile />}
/>
<Route
  path="/forgot-password"
  element={<ForgotPassword />}
/>
<Route
  path="/ai-analyzer"
  element={<AITaskAnalyzer />}
/>
<Route
  path="/time-tracker"
  element={<TimeTracker />}
/>
<Route
  path="/analytics"
  element={<Analytics />}
/>
<Route
  path="/chat"
  element={<Chat />}
/>
<Route

path="/meeting"

element={<Meeting/>}

/>
<Route
  path="/voice"
  element={<VoiceAssistantPage />}
/>


<Route

path="/admin/users"

element={<Users/>}

/>
 <Route
    path="/tasks"
    element={<Tasks />}
/>
<Route
  path="/tasks/:id"
  element={<TaskDetails />}
/>


<Route path="/project" element={<ProjectPage />} />
<Route path="/kanban" element={<KanbanBoard />} />
<Route path="/Ai" element={<AIAssistant />} />


<Route path="/notifications" element={<Notifications />} />


<Route path="/meetings" element={<Meetings />} />

      </Routes>
      


      
    </BrowserRouter>
  );
}

export default App;