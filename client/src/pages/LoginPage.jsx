import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { loginUser } from "../services/authService";

import { useEffect } from "react";


function LoginPage() {
  
  // if user is logged in redirect to /
  useEffect(() => {
  
    const userInfo = localStorage.getItem("userInfo");
  
    if (userInfo) {
      navigate("/");
    }
  
  }, []);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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

    e.preventDefault(); // Stops page reload on form submit

    try {

      const data = await loginUser(formData);

      localStorage.setItem(
        "userInfo",
        JSON.stringify(data)
      );

      navigate("/");

    }
    catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    }

  };


  return (
    <div className="min-h-screen flex items-center justify-center">

      <div className="w-full max-w-md p-6 border rounded-lg shadow">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Login
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <button
            className="w-full bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 transition text-white font-medium py-3 rounded-lg"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
}

export default LoginPage;