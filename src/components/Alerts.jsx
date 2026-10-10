import { useEffect, useState } from "react";
import API from "../api";

function Alerts() {
  const [lowStock, setLowStock] = useState([]);
  const [expired, setExpired] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadAlerts = () => {
    setLoading(true);

    Promise.all([
      API.get("/medicines/low-stock"),
      API.get("/medicines/expired"),
    ])
      .then(([lowStockResponse, expiredResponse]) => {
        setLowStock(lowStockResponse.data);
        setExpired(expiredResponse.data);
      })
      .catch((error) => {
        console.error("Error loading alerts:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadAlerts();
  }, []);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Alerts</h1>
          <p>Monitor low-stock and expired medicines</p>
        </div>

        <button
          className="primary-button"
          onClick={loadAlerts}
        >
          🔄 Refresh Alerts
        </button>
      </div>

      {loading ? (
        <div className="medicine-list-card">
          <p className="no-data">Loading alerts...</p>
        </div>
      ) : (
        <>
          {/* LOW STOCK ALERTS */}

          <div className="alert-card low-stock-alert">
            <div className="alert-header">
              <div>
                <h2>🔴 Low Stock Medicines</h2>
                <p>
                  Medicines with quantity below the minimum stock
                  level.
                </p>
              </div>

              <span className="alert-count">
                {lowStock.length}
              </span>
            </div>

            {lowStock.length === 0 ? (
              <div className="alert-empty">
                ✅ No low-stock medicines.
              </div>
            ) : (
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Medicine</th>
                      <th>Category</th>
                      <th>Batch</th>
                      <th>Quantity</th>
                      <th>Price</th>
                    </tr>
                  </thead>

                  <tbody>
                    {lowStock.map((medicine) => (
                      <tr key={medicine.id}>
                        <td>{medicine.id}</td>

                        <td>
                          <strong>
                            {medicine.medicineName}
                          </strong>
                        </td>

                        <td>
                          {medicine.category || "-"}
                        </td>

                        <td>
                          {medicine.batchNumber || "-"}
                        </td>

                        <td>
                          <span className="stock-low">
                            {medicine.quantity}
                          </span>
                        </td>

                        <td>
                          ₹
                          {Number(
                            medicine.price
                          ).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* EXPIRED MEDICINES */}

          <div className="alert-card expired-alert">
            <div className="alert-header">
              <div>
                <h2>⏰ Expired Medicines</h2>
                <p>
                  Medicines that have passed their expiry date.
                </p>
              </div>

              <span className="alert-count expired-count">
                {expired.length}
              </span>
            </div>

            {expired.length === 0 ? (
              <div className="alert-empty">
                ✅ No expired medicines.
              </div>
            ) : (
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Medicine</th>
                      <th>Category</th>
                      <th>Batch</th>
                      <th>Quantity</th>
                      <th>Expiry Date</th>
                    </tr>
                  </thead>

                  <tbody>
                    {expired.map((medicine) => (
                      <tr key={medicine.id}>
                        <td>{medicine.id}</td>

                        <td>
                          <strong>
                            {medicine.medicineName}
                          </strong>
                        </td>

                        <td>
                          {medicine.category || "-"}
                        </td>

                        <td>
                          {medicine.batchNumber || "-"}
                        </td>

                        <td>
                          {medicine.quantity}
                        </td>

                        <td>
                          <span className="expiry-badge">
                            {medicine.expiryDate}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Alerts;