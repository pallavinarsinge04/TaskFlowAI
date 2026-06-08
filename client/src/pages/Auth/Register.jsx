import { useState } from "react";
import API from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({

    name: "",

    email: "",

    password: ""

  });

  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post("/auth/register", form);

      alert("Registration Successful");

      navigate("/login");

    } catch (err) {

      alert(err.response?.data?.message || "Registration Failed");

    }

  };

  return (

    <div className="flex justify-center items-center h-screen bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-96"
      >

        <h2 className="text-3xl font-bold text-center mb-6">
          Register
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          className="border p-3 w-full mb-4 rounded"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border p-3 w-full mb-4 rounded"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border p-3 w-full mb-4 rounded"
          onChange={handleChange}
        />

        <button
          className="bg-green-600 text-white w-full p-3 rounded"
        >
          Register
        </button>

        <p className="mt-4 text-center">

          Already have an account?

          <Link
            className="text-blue-600"
            to="/login"
          >
            {" "}Login
          </Link>

        </p>

      </form>

    </div>

  );

}

export default Register;