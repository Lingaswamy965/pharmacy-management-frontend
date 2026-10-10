# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# 💊 Pharmacy Management System — Frontend

A responsive web-based frontend for a Pharmacy Management System, built using **React.js and Vite**. The application provides an interface for managing medicines, customers, sales, inventory, and pharmacy alerts.

The frontend communicates with a Java Spring Boot backend through REST APIs using Axios.

## ✨ Features

### 🔐 Login
- User login form
- Backend credential verification
- Login state maintained using browser `localStorage`
- Logout functionality

### 📊 Dashboard
Displays key pharmacy information:
- Total medicines
- Total customers
- Total sales
- Low-stock medicine count
- Expired-medicine count

Includes quick actions for adding medicines, adding customers, and creating a sale.

### 💊 Medicine Management
- View medicine inventory
- Add new medicines
- Edit existing medicine details
- Delete medicines
- Search medicines by name
- Display stock quantities
- Highlight low-stock medicines

Medicine details include name, category, batch number, manufacturer, price, quantity, and expiry date.

### 👥 Customer Management
- View customer records
- Add new customers
- Edit customer details
- Delete customers
- Search customer information

Customer details include name, phone number, email address, and address.

### 🧾 Sales & Billing
- Select a customer
- Select medicines from inventory
- Enter medicine quantities
- Add medicines to a cart
- Calculate subtotals and total amount
- Remove items from the cart
- Complete a sale
- View sales history

The backend processes completed sales and updates medicine stock.

### ⚠️ Inventory Alerts
- View low-stock medicines
- View expired medicines
- Display alert counts
- Refresh alert information

## 🛠️ Technologies Used

- **React.js** — UI components and state management
- **Vite** — Development server and build tool
- **JavaScript** — Application logic
- **Axios** — HTTP requests to the backend
- **CSS** — Layout, styling, tables, forms, and responsive design
- **React Hooks** — `useState` and `useEffect`
- **HTML** — Application structure

## 🏗️ Application Architecture

```text
User
 |
 v
React Frontend
 |
 +-- Login
 +-- Dashboard
 +-- Medicines
 +-- Customers
 +-- Sales & Billing
 +-- Alerts
 |
 v
Axios API Client
 |
 v
Spring Boot REST API
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
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

## ⚙️ Prerequisites

Install the following software:

- Node.js
- npm
- Git
- A code editor such as Visual Studio Code

The Java Spring Boot backend and MySQL database must also be configured to use the complete application.

## 🚀 Installation and Setup

### 1. Clone the repository

Replace `YOUR_USERNAME` with your GitHub username.

```bash
git clone https://github.com/YOUR_USERNAME/pharmacy-management-frontend.git
cd pharmacy-management-frontend
```

### 2. Install dependencies

Run:

```bash
npm install
```

This installs the dependencies listed in `package.json`.

### 3. Configure the backend API

Open `src/api.js`.

The local development configuration uses:

```javascript
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

export default API;
```

Ensure the Spring Boot backend is running at `http://localhost:8080`.

If your backend uses a different address or port, update the API base URL accordingly.

### 4. Start the frontend

Run:

```bash
npm run dev
```

Vite will display a local development URL, normally:

```text
http://localhost:5173/
```

Open the URL in your browser.

## 🔗 Backend Integration

The frontend uses Axios to communicate with Spring Boot REST APIs.

Examples of API requests include:

| Operation | API Endpoint |
|---|---|
| Retrieve medicines | `GET /api/medicines` |
| Add medicine | `POST /api/medicines` |
| Update medicine | `PUT /api/medicines/{id}` |
| Delete medicine | `DELETE /api/medicines/{id}` |
| Retrieve customers | `GET /api/customers` |
| Retrieve sales | `GET /api/sales` |
| Create sale | `POST /api/sales?customerId={id}` |
| Dashboard summary | `GET /api/dashboard/summary` |
| Low-stock alerts | `GET /api/medicines/low-stock` |
| Expired-medicine alerts | `GET /api/medicines/expired` |

The backend is maintained in a separate repository:

**Backend repository:** `pharmacy-management-backend`

Replace that repository name with a link to your actual GitHub backend repository when available.

## 🧪 Testing

The frontend was functionally tested with the Spring Boot backend.

The following modules were checked:

- Login and logout
- Dashboard statistics
- Medicine listing, searching, adding, editing, and deleting
- Customer management
- Sales cart and total calculation
- Sales history
- Low-stock and expired-medicine alerts

Postman was also used to test the backend APIs independently.

## ▶️ Running the Complete Application

For local development, start both applications in separate terminals:

**Terminal 1 — Backend**

```bash
cd pharmacy-management-backend
```

Start the Spring Boot application using its Maven wrapper:

```powershell
.\mvnw.cmd spring-boot:run
```

**Terminal 2 — Frontend**

```bash
npm install
npm run dev
```

Open the frontend URL printed by Vite.

Ensure MySQL is running and the backend database connection is configured correctly.

## 🔒 Security Notes

- Never commit passwords, API keys, or `.env` files containing secrets.
- The frontend uses `localStorage` to retain a username-based login state; this is not a secure authentication mechanism by itself.
- Production deployment should use appropriate backend authentication and authorization.
- Configure the correct API URL and HTTPS when deploying the application.

## 🔮 Future Enhancements

- Improved responsive design
- Protected frontend routes
- Role-based user interface
- PDF invoice display and download
- Advanced search and filtering
- Sales analytics and charts
- Production deployment

## 👨‍💻 Project Information

**Project:** Pharmacy Management System  
**Frontend:** React.js  
**Build Tool:** Vite  
**API Client:** Axios  
**Backend:** Java Spring Boot  
**Database:** MySQL

---

*Developed as the frontend component of a full-stack Pharmacy Management System to simplify pharmacy inventory, customer records, sales processing, and stock monitoring.*
