import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import RegisterMedicine from './components/RegisterMedicine';
import ViewMedicines from './components/ViewMedicines';
import PredictStock from './components/PredictStock';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<RegisterMedicine />} />
        <Route path="/view" element={<ViewMedicines />} />
        <Route path="/predict" element={<PredictStock />} />
      </Routes>
    </Router>
  );
}

export default App;
