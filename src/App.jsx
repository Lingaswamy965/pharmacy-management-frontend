import { useEffect, useState } from "react";
import API from "./api";
import Medicines from "./components/Medicines";
import Customers from "./components/Customers";
import Sales from "./components/Sales";
import Alerts from "./components/Alerts";
import Login from "./components/Login";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("pharmacyUser"))
  );

  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState("");
  const [page, setPage] = useState("dashboard");

  const loadDashboard = () => {
    API.get("/dashboard/summary")
      .then((response) => {
        setDashboard(response.data);
        setError("");
      })
      .catch((error) => {
        console.error(error);
        setError("Unable to connect to the backend.");
      });
  };

  useEffect(() => {
    if (isLoggedIn) {
      loadDashboard();
    }
  }, [isLoggedIn]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setPage("dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("pharmacyUser");
    setIsLoggedIn(false);
    setDashboard(null);
    setPage("dashboard");
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  const renderPage = () => {
    if (page === "medicines") {
      return <Medicines />;
    }

    if (page === "customers") {
      return <Customers />;
    }

    if (page === "sales") {
      return <Sales />;
    }

    if (page === "alerts") {
      return <Alerts />;
    }

    return (
      <>
        <header className="top-header">
          <div>
            <h1>Dashboard</h1>
            <p>
              Welcome to your Pharmacy Management System
            </p>
          </div>

          <div className="user-info">
            <div className="user-icon">A</div>

            <div>
              <strong>Admin</strong>
              <small>Administrator</small>
            </div>
          </div>
        </header>

        {error && (
          <div className="error">
            {error}
          </div>
        )}

        {dashboard && (
          <section className="stats-grid">

            <div className="stat-card">
              <div className="stat-icon blue">
                💊
              </div>

              <div>
                <p>Total Medicines</p>
                <h2>
                  {dashboard.totalMedicines}
                </h2>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon green">
                👥
              </div>

              <div>
                <p>Total Customers</p>
                <h2>
                  {dashboard.totalCustomers}
                </h2>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon purple">
                🧾
              </div>

              <div>
                <p>Total Sales</p>
                <h2>
                  {dashboard.totalSales}
                </h2>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon orange">
                ⚠️
              </div>

              <div>
                <p>Low Stock</p>
                <h2>
                  {dashboard.lowStockCount}
                </h2>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon red">
                ⏰
              </div>

              <div>
                <p>Expired Medicines</p>
                <h2>
                  {dashboard.expiredMedicineCount}
                </h2>
              </div>
            </div>

          </section>
        )}

        <section className="quick-section">
          <h2>Quick Actions</h2>

          <div className="quick-grid">

            <button
              className="quick-card"
              onClick={() =>
                setPage("medicines")
              }
            >
              <span>➕</span>

              <div>
                <strong>
                  Add Medicine
                </strong>

                <small>
                  Add a new medicine to inventory
                </small>
              </div>
            </button>

            <button
              className="quick-card"
              onClick={() =>
                setPage("customers")
              }
            >
              <span>👤</span>

              <div>
                <strong>
                  Add Customer
                </strong>

                <small>
                  Register a new customer
                </small>
              </div>
            </button>

            <button
              className="quick-card"
              onClick={() =>
                setPage("sales")
              }
            >
              <span>🧾</span>

              <div>
                <strong>
                  New Sale
                </strong>

                <small>
                  Create a new pharmacy sale
                </small>
              </div>
            </button>

          </div>
        </section>
      </>
    );
  };

  return (
    <div className="app">

      <aside className="sidebar">

        <div className="logo">
          💊
          <span>PharmaCare</span>
        </div>

        <nav>

          <button
            className={`nav-item ${
              page === "dashboard"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setPage("dashboard")
            }
          >
            📊 Dashboard
          </button>

          <button
            className={`nav-item ${
              page === "medicines"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setPage("medicines")
            }
          >
            💊 Medicines
          </button>

          <button
            className={`nav-item ${
              page === "customers"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setPage("customers")
            }
          >
            👥 Customers
          </button>

          <button
            className={`nav-item ${
              page === "sales"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setPage("sales")
            }
          >
            🧾 Sales & Billing
          </button>

          <button
            className={`nav-item ${
              page === "alerts"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setPage("alerts")
            }
          >
            ⚠️ Alerts
          </button>

        </nav>

        <button
          className="logout"
          onClick={handleLogout}
        >
          🚪 Logout
        </button>

      </aside>

      <main className="main-content">
        {renderPage()}
      </main>

    </div>
  );
}

export default App;