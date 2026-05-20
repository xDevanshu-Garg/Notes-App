# Notely

A full-stack note-taking app with user authentication, built with the MERN stack. Each user gets their own private workspace to create, edit, and delete notes — secured with JWT-based auth and protected API routes.

🔗 **Live:** [notely-devansh.vercel.app](https://notely-devansh.vercel.app)

> **Note:** The backend is hosted on Render's free tier, so the first request may take ~30s to wake up.

## Features

- **Authentication** — Register & login with hashed passwords (bcrypt) and JWT tokens
- **Protected Routes** — Both frontend routes and API endpoints are guarded
- **CRUD Operations** — Create, read, update, and delete notes
- **User Isolation** — Each user can only access their own notes
- **Persistent Sessions** — Stay logged in across browser sessions via localStorage
- **Loading & Error States** — Graceful handling of slow connections and failures
- **Responsive UI** — Works on desktop and mobile

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, React Router, Tailwind CSS, Axios, Vite |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas, Mongoose |
| Auth | JWT, bcrypt.js |
| Deployment | Vercel (frontend), Render (backend) |

## Project Structure

```
client/                → React frontend
├── src/
│   ├── components/    → Reusable UI components (NoteCard)
│   ├── pages/         → Login, Register, Dashboard
│   ├── services/      → API calls (auth, notes)
│   ├── routes/        → Protected route wrapper
│   └── utils/         → Auth helpers
│
server/                → Express backend
├── config/            → Database connection
├── controllers/       → Route handlers (auth, notes)
├── middleware/        → JWT authentication middleware
├── models/            → Mongoose schemas (User, Note)
├── routes/            → API route definitions
└── utils/             → Token generation
```

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | No | Create a new account |
| POST | `/api/auth/login` | No | Login and receive JWT |
| GET | `/api/notes` | Yes | Get all notes for logged-in user |
| POST | `/api/notes` | Yes | Create a new note |
| PUT | `/api/notes/:id` | Yes | Update a note (owner only) |
| DELETE | `/api/notes/:id` | Yes | Delete a note (owner only) |

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)

### Setup

```bash
# Clone the repo
git clone https://github.com/xDevanshu-Garg/Notes-App.git
cd Notes-App

# Backend
cd server
npm install
# Create .env with: PORT, MONGO_URI, JWT_SECRET
npm run dev

# Frontend (new terminal)
cd client
npm install
# Create .env with: VITE_API_URL=http://localhost:5000/api
npm run dev
```

## Author

**Devanshu Garg** — [GitHub](https://github.com/xDevanshu-Garg) · [LinkedIn](https://www.linkedin.com/in/devanshu-garg-ecaajmer/)