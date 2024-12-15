import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css'

const Register = () => {
  const [name, setName] = useState('');
  const [enrollment, setEnrollment] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        name,
        enrollment,
        password,
      });

      if (res.data.success) {
        alert('Registration successful❤️❤️');
        navigate('/dashboard');
      } else {
        alert(res.data.message || 'Registration failed');
      }
    } catch (error) {
      console.error(error);
      alert('Registration failed');
    }
  };

  return (
    <div className='register-container'>
      <h2>Register</h2>

       <div className="register_input">
       <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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
      <button onClick={handleRegister}>Register</button>

       </div>
      
    </div>
  );
};

export default Register;
