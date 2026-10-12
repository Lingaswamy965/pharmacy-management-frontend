# 💊 Pharmacy Management System — Frontend

A web-based Pharmacy Management System frontend developed using **React.js, JavaScript (JSX), Vite, Axios, HTML, and CSS**. The application provides an interface for managing medicine inventory, customer records, sales and billing, and stock alerts.

The frontend communicates with a Java Spring Boot backend through REST APIs and uses MySQL through the backend for data storage.

## 🛠️ Technologies Used

- **React.js** — Building the user interface using reusable components.
- **JavaScript (JSX)** — Implementing application logic and writing React components.
- **Vite** — Frontend development server and build tool.
- **Axios** — Connecting the frontend to backend REST APIs.
- **HTML** — Structuring the web application.
- **CSS** — Styling the dashboard, sidebar, forms, tables, and other interface elements.
- **React Hooks** — Managing component state and side effects using `useState` and `useEffect`.
- **Browser localStorage** — Maintaining the username-based login state.
- **Visual Studio Code** — Development environment.

**Note:** This project uses JavaScript and JSX, not TypeScript or TSX.

## ✨ Features Implemented

### 1. Login and Logout
- Login form connected to the backend login API.
- Credential verification through the backend.
- Login state maintained using browser `localStorage`.
- Logout functionality.

### 2. Dashboard
- Displays total medicines and customers.
- Displays total sales.
- Shows low-stock medicine count.
- Shows expired-medicine count.
- Provides quick navigation to the main modules.

### 3. Medicine Management
- View medicine inventory.
- Add new medicines.
- Edit existing medicine details.
- Delete medicine records.
- Search medicines by name.
- Display medicine prices and available quantities.
- Highlight low-stock medicines.
- Manage category, batch number, manufacturer, and expiry date.

### 4. Customer Management
- View customer records.
- Add new customers.
- Edit customer details.
- Delete customer records.
- Search customer information.
- Maintain customer names, phone numbers, email addresses, and addresses.

### 5. Sales and Billing
- Select a customer for a sale.
- Select medicines from available inventory.
- Enter medicine quantities.
- Add and remove cart items.
- Calculate subtotals and the total bill.
- Validate requested quantities against available stock.
- Submit sales to the backend.
- View sales history.
- Refresh displayed stock after a successful sale.

### 6. Inventory Alerts
- Display medicines with low stock.
- Display expired medicines.
- Show alert counts.
- Refresh alert information.

## 🏗️ Frontend Architecture

The frontend is organized into React components. The `api.js` file configures Axios to communicate with the Spring Boot backend.

```text
User
  |
  v
React.js Frontend
  |
  ├── Login.jsx
  ├── Dashboard (App.jsx)
  ├── Medicines.jsx
  ├── Customers.jsx
  ├── Sales.jsx
  └── Alerts.jsx
  |
  v
Axios API Client (api.js)
  |
  v
Spring Boot REST APIs
  |
  v
MySQL Database
```

## 📁 Project Structure

```text
pharmacy-management-frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── Login.jsx
│   │   ├── Medicines.jsx
│   │   ├── Customers.jsx
│   │   ├── Sales.jsx
│   │   └── Alerts.jsx
│   ├── api.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

## 🔗 Backend Integration

Axios is configured in `src/api.js` to send HTTP requests to the backend.

```javascript
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api"
});

export default API;
```

The frontend uses backend APIs for operations such as:

| Operation | API Endpoint |
|---|---|
| Retrieve medicines | `GET /api/medicines` |
| Add medicine | `POST /api/medicines` |
| Update medicine | `PUT /api/medicines/{id}` |
| Delete medicine | `DELETE /api/medicines/{id}` |
| Retrieve customers | `GET /api/customers` |
| Retrieve sales history | `GET /api/sales` |
| Create a sale | `POST /api/sales?customerId={id}` |
| Dashboard statistics | `GET /api/dashboard/summary` |
| Low-stock medicines | `GET /api/medicines/low-stock` |
| Expired medicines | `GET /api/medicines/expired` |

The backend and frontend are maintained in separate GitHub repositories.

## ⚙️ Prerequisites

Install the following:

- Node.js
- npm
- Git
- Visual Studio Code

To use the complete application, the Spring Boot backend and MySQL database must also be running and configured.

## 🚀 Installation and Setup

### 1. Clone the repository

Replace `YOUR_USERNAME` with your GitHub username.

```bash
git clone https://github.com/YOUR_USERNAME/pharmacy-management-frontend.git
cd pharmacy-management-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the frontend

```bash
npm run dev
```

### 4. Open the application

Open the local URL displayed in the terminal. By default, Vite commonly uses:

`http://localhost:5173/`

Ensure the backend is running at `http://localhost:8080` and MySQL is configured correctly.

## 🧪 Testing

The frontend was functionally checked with the backend for:

- Login and logout.
- Dashboard statistics.
- Medicine management and search.
- Customer management.
- Sales cart and billing calculations.
- Sales history.
- Stock updates after completed sales.
- Low-stock and expired-medicine alerts.

Postman was also used to test backend REST API requests, including medicine retrieval.

## 🔒 Security Notes

- Do not commit database passwords, API keys, or other secrets to GitHub.
- The current login state uses browser `localStorage`; this alone is not secure authentication.
- Production deployment should use suitable authentication, authorization, and HTTPS.
- Update the backend API URL when deploying the application.

## 🔮 Future Enhancements

- Improved responsive design.
- Secure authentication and protected routes.
- Role-based access.
- PDF invoice generation.
- Sales charts and analytics.
- Advanced search and filtering.
- Cloud deployment.

## 🎯 Project Objective

The objective of this frontend is to provide a simple and organized interface for pharmacy operations, making it easier to manage medicine inventory, customer records, sales, billing, and stock alerts.

**Project:** Pharmacy Management System  
**Frontend:** React.js and JavaScript (JSX)  
**Build Tool:** Vite  
**API Client:** Axios  
**Backend:** Java Spring Boot  
**Database:** MySQL

*Developed as the frontend component of a Java full-stack Pharmacy Management System.*
