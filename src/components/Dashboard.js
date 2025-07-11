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
          </>
        )}
        {user.role === "distributor" && (
          <button
            className="mt-2 w-full bg-orange-600 text-white p-2 rounded hover:bg-orange-700"
            onClick={() => {
              const newLocation = prompt("Enter new location to update tracking:");
              if (!newLocation) return;
              axios.post(`${API_BASE}/update-location`, {
                batch: entry.medicine.batch,
                location: newLocation
              }).then(() => {
                alert("Location updated!");
                window.location.reload(); // refresh to show change
              }).catch(err => {
                alert("Error updating location");
                console.error(err);
              });
            }}
          >
            🚚 Update Location
          </button>
        )}

        {user.role === 'hospital' && (
          <p>Welcome hospital staff!</p>
        )}
        <button onClick={() => navigate('/view')} className="bg-green-500 text-white p-4 rounded shadow hover:bg-green-600">View Medicines</button>
        <button onClick={() => { fakeAuth.logout(); navigate('/'); }} className="bg-green-500 text-white p-4 rounded shadow hover:bg-green-600">Logout</button>
      </div>
    </div>
  );
};
export default Dashboard;
