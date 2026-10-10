import { useState } from "react";
import API from "../api";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");

    if (!username || !password) {
      setError("Please enter username and password.");
      return;
    }

    setLoading(true);

    API.post(
      `/users/login?username=${encodeURIComponent(
        username
      )}&password=${encodeURIComponent(password)}`
    )
      .then((response) => {
        console.log("Login successful:", response.data);

        localStorage.setItem("pharmacyUser", username);

        onLogin();
      })
      .catch((error) => {
        console.error("Login error:", error);

        setError(
          error.response?.data?.message ||
            error.response?.data?.error ||
            "Invalid username or password."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-logo">
          💊
        </div>

        <h1>PharmaCare</h1>

        <p className="login-subtitle">
          Pharmacy Management System
        </p>

        <form onSubmit={handleSubmit}>

          <div className="login-field">
            <label>Username</label>

            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(event) =>
                setUsername(event.target.value)
              }
              autoComplete="username"
            />
          </div>

          <div className="login-field">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div className="login-error">
              ⚠️ {error}
            </div>
          )}

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading ? "Logging in..." : "🔐 Login"}
          </button>

        </form>

        <p className="login-footer">
          Pharmacy Management System
        </p>

      </div>
    </div>
  );
}

export default Login;