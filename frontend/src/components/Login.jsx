import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import './Login.css';

const Login = () => {
  const [enrollment, setEnrollment] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);



  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        enrollment,
        password,
      });
      localStorage.setItem('token', res.data.token);
      console.log(res)
      setUser(res.data.name);
      alert('Login successful');
      navigate('/');
    } catch (error) {
      console.error(error);
      alert('Login failed');
    }
  };

  return (
    <div className='login-container'>
      <h2>Login</h2>
      <div className="login_input">
      <input
        type="text"
        placeholder="Enrollment"
        value={enrollment}
        onChange={(e) => setEnrollment(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>

      </div>
     
    </div>
  );
};

export default Login;
