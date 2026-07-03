

import { useState, useEffect } from "react";
import "./Settings.css";

function Settings() {

  // Logged in user
  const loggedUser =
    JSON.parse(localStorage.getItem("user")) || {};

  // Unique key for each user's profile picture
  const profileKey = `profilePic_${loggedUser.email}`;

  // Profile states
  const [name, setName] = useState(loggedUser.name || "");
  const [email, setEmail] = useState(loggedUser.email || "");

  const [profilePic, setProfilePic] = useState(
    localStorage.getItem(profileKey) ||
      loggedUser.profilePic ||
      "https://i.pravatar.cc/150"
  );

  // Preferences
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [language, setLanguage] = useState("English");

  useEffect(() => {
    const saved = localStorage.getItem(profileKey);

    if (saved) {
      setProfilePic(saved);
    }
  }, []);

  // Upload Profile Picture
  const handleProfileChange = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {

      setProfilePic(reader.result);

      localStorage.setItem(
        profileKey,
        reader.result
      );

      const user =
        JSON.parse(localStorage.getItem("user")) || {};

      user.profilePic = reader.result;

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      window.dispatchEvent(
        new Event("profilePicUpdated")
      );

    };

    reader.readAsDataURL(file);

  };

  // Save Profile
  const saveProfile = () => {

    const user = {
      ...loggedUser,
      name,
      email,
      profilePic
    };

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    alert("Profile Updated Successfully");

    window.dispatchEvent(
      new Event("profileUpdated")
    );

  };

  return (
    <div className={`settings-page ${darkMode ? "dark" : ""}`}>

      <div className="settings-header">
        <h1>⚙️ Settings</h1>
        <p>Manage your account preferences and system configuration</p>
      </div>

      {/* Profile Card */}

      <div className="settings-card">

        <h2>👤 Profile Settings</h2>

        <div className="profile-picture-section">

          <img
            src={profilePic}
            alt="Profile"
            className="settings-profile-img"
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleProfileChange}
          />

        </div>

        <div className="form-group">

          <label>Full Name</label>

          <input
            type="text"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />

        </div>

        <div className="form-group">

          <label>Email</label>

          <input
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

        </div>

        <button
          className="save-btn"
          onClick={saveProfile}
        >
          Save Profile
        </button>

      </div>

      {/* Preferences */}
      <div className="settings-card">
        <h2>🎛 Preferences</h2>

        <div className="toggle-row">
          <span>Dark Mode</span>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
        </div>

        <div className="toggle-row">
          <span>Email Notifications</span>
          <input
            type="checkbox"
            checked={emailNotif}
            onChange={() => setEmailNotif(!emailNotif)}
          />
        </div>

        <div className="toggle-row">
          <span>Push Notifications</span>
          <input
            type="checkbox"
            checked={pushNotif}
            onChange={() => setPushNotif(!pushNotif)}
          />
        </div>

        <div className="form-group">
          <label>Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option>English</option>
            <option>Hindi</option>
            <option>Marathi</option>
          </select>
        </div>
      </div>

      {/* Security */}
      <div className="settings-card">
        <h2>🔐 Security</h2>

        <div className="form-group">
          <label>Change Password</label>
          <input type="password" placeholder="New password" />
        </div>

        <div className="form-group">
          <input type="password" placeholder="Confirm password" />
        </div>

        <button className="save-btn danger">Update Password</button>
      </div>

      {/* Danger Zone */}
      <div className="settings-card danger-zone">
        <h2>⚠️ Danger Zone</h2>
        <p>Delete account permanently (cannot be undone)</p>

        <button className="delete-btn">
          Delete Account
        </button>
      </div>

    </div>
  );
}

export default Settings;