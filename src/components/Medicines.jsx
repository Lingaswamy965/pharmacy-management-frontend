import { useEffect, useState } from "react";
import API from "../api";

function Medicines() {
  const [medicines, setMedicines] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const emptyForm = {
    medicineName: "",
    category: "",
    batchNumber: "",
    manufacturer: "",
    price: "",
    quantity: "",
    expiryDate: "",
  };

  const [form, setForm] = useState(emptyForm);

  const loadMedicines = () => {
    API.get("/medicines")
      .then((response) => {
        setMedicines(response.data);
      })
      .catch((error) => {
        console.error("Error loading medicines:", error);
      });
  };

  useEffect(() => {
    loadMedicines();
  }, []);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const medicineData = {
      ...form,
      price: Number(form.price),
      quantity: Number(form.quantity),
    };

    if (editingId) {
      API.put(`/medicines/${editingId}`, medicineData)
        .then(() => {
          alert("Medicine updated successfully!");
          setForm(emptyForm);
          setEditingId(null);
          setShowForm(false);
          loadMedicines();
        })
        .catch((error) => {
          console.error("Error updating medicine:", error);
          alert("Failed to update medicine.");
        });
    } else {
      API.post("/medicines", medicineData)
        .then(() => {
          alert("Medicine added successfully!");
          setForm(emptyForm);
          setShowForm(false);
          loadMedicines();
        })
        .catch((error) => {
          console.error("Error adding medicine:", error);
          alert("Failed to add medicine.");
        });
    }
  };

  const startEdit = (medicine) => {
    setForm({
      medicineName: medicine.medicineName || "",
      category: medicine.category || "",
      batchNumber: medicine.batchNumber || "",
      manufacturer: medicine.manufacturer || "",
      price: medicine.price || "",
      quantity: medicine.quantity || "",
      expiryDate: medicine.expiryDate || "",
    });

    setEditingId(medicine.id);
    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const cancelForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
  };

  const deleteMedicine = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this medicine?"
    );

    if (!confirmDelete) {
      return;
    }

    API.delete(`/medicines/${id}`)
      .then(() => {
        alert("Medicine deleted successfully!");
        loadMedicines();
      })
      .catch((error) => {
        console.error("Error deleting medicine:", error);
        alert("Failed to delete medicine.");
      });
  };

  const filteredMedicines = medicines.filter((medicine) =>
    medicine.medicineName
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1>Medicines</h1>
          <p>Manage pharmacy inventory</p>
        </div>

        <button
          className="primary-button"
          onClick={() => {
            if (showForm) {
              cancelForm();
            } else {
              setForm(emptyForm);
              setEditingId(null);
              setShowForm(true);
            }
          }}
        >
          {showForm ? "✖ Close Form" : "➕ Add Medicine"}
        </button>
      </div>

      {/* Add / Edit Form */}
      {showForm && (
        <div className="medicine-form-card">
          <h2>
            {editingId ? "Edit Medicine" : "Add New Medicine"}
          </h2>

          <form onSubmit={handleSubmit} className="medicine-form">
            <input
              type="text"
              name="medicineName"
              placeholder="Medicine Name"
              value={form.medicineName}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="category"
              placeholder="Category"
              value={form.category}
              onChange={handleChange}
            />

            <input
              type="text"
              name="batchNumber"
              placeholder="Batch Number"
              value={form.batchNumber}
              onChange={handleChange}
            />

            <input
              type="text"
              name="manufacturer"
              placeholder="Manufacturer"
              value={form.manufacturer}
              onChange={handleChange}
            />

            <input
              type="number"
              name="price"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
            />

            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={form.quantity}
              onChange={handleChange}
              min="0"
              required
            />

            <input
              type="date"
              name="expiryDate"
              value={form.expiryDate}
              onChange={handleChange}
              required
            />

            <div className="form-buttons">
              <button type="submit" className="primary-button">
                {editingId ? "Update Medicine" : "Save Medicine"}
              </button>

              <button
                type="button"
                className="cancel-button"
                onClick={cancelForm}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Medicine Inventory */}
      <div className="medicine-list-card">
        <div className="list-header">
          <h2>Medicine Inventory</h2>

          <input
            type="text"
            placeholder="🔍 Search medicine..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="search-input"
          />
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Medicine</th>
                <th>Category</th>
                <th>Batch</th>
                <th>Manufacturer</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Expiry</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredMedicines.map((medicine) => (
                <tr key={medicine.id}>
                  <td>{medicine.id}</td>

                  <td>
                    <strong>{medicine.medicineName}</strong>
                  </td>

                  <td>{medicine.category}</td>

                  <td>{medicine.batchNumber}</td>

                  <td>{medicine.manufacturer}</td>

                  <td>
                    ₹{Number(medicine.price).toFixed(2)}
                  </td>

                  <td>
                    <span
                      className={
                        medicine.quantity < 10
                          ? "stock-low"
                          : "stock-normal"
                      }
                    >
                      {medicine.quantity}
                    </span>
                  </td>

                  <td>{medicine.expiryDate}</td>

                  <td>
                    <div className="action-buttons">
                      <button
                        className="edit-button"
                        onClick={() => startEdit(medicine)}
                      >
                        ✏️
                      </button>

                      <button
                        className="delete-button"
                        onClick={() =>
                          deleteMedicine(medicine.id)
                        }
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredMedicines.length === 0 && (
                <tr>
                  <td colSpan="9" className="no-data">
                    No medicines found.
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

export default Medicines;