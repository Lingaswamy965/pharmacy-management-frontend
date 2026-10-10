import { useEffect, useState } from "react";
import API from "../api";

function Sales() {
  const [customers, setCustomers] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedMedicine, setSelectedMedicine] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);
  const [sales, setSales] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadCustomers();
    loadMedicines();
    loadSales();
  }, []);

  const loadCustomers = () => {
    API.get("/customers")
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => {
        console.error("Error loading customers:", error);
      });
  };

  const loadMedicines = () => {
    API.get("/medicines")
      .then((response) => {
        setMedicines(response.data);
      })
      .catch((error) => {
        console.error("Error loading medicines:", error);
      });
  };

  const loadSales = () => {
    API.get("/sales")
      .then((response) => {
        setSales(response.data);
      })
      .catch((error) => {
        console.error("Error loading sales:", error);
      });
  };

  const addToCart = () => {
    if (!selectedMedicine) {
      alert("Please select a medicine.");
      return;
    }

    const medicine = medicines.find(
      (item) => item.id === Number(selectedMedicine)
    );

    if (!medicine) {
      return;
    }

    const requestedQuantity = Number(quantity);

    if (requestedQuantity <= 0) {
      alert("Quantity must be greater than zero.");
      return;
    }

    if (requestedQuantity > medicine.quantity) {
      alert(
        `Only ${medicine.quantity} units of ${medicine.medicineName} are available.`
      );
      return;
    }

    const existingItem = cart.find(
      (item) => item.medicine.id === medicine.id
    );

    if (existingItem) {
      const newQuantity =
        existingItem.quantity + requestedQuantity;

      if (newQuantity > medicine.quantity) {
        alert(
          `Only ${medicine.quantity} units of ${medicine.medicineName} are available.`
        );
        return;
      }

      setCart(
        cart.map((item) =>
          item.medicine.id === medicine.id
            ? {
                ...item,
                quantity: newQuantity,
                subtotal:
                  Number(medicine.price) * newQuantity,
              }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          medicine: medicine,
          quantity: requestedQuantity,
          price: Number(medicine.price),
          subtotal:
            Number(medicine.price) * requestedQuantity,
        },
      ]);
    }

    setSelectedMedicine("");
    setQuantity(1);
  };

  const removeFromCart = (medicineId) => {
    setCart(
      cart.filter((item) => item.medicine.id !== medicineId)
    );
  };

  const calculateTotal = () => {
    return cart.reduce(
      (total, item) => total + item.subtotal,
      0
    );
  };

  const createSale = () => {
    if (!selectedCustomer) {
      alert("Please select a customer.");
      return;
    }

    if (cart.length === 0) {
      alert("Please add at least one medicine.");
      return;
    }

    const saleItems = cart.map((item) => ({
      medicine: {
        id: item.medicine.id,
      },
      quantity: item.quantity,
    }));

    API.post(
      `/sales?customerId=${selectedCustomer}`,
      saleItems
    )
      .then((response) => {
        setMessage(
          `Sale #${response.data.id} created successfully! Total: ₹${Number(
            response.data.totalAmount
          ).toFixed(2)}`
        );

        setCart([]);
        setSelectedCustomer("");
        setSelectedMedicine("");
        setQuantity(1);

        loadMedicines();
        loadSales();
      })
      .catch((error) => {
        console.error("Error creating sale:", error);

        const errorMessage =
          error.response?.data?.error ||
          "Failed to create sale.";

        alert(errorMessage);
      });
  };

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1>Sales & Billing</h1>
          <p>Create and manage pharmacy sales</p>
        </div>
      </div>

      {message && (
        <div className="success-message">
          {message}
        </div>
      )}

      {/* Create Sale */}
      <div className="sale-card">
        <h2>Create New Sale</h2>

        {/* Customer */}
        <div className="sale-section">
          <label>Customer</label>

          <select
            value={selectedCustomer}
            onChange={(event) =>
              setSelectedCustomer(event.target.value)
            }
          >
            <option value="">Select Customer</option>

            {customers.map((customer) => (
              <option
                key={customer.id}
                value={customer.id}
              >
                {customer.name} - {customer.phone || "No phone"}
              </option>
            ))}
          </select>
        </div>

        {/* Medicine Selection */}
        <div className="sale-product-row">
          <div className="sale-field">
            <label>Medicine</label>

            <select
              value={selectedMedicine}
              onChange={(event) =>
                setSelectedMedicine(event.target.value)
              }
            >
              <option value="">Select Medicine</option>

              {medicines.map((medicine) => (
                <option
                  key={medicine.id}
                  value={medicine.id}
                  disabled={medicine.quantity <= 0}
                >
                  {medicine.medicineName} - ₹
                  {Number(medicine.price).toFixed(2)} - Stock:{" "}
                  {medicine.quantity}
                </option>
              ))}
            </select>
          </div>

          <div className="sale-field quantity-field">
            <label>Quantity</label>

            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(event) =>
                setQuantity(event.target.value)
              }
            />
          </div>

          <button
            className="primary-button add-cart-button"
            onClick={addToCart}
          >
            ➕ Add
          </button>
        </div>

        {/* Cart */}
        <div className="cart-section">
          <h3>Sale Items</h3>

          {cart.length === 0 ? (
            <div className="empty-cart">
              No medicines added to this sale.
            </div>
          ) : (
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Medicine</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {cart.map((item) => (
                    <tr key={item.medicine.id}>
                      <td>
                        <strong>
                          {item.medicine.medicineName}
                        </strong>
                      </td>

                      <td>
                        ₹{item.price.toFixed(2)}
                      </td>

                      <td>{item.quantity}</td>

                      <td>
                        ₹{item.subtotal.toFixed(2)}
                      </td>

                      <td>
                        <button
                          className="delete-button"
                          onClick={() =>
                            removeFromCart(item.medicine.id)
                          }
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Total */}
          <div className="sale-total">
            <span>Total Amount</span>

            <strong>
              ₹{calculateTotal().toFixed(2)}
            </strong>
          </div>

          <div className="sale-submit">
            <button
              className="primary-button"
              onClick={createSale}
            >
              🧾 Complete Sale
            </button>
          </div>
        </div>
      </div>

      {/* Previous Sales */}
      <div className="sales-history-card">
        <div className="list-header">
          <h2>Sales History</h2>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Sale ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Total Amount</th>
              </tr>
            </thead>

            <tbody>
              {sales.map((sale) => (
                <tr key={sale.id}>
                  <td>
                    <strong>#{sale.id}</strong>
                  </td>

                  <td>
                    {sale.customer?.name || "-"}
                  </td>

                  <td>
                    {sale.saleDate
                      ? new Date(
                          sale.saleDate
                        ).toLocaleString()
                      : "-"}
                  </td>

                  <td>
                    ₹
                    {Number(
                      sale.totalAmount
                    ).toFixed(2)}
                  </td>
                </tr>
              ))}

              {sales.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="no-data"
                  >
                    No sales found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Sales;