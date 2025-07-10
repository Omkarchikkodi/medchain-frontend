import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fakeAuth } from '../auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('manufacturer');
  const navigate = useNavigate();

  const handleLogin = () => {
    fakeAuth.login(email, role);
    navigate('/dashboard');
  };

  return (
    <div>
      <h2>MedChain Login</h2>
      <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <select onChange={e => setRole(e.target.value)} value={role}>
        <option value="manufacturer">Manufacturer</option>
        <option value="distributor">Distributor</option>
        <option value="hospital">Hospital</option>
      </select>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
