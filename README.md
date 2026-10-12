# React + Vite
# 💊 Pharmacy Management System

A full-stack web application developed to manage pharmacy operations, including medicine inventory, customer records, sales and billing, and stock monitoring. The system provides a centralized interface to maintain pharmacy records and track inventory efficiently.

## 📌 Project Overview

The Pharmacy Management System is built using React.js for the frontend, Java Spring Boot for the backend, and MySQL for database management. The frontend communicates with the backend through REST APIs using Axios.

The application allows users to manage medicines and customers, create sales, calculate billing totals, automatically update medicine quantities after sales, and monitor low-stock and expired medicines.

## 🛠️ Technologies Used

**Frontend**
- React.js
- JavaScript (JSX)
- Vite
- Axios
- HTML and CSS

**Backend**
- Java
- Spring Boot
- Spring Data JPA
- Hibernate
- Maven
- REST APIs

**Database**
- MySQL

**Testing and Development Tools**
- Visual Studio Code
- Postman
- Git and GitHub

## ✨ Features Implemented

### 🔐 Login and Logout
- Login form connected to the backend.
- Credential verification through the login API.
- Username stored in browser `localStorage` after successful login.
- Logout functionality.

### 📊 Dashboard
Displays:
- Total medicines
- Total customers
- Total sales
- Low-stock medicine count
- Expired-medicine count

Also provides quick actions to access medicine management, customer management, and sales.

### 💊 Medicine Management
- Add new medicines.
- View medicine inventory.
- Edit medicine details.
- Delete medicines.
- Search medicines by name.
- Display medicine price and quantity.
- Highlight low-stock quantities.
- Store batch number, manufacturer, category, and expiry date.

### 👥 Customer Management
- Add customer records.
- View customer information.
- Edit customer details.
- Delete customer records.
- Search customer information.
- Store name, phone number, email, and address.

### 🧾 Sales and Billing
- Select a customer.
- Select medicines from available inventory.
- Enter purchase quantities.
- Add medicines to a cart.
- Calculate subtotals and total amount.
- Remove items from the cart.
- Validate requested quantities against available stock.
- Complete sales through the backend.
- Display sales history.
- Update displayed stock after a successful sale.

### ⚠️ Inventory Alerts
- Retrieve and display low-stock medicines.
- Retrieve and display expired medicines.
- Show alert counts.
- Refresh alert information.

## 🏗️ System Architecture

```text
             User
              |
              v
       React.js Frontend
              |
            Axios
              |
              v
     Spring Boot REST APIs
              |
         Service Layer
              |
       Repository Layer
              |
              v
         MySQL Database
```

## 📁 Project Structure

The project is organized into separate frontend and backend applications.

```text
pharmacy-management-system/
├── backend/
│   └── pharmacy-backend/
│       ├── src/
│       ├── pom.xml
│       └── mvnw.cmd
│
└── frontend/
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
    ├── package.json
    └── vite.config.js
```

## 🗄️ Database Design

**Database name:** `pharmacy_management_db`

The application uses the following main tables:

| Table | Purpose |
|---|---|
| `users` | Stores user account records |
| `medicines` | Stores medicine and inventory details |
| `customers` | Stores customer information |
| `sales` | Stores completed sales and totals |
| `sale_items` | Stores individual items belonging to each sale |

Relationships connect sales with customers and sale items with sales and medicines.

## 🔌 Main REST API Endpoints

The backend runs locally at:

`http://localhost:8080`

The API base URL is:

`http://localhost:8080/api`

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/medicines` | Retrieve medicines |
| GET | `/api/medicines/{id}` | Retrieve a medicine by ID |
| POST | `/api/medicines` | Add a medicine |
| PUT | `/api/medicines/{id}` | Update a medicine |
| DELETE | `/api/medicines/{id}` | Delete a medicine |
| GET | `/api/medicines/low-stock` | Retrieve low-stock medicines |
| GET | `/api/medicines/expired` | Retrieve expired medicines |
| GET | `/api/customers` | Retrieve customers |
| POST | `/api/customers` | Add a customer |
| PUT | `/api/customers/{id}` | Update a customer |
| DELETE | `/api/customers/{id}` | Delete a customer |
| GET | `/api/sales` | Retrieve sales history |
| POST | `/api/sales?customerId={id}` | Create a sale |
| POST | `/api/users/login` | Verify login credentials |
| GET | `/api/dashboard/summary` | Retrieve dashboard statistics |

## 🚀 How to Run the Project

### Prerequisites
- Java JDK
- Node.js and npm
- MySQL Server
- Git
- Visual Studio Code

### 1. Configure MySQL
Start MySQL and ensure the database `pharmacy_management_db` and required tables exist.

Configure the database connection in the backend's `application.properties` file. Keep database credentials private.

### 2. Start the Backend

Open a terminal and run:

```powershell
cd C:\project\pharmacy-management-system\backend\pharmacy-backend
.\mvnw.cmd spring-boot:run
```

Wait for Spring Boot to start on port `8080`.

### 3. Start the Frontend

Open a second terminal and run:

```powershell
cd C:\project\pharmacy-management-system\frontend
npm install
npm run dev
```

Open the local URL displayed by Vite, normally:

`http://localhost:5173/`

Keep both the backend and frontend running while using the application.

## 🧪 Testing Performed

The frontend was functionally checked for:
- Login and logout.
- Dashboard statistics.
- Medicine listing, searching, adding, editing, and deleting.
- Customer management.
- Sales cart and total calculation.
- Sales history.
- Stock reduction after a completed sale.
- Low-stock and expired-medicine alerts.

Postman was also used to test backend REST APIs, including retrieving the medicine list and retrieving a medicine by ID.

## 🔒 Security Notes

- Do not commit real database passwords or secret configuration files to GitHub.
- The current login flow stores a username in `localStorage`; this is not a substitute for secure authentication.
- Production use would require stronger authentication, password hashing, authorization, and appropriate HTTPS configuration.

## 🔮 Future Enhancements

- Secure authentication using Spring Security.
- Role-based access control.
- PDF invoice generation.
- Advanced sales reports and analytics.
- Automated stock and expiry notifications.
- Cloud deployment.

## 🎯 Project Objective

The objective of this project is to simplify pharmacy operations by providing a centralized system for managing medicine inventory, customer records, sales, billing, and stock alerts.

## 👨‍💻 Project Information

**Project Name:** Pharmacy Management System  
**Project Type:** Java Full Stack Web Application  
**Frontend:** React.js and Vite  
**Backend:** Java Spring Boot  
**Database:** MySQL  
**API Communication:** REST APIs and Axios

---

Developed as a full-stack application to improve the organization and efficiency of pharmacy inventory and sales management.

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
