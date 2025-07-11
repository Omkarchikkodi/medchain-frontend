import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user }) => {
  return (
    <nav className="bg-blue-700 text-white p-4 shadow-md flex justify-between items-center">
      <h1 className="text-xl font-bold">MedChain</h1>
      <div className="flex space-x-4">
        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        {user?.role === 'manufacturer' && <Link to="/register" className="hover:underline">Register</Link>}
        <Link to="/view" className="hover:underline">View</Link>
        <button onClick={() => {
          localStorage.clear();
          window.location.href = "/";
        }} className="hover:underline">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
