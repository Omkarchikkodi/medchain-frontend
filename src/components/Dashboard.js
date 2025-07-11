import React from 'react';
import { fakeAuth } from '../auth';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const user = fakeAuth.getUser();

  if (!user) return <div>Please login</div>;

  return (
    <div>
      <h2>Welcome, {user.email}</h2>
      <p>Role: {user.role}</p>

      {user.role === 'manufacturer' && (
        <button onClick={() => navigate('/register')}>Register Medicine</button>
      )}
      {user?.role === 'manufacturer' && (
      <button onClick={() => navigate('/predict')}>Predict Stock</button>
      )}

      <button onClick={() => navigate('/view')}>View Medicines</button>
      <button onClick={() => { fakeAuth.logout(); navigate('/'); }}>Logout</button>
    </div>
  );
};

export default Dashboard;
