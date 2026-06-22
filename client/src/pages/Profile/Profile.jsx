import "./Profile.css";

function Profile() {
  const user = {
    name: "Pallavi Narsinge",
    role: "Full Stack Developer",
    email: "pallavi@example.com",
    phone: "+91 9876543210",
    location: "Latur, Maharashtra",
    bio: "Passionate Full Stack Developer focused on React, Node.js, MongoDB, Android Development and AI-powered applications.",
    image: "https://i.pravatar.cc/300",
  };

  return (
    <div className="profile-page">

      <div className="profile-banner">
        <div className="profile-card">
          <img src={user.image} alt="" />

          <div>
            <h1>{user.name}</h1>
            <p>{user.role}</p>

            <div className="profile-actions">
              <button>Edit Profile</button>
              <button>Share Profile</button>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-grid">

        <div className="card">
          <h2>About Me</h2>
          <p>{user.bio}</p>
        </div>

        <div className="card">
          <h2>Contact Information</h2>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          <p>Location: {user.location}</p>
        </div>

        <div className="card">
          <h2>Skills</h2>

          <div className="skills">
            <span>React</span>
            <span>Node.js</span>
            <span>MongoDB</span>
            <span>Express</span>
            <span>Java</span>
            <span>Kotlin</span>
            <span>Firebase</span>
            <span>AI</span>
          </div>
        </div>

        <div className="card">
          <h2>Statistics</h2>

          <div className="stats">
            <div>
              <h3>25</h3>
              <p>Projects</p>
            </div>

            <div>
              <h3>120</h3>
              <p>Tasks</p>
            </div>

            <div>
              <h3>98%</h3>
              <p>Completion</p>
            </div>
          </div>
        </div>

        <div className="card">
          <h2>Recent Projects</h2>

          <ul>
            <li>TaskFlow AI</li>
            <li>Smart AI Ecommerce</li>
            <li>Student Attendance App</li>
            <li>Flashcard Quiz App</li>
          </ul>
        </div>

        <div className="card">
          <h2>AI Productivity Score</h2>

          <div className="progress">
            <div className="progress-fill"></div>
          </div>

          <h3>92%</h3>
        </div>

      </div>

    </div>
  );
}

export default Profile;