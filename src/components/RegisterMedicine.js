import React, { useState } from 'react';
import axios from 'axios';

const RegisterMedicine = () => {
  const [formData, setFormData] = useState({ name: '', batch: '', expiry: '' });
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    try {
      const res = await axios.post('https://medchain-backend-clean.onrender.com/register', formData);
      setMessage(res.data.message);
    } catch (err) {
      setMessage("Error registering medicine.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl mb-4 font-bold">Register New Medicine</h2>
      <input type="text" placeholder="Name" onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="block mb-2 p-2 border w-full" />
      <input type="text" placeholder="Batch" onChange={(e) => setFormData({ ...formData, batch: e.target.value })} className="block mb-2 p-2 border w-full" />
      <input type="text" placeholder="Expiry" onChange={(e) => setFormData({ ...formData, expiry: e.target.value })} className="block mb-2 p-2 border w-full" />
      <button onClick={handleSubmit} className="bg-blue-600 text-white p-2 mt-2 rounded">Register</button>
      <p className="mt-4">{message}</p>
    </div>
  );
};

export default RegisterMedicine;
