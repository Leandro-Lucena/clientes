# Customer Management System

[🇧🇷 Em Português](README.br.md)

## ✨ The Project

A customer registration application built with a React + TypeScript frontend and a Node.js + PostgreSQL backend. The system allows authenticated login, customer registration, editing, and listing, with an option to export a list of all customers to PDF. Authentication is used to protect routes, and Docker was used to containerize the application.

## 🚀 Technologies Used

### Frontend:

- React + TypeScript
- Material UI
- React Router
- react-pdf (PDF generation)
- Jest (unit tests)

### Backend:

- Node.js + TypeScript
- Express
- TypeORM
- PostgreSQL
- JWT for authentication and route protection

### DevOps:

- Docker
- Docker Compose

---

## 📌 API - Available Backend Endpoints (port 5000)

### Authentication:

```
POST /login
→ Body: { username: string, password: string }
→ Return: token JWT
```

### Clients (protegido com JWT):

```
GET /clients
→ Lists all clients

POST /clients
→ Creates a new client
→ Body: { name, email, phone, address }

PUT /clients/:id
→ Updates an existing client
→ Body: { name, email, phone, address }

DELETE /clients/:id
→ Removes an existing client
```

---

## ⚖️ Features

### Authentication

- Fixed user: `admin`
- Fixed password: `admin`

### Customer Registration

- Fields: Name, Email, Phone, Address
- Full CRUD (create, list, edit, delete)

### Listing

- Table with customer data
- Button to export the list to PDF (via `react-pdf`)

---

## 📆 Setup Instructions

### Requirements:

- Node.js >= 18
- Docker

### Steps:

```bash
# Clone the repository
git clone https://github.com/Leandro-Lucena/clients

# Enter the cloned repository folder
cd clients

# Rename the environment variable files from ".env.example" to ".env"
mv frontend/.env.example frontend/.env
mv backend/.env.example backend/.env

# Start the containers
docker-compose up --build
```

### Access:

- Open your browser and go to: http://localhost:3000
- Log in with the credentials:
  - User: `admin`
  - Password: `admin`
- Now you can register, edit, and export a PDF list of your customers.

---

## 🌐 Online Test via Render

The project is also available for online testing:

- https://clientes-2.onrender.com

- Log in with the credentials:
  - User: `admin`
  - Password: `admin`

Note:
Render's free services may take a few seconds to start ("cold start").

---

## 🔧 Tests (Jest)

```bash
# Run frontend tests
cd front-end
npm test
```

```bash
# Run backend tests
cd back-end
npm test
```

---

## ✅ Conclusion...

This project was built with a focus on good full-stack development practices, frontend and backend integration, and scalable code organization. The implementation of tests, JWT authentication, and Docker containerization was designed to deliver quality, facilitate maintenance, and deployment.
