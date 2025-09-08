import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleLogin } from '../api/auth.js';
import './Login.css';

const Login = ({setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleAuth = async () => {
    const result = await handleLogin(email, password); // result = { success, message, user }
    if (result.success) {
        setUser(result.user.userName);
      navigate('/dashboard');
    } else {
       alert("Đăng nhập không thành công")
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleAuth}>Login</button>
    </div>
  );
};

export default Login;
