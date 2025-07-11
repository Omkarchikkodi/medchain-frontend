// import React from 'react';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import RegisterMedicine from './components/RegisterMedicine';
import ViewMedicines from './components/ViewMedicines';
import PredictStock from './components/PredictStock';



function App() {
  const [user, setUser] = useState(null);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setUser={setUser} />} />
        <Route path="/dashboard" element={<Dashboard user={user} />} />
        <Route path="/register" element={<RegisterMedicine user={user} />} />
        <Route path="/view" element={<ViewMedicines user={user} />} />

        <Route path="/predict" element={<PredictStock user={user} />} />
      </Routes>
    </Router>
  );
}

export default App;
