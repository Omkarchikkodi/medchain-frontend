import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { QRCodeCanvas } from 'qrcode.react';

const ViewMedicines = () => {
  const [ledger, setLedger] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [stockInput, setStockInput] = useState("");
  const [predictionResult, setPredictionResult] = useState({});

  useEffect(() => {
    axios.get("https://medchain-backend-clean.onrender.com")
      .then(res => {
        setLedger(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching ledger", err);
        setLoading(false);
      });
  }, []);

  const handlePredict = async (index) => {
    const stockHistory = stockInput.split(',').map(n => parseInt(n.trim()));
    try {
      const res = await axios.post("http://127.0.0.1:8000/predict", stockHistory);
      setPredictionResult({ ...predictionResult, [index]: res.data });
    } catch (err) {
      alert("Prediction failed.");
      console.error(err);
    }
  };

  const getCardColor = (prediction) => {
    if (!prediction) return "#f0f0f0"; // default gray
    if (prediction.predicted_stock > 50) return "#e6ffed"; // green
    if (prediction.predicted_stock > 20) return "#fffbe6"; // orange
    return "#ffe6e6"; // red
  };

  if (loading) return <p>Loading...</p>;
  if (ledger.length === 0) return <p>No medicines found.</p>;

  return (
    <div>
      <h3>Medicine Records with QR, Prediction & Status</h3>
      {ledger.map((entry, idx) => {
        const qrData = `${entry.medicine.name}|${entry.medicine.batch}|${entry.medicine.expiry}|${entry.hash}`;
        const prediction = predictionResult[idx];
        const bgColor = getCardColor(prediction);

        return (
          <div key={idx} style={{
            border: "1px solid #ccc",
            marginBottom: "15px",
            padding: "15px",
            backgroundColor: bgColor,
            borderRadius: "8px"
          }}>
            <p><strong>Name:</strong> {entry.medicine.name}</p>
            <p><strong>Batch:</strong> {entry.medicine.batch}</p>
            <p><strong>Expiry:</strong> {entry.medicine.expiry}</p>
            <p><strong>Hash:</strong> <code>{entry.hash}</code></p>
            <div style={{ marginTop: '10px' }}>
              <QRCodeCanvas value={qrData} size={150} />
              <p style={{ fontSize: '12px' }}>Scan to verify</p>
            </div>

            <div style={{ marginTop: '10px' }}>
              {selectedIndex === idx ? (
                <>
                  <input
                    placeholder="Enter past stock (e.g. 100,80,65)"
                    value={stockInput}
                    onChange={e => setStockInput(e.target.value)}
                  />
                  <button onClick={() => handlePredict(idx)}>Predict</button>
                </>
              ) : (
                <button onClick={() => setSelectedIndex(idx)}>📉 Predict Stock</button>
              )}

              {prediction && (
                <div style={{ marginTop: '10px' }}>
                  <p><strong>Predicted Stock:</strong> {prediction.predicted_stock}</p>
                  <p><strong>Status:</strong> {prediction.message}</p>
                  {prediction.alert && <p style={{ color: 'red' }}>⚠️ Refill required soon!</p>}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ViewMedicines;
