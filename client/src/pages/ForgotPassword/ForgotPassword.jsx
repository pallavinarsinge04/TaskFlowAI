import { useState } from "react";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/password/forgot-password",
        {
          email,
        }
      );

      setMessage(res.data.message);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Something went wrong."
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">
          Forgot Password
        </h1>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border rounded-lg p-3 mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
          >
            Send Reset Link
          </button>
        </form>

        {message && (
          <div className="mt-5 p-3 rounded-lg bg-green-100 text-green-700 text-center">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;