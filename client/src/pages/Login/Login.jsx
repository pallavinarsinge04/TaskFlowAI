import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "./../../supabase/supabaseClient";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const { email, password } = form;

  const { data, error } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (error) {
    alert(error.message);
    return;
  }

  // Get user profile
  const { data: profile, error: profileError } = await supabase
    .from("users")
    .select("*")
    .eq("id", data.user.id)
    .single();

  if (profileError) {
    console.log(profileError);
  }

  localStorage.setItem(
    "user",
    JSON.stringify(profile)
  );

  alert("Login Successful!");

  navigate("/dashboard");
};
  return (
    <div className="login-page">

      <div className="login-card">

        <div className="login-header">

          <h1>TaskFlow AI</h1>

          <p>Sign in to your workspace</p>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="input-group">

            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
            />

          </div>

          <div className="input-group">

            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={form.password}
              onChange={handleChange}
              required
            />

          </div>

          <button type="submit" className="login-btn">
            Login
          </button>

        </form>

        <div className="login-footer">

          <Link to="/forgot-password">
            Forgot Password?
          </Link>

          <p>
            Don't have an account?
            <Link to="/register"> Register</Link>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;