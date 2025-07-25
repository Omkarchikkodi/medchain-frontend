import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('manufacturer');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email.trim() === '') {
      alert('Please enter your email');
      return;
    }

    setUser({ email, role });  // Pass both email and role
    navigate('/dashboard');
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Login to MedChain</h2>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border mb-4 rounded"
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 border mb-4 rounded"
        >
          <option value="manufacturer">Manufacturer</option>
          <option value="distributor">Distributor</option>
          <option value="hospital">Hospital</option>
        </select>

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
