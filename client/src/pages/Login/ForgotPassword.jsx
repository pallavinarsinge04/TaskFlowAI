import { useState } from "react";
import API from "../../api/axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = async () => {
    try {
      const res = await API.post("/auth/forgot-password", {
        email,
      });

      setMessage(res.data.message || "Reset link sent!");
    } catch (err) {
      console.log(err);
      setMessage(
        err.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="auth-container">

      <h2>Forgot Password</h2>

      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={handleSend}>
        Send Reset Link
      </button>

      <p>{message}</p>

    </div>
  );
}

export default ForgotPassword;