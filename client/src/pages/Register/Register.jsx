import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api/axios";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/register", formData);

      alert(res.data.message || "Registration Successful");

      navigate("/login");
    } catch (error) {
      alert(
        error.response?.data?.message || "Registration Failed"
      );
    }
  };

  return (
  <div className="register-page">

    <div className="register-card">

      <div className="register-header">

        <h1>TaskFlow AI</h1>

        <p>Create your workspace account</p>

      </div>

      <form onSubmit={handleSubmit}>

        <div className="input-group">
          <label>Full Name</label>

          <input
            type="text"
            name="name"
            placeholder="Enter Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Email Address</label>

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Password</label>

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="register-btn"
        >
          Create Account
        </button>

      </form>

      <div className="register-footer">

        <p>
          Already have an account?

          <Link to="/login">
            Login
          </Link>

        </p>

      </div>

    </div>

  </div>
);
};

export default Register;