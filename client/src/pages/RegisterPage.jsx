import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { registerUser } from "../services/authService";

import { useEffect } from "react";

function RegisterPage() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  // if user is registered redirect to /
  useEffect(() => {

    const userInfo = localStorage.getItem("userInfo");

    if (userInfo) {
      navigate("/");
    }

  }, []);


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");
    setLoading(true);

    try {

      const data = await registerUser(formData);

      localStorage.setItem(
        "userInfo",
        JSON.stringify(data)
      );

      navigate("/");

    }
    catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    }
    finally {
      setLoading(false);
    }

  };


  return (
    <div className="min-h-screen flex items-center justify-center">

      <div className="w-full max-w-md p-6 border rounded-lg shadow">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Register
        </h1>

        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            name="name"
            placeholder="Enter name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            disabled={loading}
          />

          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            disabled={loading}
          />

          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            disabled={loading}
          />

          <button
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded hover:bg-gray-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Connecting to server..." : "Register"}
          </button>

        </form>

        {loading && (
          <p className="text-gray-500 text-sm text-center mt-3">
            Server may take up to a minute to wake up on first visit.
          </p>
        )}

      </div>

    </div>
  );
}

export default RegisterPage;