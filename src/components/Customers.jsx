import { useEffect, useState } from "react";
import API from "../api";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const emptyForm = {
    name: "",
    phone: "",
    email: "",
    address: "",
  };

  const [form, setForm] = useState(emptyForm);

  const loadCustomers = () => {
    API.get("/customers")
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => {
        console.error("Error loading customers:", error);
      });
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (editingId) {
      API.put(`/customers/${editingId}`, form)
        .then(() => {
          alert("Customer updated successfully!");
          setForm(emptyForm);
          setEditingId(null);
          setShowForm(false);
          loadCustomers();
        })
        .catch((error) => {
          console.error("Error updating customer:", error);
          alert("Failed to update customer.");
        });
    } else {
      API.post("/customers", form)
        .then(() => {
          alert("Customer added successfully!");
          setForm(emptyForm);
          setShowForm(false);
          loadCustomers();
        })
        .catch((error) => {
          console.error("Error adding customer:", error);
          alert("Failed to add customer.");
        });
    }
  };

  const startEdit = (customer) => {
    setForm({
      name: customer.name || "",
      phone: customer.phone || "",
      email: customer.email || "",
      address: customer.address || "",
    });

    setEditingId(customer.id);
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

  const deleteCustomer = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this customer?"
    );

    if (!confirmDelete) {
      return;
    }

    API.delete(`/customers/${id}`)
      .then(() => {
        alert("Customer deleted successfully!");
        loadCustomers();
      })
      .catch((error) => {
        console.error("Error deleting customer:", error);
        alert(
          "Unable to delete customer. They may have existing sales."
        );
      });
  };

  const filteredCustomers = customers.filter((customer) =>
    `${customer.name} ${customer.phone} ${customer.email}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1>Customers</h1>
          <p>Manage pharmacy customers</p>
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
          {showForm ? "✖ Close Form" : "➕ Add Customer"}
        </button>
      </div>

      {/* Add / Edit Customer Form */}
      {showForm && (
        <div className="customer-form-card">
          <h2>
            {editingId ? "Edit Customer" : "Add New Customer"}
          </h2>

          <form onSubmit={handleSubmit} className="customer-form">
            <input
              type="text"
              name="name"
              placeholder="Customer Name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
            />

            <textarea
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
              rows="3"
            />

            <div className="form-buttons">
              <button type="submit" className="primary-button">
                {editingId ? "Update Customer" : "Save Customer"}
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

      {/* Customer List */}
      <div className="customer-list-card">
        <div className="list-header">
          <h2>Customer Records</h2>

          <input
            type="text"
            placeholder="🔍 Search customer..."
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
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.id}</td>

                  <td>
                    <strong>{customer.name}</strong>
                  </td>

                  <td>{customer.phone || "-"}</td>

                  <td>{customer.email || "-"}</td>

                  <td>{customer.address || "-"}</td>

                  <td>
                    <div className="action-buttons">
                      <button
                        className="edit-button"
                        onClick={() => startEdit(customer)}
                      >
                        ✏️
                      </button>

                      <button
                        className="delete-button"
                        onClick={() =>
                          deleteCustomer(customer.id)
                        }
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredCustomers.length === 0 && (
                <tr>
                  <td colSpan="6" className="no-data">
                    No customers found.
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

export default Customers;