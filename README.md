# 🚀 Full Stack Portfolio Application

A production‑ready **full stack portfolio platform** with a public website, an admin dashboard, and a secure backend API. This project is designed to demonstrate **real‑world backend & full‑stack engineering skills**, following industry best practices.

---

## 📌 Project Overview

This repository follows a **monorepo structure**, containing:

* **Frontend** – Public portfolio website
* **Admin Panel** – Secure admin dashboard to manage content
* **Backend API** – RESTful API built with NestJS

The goal of this project is to showcase:

* Clean architecture
* Secure authentication
* Scalable backend design
* Professional project structure

---

## 📂 Folder Structure

```bash
portfolio-project/
│
├── frontend/        # Public portfolio (React + Tailwind)
├── admin/           # Admin dashboard (React)
├── backend/         # Backend API (NestJS + PostgreSQL)
├── .gitignore
├── README.md
```

---

## 🧑‍💻 Tech Stack

### Frontend (Public Website)

* React
* TypeScript
* Tailwind CSS
* Vite

### Admin Panel

* React
* TypeScript
* Tailwind CSS
* JWT Authentication

### Backend

* NestJS
* TypeScript
* PostgreSQL
* TypeORM
* JWT Authentication
* Swagger (API Docs)
* bcrypt (password hashing)

---

## 🔐 Authentication & Security

* Admin authentication using **JWT (Access Token)**
* Passwords hashed using **bcrypt**
* Protected routes using **JwtAuthGuard**
* CORS configured for multiple frontend origins

---

## 📘 API Documentation (Swagger)

Swagger is enabled for easy API testing and documentation.

```bash
http://localhost:5000/api/docs
```

Features:

* Bearer token authentication
* Request/response schemas
* Interactive API testing

---

## 👑 Admin Seeder

On application startup, a default admin account is automatically created if it does not exist.

### Default Admin Credentials (Dev)

```txt
Email: admin@gmail.com
Password: Admin@123
```

Credentials can be customized via `.env` variables.

---

## ⚙️ Environment Variables

Create a `.env` file inside the **backend** folder:

```env
PORT=5000

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=portfolio_db

JWT_SECRET=supersecretkey

ADMIN_EMAIL=admin@gmail.com
ADMIN_PASSWORD=Admin@123
ADMIN_NAME=Super Admin
```

> ⚠️ `.env` files are intentionally excluded from Git for security.

---

## ▶️ Running the Project Locally

### 1️⃣ Backend

```bash
cd backend
npm install
npm run start:dev
```

Backend will run at:

```txt
http://localhost:5000
```

---

### 2️⃣ Frontend (Public Website)

```bash
cd frontend
npm install
npm run dev
```

Runs at:

```txt
http://localhost:5173
```

---

### 3️⃣ Admin Panel

```bash
cd admin
npm install
npm run dev
```

Runs at:

```txt
http://localhost:5174
```

---

## 🌐 CORS Configuration

The backend allows multiple origins for local development:

* [http://localhost:5173](http://localhost:5173) (Frontend)
* [http://localhost:5174](http://localhost:5174) (Admin Panel)

Configured dynamically for secure production usage.

---

## 🧠 Design Decisions

* **Monorepo structure** for simplified development and deployment
* **NestJS** for scalable, modular backend architecture
* **JWT-based authentication** for stateless security
* **Swagger** for API clarity and testing
* **Admin seeding** for instant access in development

---

## 🚀 Future Enhancements

* Refresh token support
* Role‑based access control (RBAC)
* File upload support (S3 / Cloudinary)
* CI/CD pipeline (GitHub Actions)
* Dockerization

---

## 👨‍💼 Author

**Shivam Makwana**
Backend / Full Stack Developer

* Node.js | NestJS | PostgreSQL | React
* REST APIs | Authentication | System Design

---

## ⭐ Final Note

This project is intentionally structured to reflect **real production‑grade applications**, not just demo code. It can be easily extended, deployed, and scaled.

If you’re a recruiter or reviewer — feel free to explore the codebase 🚀
