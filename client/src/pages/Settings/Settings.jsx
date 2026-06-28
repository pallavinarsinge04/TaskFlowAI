import { useState } from "react";
import "./Settings.css";

function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [language, setLanguage] = useState("English");

  return (
    <div className={`settings-page ${darkMode ? "dark" : ""}`}>
      
      <div className="settings-header">
        <h1>⚙️ Settings</h1>
        <p>Manage your account preferences and system configuration</p>
      </div>

      {/* Profile Section */}
      <div className="settings-card">
        <h2>👤 Profile Settings</h2>

        <div className="form-group">
          <label>Full Name</label>
          <input type="text" placeholder="Enter your name" />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" placeholder="Enter your email" />
        </div>

        <button className="save-btn">Save Profile</button>
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