import React from "react";
import UserList from "./UserList";
import BookList from "./BookList";
import './Dashboard.css';

const Dashboard = ({ user }) => {
  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <nav className="dashboard-navbar">
        <h1>Admin Dashboard</h1>
        <div>
          <span className="mr-4">Hello, {user.email}</span>
          <button
            onClick={() => {
              localStorage.removeItem("user");
              window.location.reload();
            }}
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="dashboard-content">
        {/* Statistic Cards */}
        <div className="dashboard-cards">
          <div className="dashboard-card">
            <h3>Total Users</h3>
            <p> {/* pass số lượng từ API */} </p>
          </div>
          <div className="dashboard-card">
            <h3>Total Books</h3>
            <p> {/* pass số lượng từ API */} </p>
          </div>
        </div>

        {/* User & Book Sections */}
        <div className="dashboard-main">
          <div className="dashboard-section">
            <h3>Users</h3>
            <UserList />
          </div>
          <div className="dashboard-section">
            <h3>Books</h3>
            <BookList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
