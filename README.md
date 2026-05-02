# 📝 Tasks — MERN To-Do App

A full-stack **To-Do List** application built with the **MERN stack** (MongoDB, Express, React, Node.js). It features a clean orange-gradient UI, modal-based editing, filtering, due dates, and categories — backed by a REST API with full CRUD support.

---

## ✨ Features

- ✅ Create, read, update, and delete tasks
- 🏷️ Optional **category** and **due date** per task
- 🚫 Guard against re-completing already-completed tasks
- 🔔 Toast notifications for success and error states
- 📦 Persistent storage in **MongoDB**

---

## 🧱 Tech Stack

| Layer       | Tech                                       |
|-------------|--------------------------------------------|
| Frontend    | React (Vite), Plain CSS, Axios             |
| Backend     | Node.js, Express.js                        |
| Database    | MongoDB + Mongoose ODM                     |
| Validation  | Zod (frontend) / Mongoose schema (backend) |
| Dev Tools   | Nodemon, dotenv, CORS                      |

---

## 📁 Project Structure

```
mern-tasks/
├── backend/
│   ├── models/
│   │   └── Task.js
│   ├── routes/
│   │   └── tasks.js
│   ├── server.js
│   └── .env
└── frontend/
    ├── src/
    │   ├── components/
    │   │   └── Modal.jsx
    │   ├── App.jsx
    │   ├── App.css
    │   ├── index.css
    │   └── main.jsx
    └── .env
```

---

## ⚙️ Environment Variables

### `backend/.env`
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/tasksdb
CLIENT_URL=http://localhost:5173
```

### `frontend/.env`
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🚀 Getting Started\

### Prerequisite installed
```bash
Node.js installed
MongoDB running locally or have a MongoDB Atlas URI ready

database name: todoapp
collections: tasks

### 1. Clone the repo
```bash
git clone https://github.com/your-username/mern-tasks.git
cd mern-tasks
```

### 2. Install dependencies
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 3. Run the apps
```bash
# Terminal 1 — backend
cd backend
npm run dev   # runs on http://localhost:5000

# Terminal 2 — frontend
cd frontend
npm run dev   # runs on http://localhost:5173
```

---

## 🔌 API Endpoints

Base URL: `http://localhost:5000/api`

| Method   | Endpoint           | Description                      | Body / Params |
|----------|--------------------|----------------------------------|---------------|
| `GET`    | `/tasks`           | Get all tasks                    | —             |
| `GET`    | `/tasks/:id`       | Get a single task by ID          | URL param `id` |
| `POST`   | `/tasks`           | Create a new task                | JSON body (see below) |
| `PUT`    | `/tasks/:id`       | Update an existing task          | JSON body (partial allowed) |
| `PATCH`  | `/tasks/:id/toggle`| Toggle task completion           | —             |
| `DELETE` | `/tasks/:id`       | Delete a task                    | URL param `id` |

### 📥 Request body (POST / PUT)
```json
{
  "title": "Finish README",
  "description": "Document API and usage",
  "category": "Work",
  "due_date": "2026-05-10T00:00:00.000Z",
  "completed": false
}
```

### 📤 Sample response
```json
{
  "_id": "6634a1b2c8d3e9f1a2b3c4d5",
  "title": "Finish README",
  "description": "Document API and usage",
  "category": "Work",
  "due_date": "2026-05-10T00:00:00.000Z",
  "completed": false,
  "createdAt": "2026-05-02T10:25:30.000Z",
  "updatedAt": "2026-05-02T10:25:30.000Z"
}
```

### ⚠️ Error response
```json
{ "error": "Title is required" }
```

---

## 🗃️ Data Model — `Task`

| Field         | Type      | Required | Notes                                |
|---------------|-----------|----------|--------------------------------------|
| `title`       | String    | ✅       | Min 1, max 120 characters            |
| `description` | String    | ❌       | Max 2000 characters                  |
| `category`    | String    | ❌       | Max 40 characters                    |
| `due_date`    | Date      | ❌       | ISO 8601 timestamp                   |
| `completed`   | Boolean   | ❌       | Defaults to `false`                  |
| `createdAt`   | Date      | auto     | Set by Mongoose timestamps           |
| `updatedAt`   | Date      | auto     | Updated automatically on changes     |

---

## 🖱️ How to Use the App

1. **Add a task** — type a title (required) in the form at the top. Optionally add a description, category, and due date, then click **Add task**.
2. **View tasks** — all tasks appear below the form, sorted by status and creation date.
4. **Complete a task** — click the checkbox. Re-completing an already-completed task is blocked with a friendly toast.
5. **Edit a task** — hover and click the edit icon. The current values will be pre-filled and u can edit it.
6. **Delete a task** — hover and click the delete icon.

---

## 🧪 Test the API with cURL

```bash
# Create
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Test task","category":"Personal"}'

# Get all
curl http://localhost:5000/api/tasks

# Toggle completion
curl -X PATCH http://localhost:5000/api/tasks/<id>/toggle

# Delete
curl -X DELETE http://localhost:5000/api/tasks/<id>
```

---

## 🛠️ Scripts

### Backend (`backend/package.json`)
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

### Frontend (`frontend/package.json`)
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

---

## 📄 License

MIT — free to use, modify, and distribute.
