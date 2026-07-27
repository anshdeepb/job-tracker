# Job Application Tracker

A full-stack app to track job applications — company, role, status, and notes —
built to manage my own job search and to practice building a complete
React + TypeScript frontend backed by a FastAPI + MySQL API.

## Features

- Add, view/edit, and delete job applications
- Filter applications by status (applied / interviewing / offer / rejected)
- Live stats dashboard: total applications, interviews in progress, offers, response rate
- Click any row to view full details (company, role, job URL, notes) and update status
- Data persists across sessions via a MySQL database

## Tech stack

**Frontend:** React, TypeScript, Vite, Tailwind CSS, shadcn/ui
**Backend:** FastAPI, SQLAlchemy, Pydantic
**Database:** MySQL (run locally via Docker)

## Architecture

A React + TypeScript frontend communicates with a FastAPI backend over a REST API (JSON), which talks to a MySQL database through SQLAlchemy. The frontend owns all UI state and calls the backend via `fetch`, centralized in `lib/api.ts`. The backend validates requests/responses with Pydantic schemas and performs all CRUD operations against a single `applications` table.

## API endpoints

| Method | Path                    | Description                          |
|--------|-------------------------|---------------------------------------|
| GET    | `/applications`         | Return all applications               |
| POST   | `/applications`         | Create a new application               |
| PATCH  | `/applications/{id}`    | Update an existing application          |
| DELETE | `/applications/{id}`    | Delete an application                  |

Interactive API docs (Swagger UI) are available at `/docs` when the backend is running.

## Database schema

**`applications`**

| Column        | Type    | Notes                                      |
|---------------|---------|---------------------------------------------|
| id            | int     | Primary key, auto-increment                  |
| company       | string  |                                               |
| role          | string  |                                               |
| status        | string  | One of: applied, interviewing, offer, rejected |
| dateApplied   | string  | Stored as `YYYY-MM-DD`                        |
| url           | string  | Optional                                      |
| notes         | string  | Optional                                      |

## Running locally

### 1. Start MySQL (via Docker)

```bash
docker run --name job-tracker-mysql \
  -e MYSQL_ROOT_PASSWORD=pass \
  -e MYSQL_DATABASE=job_tracker \
  -p 3306:3306 \
  -d mysql:8
```

If the container already exists from a previous run:
```bash
docker start job-tracker-mysql
```

### 2. Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn routes.applications:app --reload
```
Runs at `http://localhost:8000` — API docs at `http://localhost:8000/docs`

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```
Runs at `http://localhost:5173`

## Project structure

```
job-tracker/
├── frontend/
│   └── src/
│       ├── components/       # UI components (Header, StatsBar, ApplicationsTable, dialogs, etc.)
│       │   └── ui/            # shadcn/ui primitives
│       ├── lib/
│       │   ├── api.ts         # centralized fetch calls to the backend
│       │   └── utils.ts
│       ├── types/
│       │   └── application.ts # shared Application interface
│       └── App.tsx            # owns app state, wires everything together
│
└── backend/
    ├── db.py                  # database engine + session setup
    ├── models.py               # SQLAlchemy Applications table
    ├── schemas.py               # Pydantic request/response schemas
    └── routes/
        └── applications.py     # FastAPI app + all CRUD endpoints
```

## What I'd add next

- [ ] Kanban-style drag-and-drop between statuses
- [ ] Charts of applications submitted over time
- [ ] Sort applications by date applied
- [ ] Auth, if this ever became multi-user
- [ ] Deploy (Vercel for frontend, Render/Railway for backend + managed MySQL/Postgres)

## Notes

Built from scratch to learn full-stack development end to end — React component architecture and state management, TypeScript, REST API design with FastAPI, and relational data modeling with SQLAlchemy and MySQL.