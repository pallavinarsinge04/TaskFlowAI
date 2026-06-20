import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import Projects from "./pages/Projects/Projects";
import Team from "./pages/Team/Team";
import Analytics from "./pages/Analytics/Analytics";
import Calendar from "./pages/Calendar/Calendar";
import ProtectedRoute from "./components/ProtectedRoute";
import Admin from "./pages/Admin/Admin";
import Manager from "./pages/Manager/Manager";
import Member from "./pages/Member/Member";
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
  path="/analytics"
  element={<Analytics />}
/>
<Route
  path="/calendar"
  element={<Calendar />}
/>
<Route
  path="/admin"
  element={
    <ProtectedRoute role="Admin">
      <Admin />
    </ProtectedRoute>
  }
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

      </Routes>
    </BrowserRouter>
  );
}

export default App;