import { useNavigate } from "react-router-dom";
import "./Landing.css";

function Landing() {
  const navigate = useNavigate();

  const scrollToDemo = () => {
    document
      .getElementById("demo")
      .scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* HERO SECTION */}
      <section className="hero">

        <div className="hero-content">

          <h1>Manage Projects Smarter</h1>

          <p>
            Real-Time Collaborative Project Management with AI
          </p>

          <div className="hero-buttons">

            <button
              className="primary-btn"
              onClick={() => navigate("/register")}
            >
              Get Started
            </button>

            <button
              className="secondary-btn"
              onClick={scrollToDemo}
            >
              Watch Demo
            </button>

          </div>

        </div>

      </section>

      {/* FEATURES */}
      <section className="features">

        <h2>Why Choose TaskFlow AI?</h2>

        <div className="feature-grid">

          <div className="feature-card">
            <h3>AI Task Analysis</h3>
            <p>
              Automatically analyze and prioritize tasks.
            </p>
          </div>

          <div className="feature-card">
            <h3>Real-Time Chat</h3>
            <p>
              Collaborate instantly with team members.
            </p>
          </div>

          <div className="feature-card">
            <h3>Analytics Dashboard</h3>
            <p>
              Track performance with visual reports.
            </p>
          </div>

          <div className="feature-card">
            <h3>Time Tracking</h3>
            <p>
              Monitor productivity efficiently.
            </p>
          </div>

        </div>

      </section>

      {/* STATS */}
      <section className="stats">

        <div className="stat-card">
          <h2>10K+</h2>
          <p>Tasks Completed</p>
        </div>

        <div className="stat-card">
          <h2>500+</h2>
          <p>Projects Managed</p>
        </div>

        <div className="stat-card">
          <h2>98%</h2>
          <p>User Satisfaction</p>
        </div>

      </section>

      {/* DEMO */}
      <section id="demo" className="demo">

        <h2>Watch Product Demo</h2>

        <div className="demo-box">

          <iframe
            width="800"
            height="450"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="TaskFlow AI Demo"
            allowFullScreen
          ></iframe>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="footer">

        <h3>TaskFlow AI</h3>

        <p>
          AI Powered Project Management Platform
        </p>

      </footer>
    </>
  );
}

export default Landing;