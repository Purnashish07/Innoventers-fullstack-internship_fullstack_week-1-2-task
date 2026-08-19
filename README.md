# Full Stack Week 1-2 Complete Project
Tech: React (Vite) + Node + Express + MongoDB + JWT + bcrypt + RBAC

## Setup
### Backend
cd backend
npm install
.env me MONGO_URI set karo
npm run dev -> http://localhost:5000

### Frontend
cd frontend
npm install
npm run dev -> http://localhost:5173

## Roles
- user: can access /dashboard
- admin: can access /dashboard + /admin

## API Endpoints
POST /api/auth/register
POST /api/auth/login
GET /api/auth/me
GET /api/auth/user-dashboard (protected)
GET /api/auth/admin-dashboard (admin only)
