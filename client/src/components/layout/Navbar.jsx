import { useState, useEffect } from "react";
import {
  FaSearch,
  FaBell,
  FaCog,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabase/supabaseClient";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const [time, setTime] = useState(new Date());

  const [user, setUser] = useState({
    name: "Guest User",
    email: "",
    profilePic: "",
  });

  useEffect(() => {
    loadProfile();

    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    window.addEventListener("profileUpdated", loadProfile);

    return () => {
      clearInterval(timer);
      window.removeEventListener(
        "profileUpdated",
        loadProfile
      );
    };
  }, []);

  const loadProfile = async () => {
    try {
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();

      if (!authUser) return;

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", authUser.id)
        .single();

      const profile = {
        name: data?.name || "Guest User",
        email: data?.email || authUser.email,
        profilePic: data?.avatar_url || "",
      };

      setUser(profile);

      localStorage.setItem(
        "user",
        JSON.stringify(profile)
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header className="navbar">

      {/* Search */}

      <div className="navbar-search">
        <FaSearch />

        <input
          type="text"
          placeholder="Search projects, tasks..."
        />
      </div>

      {/* Right */}

      <div className="navbar-right">

        <div className="navbar-time">
          {time.toLocaleTimeString()}
        </div>

        <button
          className="icon-btn"
          onClick={() =>
            navigate("/notifications")
          }
        >
          <FaBell />
          <span className="badge">3</span>
        </button>

        <button
          className="icon-btn"
          onClick={() =>
            navigate("/settings")
          }
        >
          <FaCog />
        </button>

        <div
          className="navbar-profile"
          onClick={() =>
            navigate("/profile")
          }
        >
          <img
            src={
              user.profilePic
                ? user.profilePic
                : "https://i.pravatar.cc/150?img=12"
            }
            alt="Profile"
          />

          <div>
            <h4>{user.name}</h4>
            <span>{user.email}</span>
          </div>
        </div>

      </div>

    </header>
  );
}

export default Navbar;