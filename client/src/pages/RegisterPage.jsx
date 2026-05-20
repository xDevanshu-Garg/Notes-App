import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/authService";


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
  }, [navigate]);


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
      localStorage.setItem("userInfo", JSON.stringify(data));
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
    <div className="auth-page">

      <div className="auth-card">

        {/* Branding */}
        <div className="auth-brand">
          <div className="auth-brand-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
          </div>
          <h1 className="auth-title">Create your account</h1>
          <p className="auth-subtitle">Start capturing your thoughts with Notely</p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="error-message">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
            {error}
          </div>
        )}

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="auth-form">

          <div className="input-group">
            <label htmlFor="register-name" className="input-label">Name</label>
            <input
              id="register-name"
              type="text"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              className="input-field"
              disabled={loading}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="register-email" className="input-label">Email</label>
            <input
              id="register-email"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className="input-field"
              disabled={loading}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="register-password" className="input-label">Password</label>
            <input
              id="register-password"
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="input-field"
              disabled={loading}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary btn-full"
          >
            {loading ? (
              <>
                <span className="loading-spinner-small" />
                Creating account...
              </>
            ) : (
              "Create Account"
            )}
          </button>

        </form>

        {/* Cold start message */}
        {loading && (
          <p className="cold-start-message">
            Server may take up to a minute to wake up on first visit.
          </p>
        )}

        {/* Login Link */}
        <p className="auth-link">
          Already have an account?{" "}
          <Link to="/login">Sign in</Link>
        </p>

      </div>

    </div>
  );
}

export default RegisterPage;