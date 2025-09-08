import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        {!user ? (
          <>
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            <Route path="/dashboard" element={<Dashboard user={user} />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
