import React, { useState } from 'react';
import axios from 'axios';

const RegisterMedicine = () => {
  const [medicine, setMedicine] = useState({ name: '', batch: '', expiry: '' });

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/register", medicine);
      alert("✅ Medicine registered: " + res.data.data.name);
    } catch (err) {
      console.error("❌ Registration failed", err);
      alert("Error registering medicine.");
    }
  };

  return (
    <div>
      <h3>Register Medicine</h3>
      <input placeholder="Name" onChange={e => setMedicine({ ...medicine, name: e.target.value })} />
      <input placeholder="Batch No." onChange={e => setMedicine({ ...medicine, batch: e.target.value })} />
      <input placeholder="Expiry Date" onChange={e => setMedicine({ ...medicine, expiry: e.target.value })} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default RegisterMedicine;
