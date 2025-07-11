import React from 'react';
import { fakeAuth } from '../auth';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">Welcome, {user?.email}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {user?.role === 'manufacturer' && (
          <>
            <button onClick={() => navigate('/register')} className="bg-blue-500 text-white p-4 rounded shadow hover:bg-blue-600">Register Medicine</button>
            <button onClick={() => navigate('/predict')} className="bg-purple-500 text-white p-4 rounded shadow hover:bg-purple-600">Predict Stock</button>
          </>
        )}
        <button onClick={() => navigate('/view')} className="bg-green-500 text-white p-4 rounded shadow hover:bg-green-600">View Medicines</button>
        <button onClick={() => { fakeAuth.logout(); navigate('/'); }} className="bg-green-500 text-white p-4 rounded shadow hover:bg-green-600">Logout</button>
      </div>
    </div>
  );
};
export default Dashboard;
