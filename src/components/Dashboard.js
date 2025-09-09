import React, { useState } from "react";
import UserList from "./UserList";
import BookList from "./BookList";
import './Dashboard.css';

const Dashboard = ({ user }) => {
  const [view, setView] = useState(null); // null | 'users' | 'books'

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <div className="dashboard-container">
      <nav className="dashboard-navbar">
        <h1>Admin Dashboard</h1>
        <div>
          <span>Hello, {user.email}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <div className="dashboard-content">
        {!view && (
          <div className="dashboard-main-buttons">
            <button onClick={() => setView('users')}>Quản lý Users</button>
            <button onClick={() => setView('books')}>Quản lý Books</button>
          </div>
        )}

        {view === 'users' && (
          <div className="dashboard-section">
            <button className="back-btn" onClick={() => setView(null)}>← Back</button>
            <h3>Quản lý Users</h3>
            <UserList />
          </div>
        )}

        {view === 'books' && (
          <div className="dashboard-section">
            <button className="back-btn" onClick={() => setView(null)}>← Back</button>
            <h3>Quản lý Books</h3>
            <BookList />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
