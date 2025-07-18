# kaizen-que-backend


# 📦 Backend Assignment – Form Submission API

This project provides a simple RESTful API to handle form submissions. It allows storing user-submitted form data (name, email, message) into a MySQL database and retrieving all entries.

---

## 📁 Folder Structure

```
backend/
├── routes/
│   └── form/
│       └── index.js
├── config/
│   └── connection.js
├── .env
├── server.js
└── package.json
```

---

##  Environment Variables (.env) 
```
DB_HOST=your_database_host
DB_PORT=your_database_port
DB_USER=your_database_user
DB_PASS=your_database_password
DB_NAME=your_database_name
URL=http://localhost:3000 # or your frontend URL if CORS is implemented
```

## 🚀 How to Run Locally

### 1. Clone the Repository

```bash
git clone https://github.com/iramanachary/kaizen-que-backend.git
cd backend
npm install
nodemon server 

```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```


 ##  API Endpoints
### ✅ POST /api/form
 Accepts form submissions.

Body Example:

```bash
{
  "data": {
    "fullName": "John Doe",
    "email": "john@example.com",
    "message": "Hello! This is a test."
  }
}

```

### ✅ GET /api/form
 Returns all submitted form entries in JSON format.