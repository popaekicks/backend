# Task Manager Project - PostgreSQL & Render Migration

This project has been migrated from a local SQLite database to a production-ready **PostgreSQL** database and is configured for automated deployment on **Render**.

## 🚀 What was Changed?

### 1. Database Migration (SQLite ➡️ PostgreSQL)
- **Driver Change:** Replaced `better-sqlite3` with the `pg` (node-postgres) client.
- **Asynchronous Logic:** Updated all backend routes (`auth.js` and `task.js`) to use `async/await` since PostgreSQL queries are non-blocking.
- **Data Types:**
  - `completed` changed from `INTEGER` (0/1) to `BOOLEAN` (true/false).
  - `id` changed from `AUTOINCREMENT` to `SERIAL PRIMARY KEY`.
  - `created_at` uses `TIMESTAMP` instead of `DATETIME`.
- **SSL Support:** Added SSL configuration in `backend/database.js` to allow secure connections to cloud databases like Render.

### 2. Frontend Updates
- **State Handling:** Updated the React frontend (`TaskList.jsx`) to handle the new boolean `completed` status correctly.
- **API URL Strategy:** Configured the app to use relative paths (`/api/...`), which are handled by proxying in development and rewrites in production.

### 3. Repository Restructuring
- **Unified Repo:** The project was unified into a single Git repository at the root level. This allows Render to see both the `backend` and `frontend` folders simultaneously.

---

## 🛠️ Local Development Setup

### 1. Prerequisites
- Install [PostgreSQL](https://www.postgresql.org/download/) locally or run it via Docker:
  ```bash
  docker run --name task-db -e POSTGRES_PASSWORD=password -e POSTGRES_DB=taskmanager -p 5432:5432 -d postgres
  ```

### 2. Environment Variables
Create or update `backend/.env`:
```env
PORT=5000
JWT_SECRET=your_secret_key
PGUSER=postgres
PGHOST=localhost
PGPASSWORD=your_password
PGDATABASE=taskmanager
PGPORT=5432
```

### 3. Installation
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install
```

### 4. Running the App
- **Backend:** `npm run dev` (inside `backend` folder)
- **Frontend:** `npm run dev` (in root folder)

---

## ☁️ Deployment to Render

The project uses a **Render Blueprint** (`render.yaml`) to automate the setup of three services:

1.  **PostgreSQL Database:** A managed database instance.
2.  **Backend (Node.js):** 
    - Automatically connects to the database via `DATABASE_URL`.
    - Handles authentication and task management.
3.  **Frontend (Static Site):**
    - Builds the React app using Vite.
    - **Rewrite Rule:** Automatically forwards any request starting with `/api` to the backend service to prevent CORS issues.
    - **SPA Fallback:** Redirects all routes to `index.html` to support React Router on page refresh.

### To Deploy:
1. Push your code to GitHub.
2. Go to [Render Dashboard](https://dashboard.render.com/).
3. Click **New +** -> **Blueprint**.
4. Select your repository and click **Apply**.

---

## 📂 Project Structure
```text
├── backend/
│   ├── database.js      # PostgreSQL connection & schema init
│   ├── server.js        # Express server setup
│   └── routes/          # API endpoints (Auth & Tasks)
├── src/                 # React Frontend
│   ├── pages/           # App pages (Login, List, Add)
│   └── components/      # UI components (Navbar)
├── render.yaml          # Deployment blueprint
└── package.json         # Frontend & Root scripts
```

## ⚠️ Important Notes
- **Free Tier Sleep:** On Render's free tier, the backend will "spin down" after 15 minutes of inactivity. The first request after a break may take ~1 minute to respond.
- **DB Expiration:** Free Render PostgreSQL databases expire after **30 days**. Be sure to back up data if needed!
