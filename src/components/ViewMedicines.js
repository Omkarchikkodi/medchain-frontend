import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { QRCodeCanvas } from 'qrcode.react';
import { AuthContext } from '../AuthContext'; // 👈 add this

const API_BASE = "https://medchain-backend-clean.onrender.com";
const { user } = useContext(AuthContext);

const ViewMedicines = () => {
  const { user } = useContext(AuthContext);
  const [ledger, setLedger] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [stockInput, setStockInput] = useState("");
  const [predictionResult, setPredictionResult] = useState({});

  useEffect(() => {
    axios.get("https://medchain-backend-clean.onrender.com/ledger")
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
      const res = await axios.post(`${API_BASE}/predict`, stockHistory);
      setPredictionResult({ ...predictionResult, [index]: res.data });
    } catch (err) {
      alert("Prediction failed.");
      console.error(err);
    }
  };

  const getCardColor = (prediction) => {
    if (!prediction) return "bg-gray-100";
    if (prediction.predicted_stock > 50) return "bg-green-100";
    if (prediction.predicted_stock > 20) return "bg-yellow-100";
    return "bg-red-100";
  };

  if (loading) return <p className="text-center mt-10 text-lg">Loading...</p>;
  if (ledger.length === 0) return <p className="text-center mt-10 text-lg">No medicines found.</p>;

  return (
    <div className="p-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-semibold">Medicine Records</h3>
        <h2 className="text-xl font-bold mt-2">🧾 {ledger.length} medicines found</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ledger.map((entry, idx) => {
          const qrData = `${entry.medicine.name}|${entry.medicine.batch}|${entry.medicine.expiry}|${entry.hash}`;
          const prediction = predictionResult[idx];
          const bgColor = getCardColor(prediction);

          return (
            <div key={idx} className={`rounded-lg shadow-md p-5 border ${bgColor}`}>
              <p><strong>Name:</strong> {entry.medicine.name}</p>
              <p><strong>Batch:</strong> {entry.medicine.batch}</p>
              <p><strong>Expiry:</strong> {entry.medicine.expiry}</p>
              <p className="break-all"><strong>Hash:</strong> <code>{entry.hash}</code></p>

              <div className="mt-4 flex flex-col items-center">
                <QRCodeCanvas value={qrData} size={128} />
                <p className="text-xs text-gray-600 mt-2">Scan to verify</p>
              </div>
              {entry.tracking && (
                <div className="mt-4 text-sm text-left">
                  <h4 className="font-semibold text-sm">📍 Tracking History:</h4>
                  <ul className="text-sm text-gray-700 list-disc list-inside">
                    {entry.tracking.map((t, i) => (
                      <li key={i}>{t.location} – {t.timestamp}</li>
                    ))}
                  </ul>
                  <p className="mt-2 text-sm font-medium">
                    ETA: {entry.eta || "Unknown"} | Status: {entry.status || "In Transit"}
                  </p>
                </div>
              )}


              <div className="mt-4">
                {selectedIndex === idx ? (
                  <>
                    <input
                      className="w-full p-2 border rounded mb-2"
                      placeholder="Enter past stock (e.g. 100,80,65)"
                      value={stockInput}
                      onChange={e => setStockInput(e.target.value)}
                    />
                    <button
                      onClick={() => handlePredict(idx)}
                      className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                    >
                      Predict
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setSelectedIndex(idx)}
                    className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700"
                  >
                    📉 Predict Stock
                  </button>
                )}

                {prediction && (
                  <div className="mt-4 text-sm">
                    <p><strong>Predicted Stock:</strong> {prediction.predicted_stock}</p>
                    <p><strong>Status:</strong> {prediction.message}</p>
                    {prediction.predicted_stock < 20 && (
                      <p className="text-red-600 font-bold">⚠️ Critical: Immediate Refill Needed!</p>
                    )}

                    {prediction.predicted_stock >= 20 && prediction.predicted_stock <= 50 && (
                      <p className="text-yellow-600 font-semibold">⚠️ Warning: Refill Soon</p>
                    )}

                    {prediction.predicted_stock > 50 && (
                      <p className="text-green-600">✅ Stock is sufficient</p>
                    )}

                  </div>
                )}

                {user.role === "distributor" && (
                  <button
                    className="mt-3 w-full bg-orange-600 text-white p-2 rounded hover:bg-orange-700"
                    onClick={() => {
                      const newLocation = prompt("Enter new location to update tracking:");
                      if (!newLocation) return;
                      axios.post(`${API_BASE}/update-location`, {
                        batch: entry.medicine.batch,
                        location: newLocation
                      }).then(() => {
                        alert("Location updated!");
                        window.location.reload();
                      }).catch(err => {
                        alert("Error updating location");
                        console.error(err);
                      });
                    }}
                  >
                    🚚 Update Location
                  </button>
                )}

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default ViewMedicines;
