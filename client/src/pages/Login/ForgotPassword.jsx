import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api/axios";
import "./ForgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/forgot-password", {
        email,
      });

      alert(res.data.message || "Reset link sent to your email.");
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Unable to send reset link."
      );
    }
  };

  return (
    <div className="forgot-page">

      <div className="forgot-card">

        <div className="forgot-header">
          <h1>Forgot Password</h1>

          <p>
            Enter your registered email to receive a password reset link.
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="input-group">

            <label>Email Address</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

          </div>

          <button
            className="forgot-btn"
            type="submit"
          >
            Send Reset Link
          </button>

        </form>

        <div className="forgot-footer">

          <Link to="/login">
            ← Back to Login
          </Link>

        </div>

      </div>

    </div>
  );
}

export default ForgotPassword;