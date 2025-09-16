import React, { useState,useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

const App = () => {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
     const savedUser = localStorage.getItem("user");
     if (savedUser) {
       setUser(JSON.parse(savedUser));
     }
  }, []);

   // Hàm login thành công -> setUser + lưu vào localStorage
   const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    console.log(localStorage)
   };

  return (
    <Router>
      <Routes>
        {!user ? (
          <>
            <Route path="/login" element={<Login setUser={handleLogin} />} />
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
