import React, { useState } from 'react';
import axios from 'axios';

const PredictStock = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);

  const handlePredict = async () => {
    try {
      const stockHistory = input.split(',').map(n => parseInt(n.trim()));
      const res = await axios.post("http://127.0.0.1:8000/predict", stockHistory);
      setResult(res.data);
    } catch (err) {
      alert("Prediction failed. Ensure input is correct.");
      console.error(err);
    }
  };

  return (
    <div>
      <h3>Stock Prediction</h3>
      <p>Enter past stock levels (comma-separated):</p>
      <input
        style={{ width: '300px' }}
        placeholder="e.g. 100, 80, 60, 45"
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <br /><br />
      <button onClick={handlePredict}>Predict</button>

      {result && (
        <div style={{ marginTop: '20px' }}>
          <p><strong>Predicted Stock:</strong> {result.predicted_stock}</p>
          <p><strong>Status:</strong> {result.message}</p>
          {result.alert && <p style={{ color: 'red' }}>🚨 Action needed: Refill stock soon!</p>}
        </div>
      )}
    </div>
  );
};

export default PredictStock;
