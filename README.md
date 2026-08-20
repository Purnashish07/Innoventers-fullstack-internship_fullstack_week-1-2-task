# Full Stack Week 1-2 Complete Project
Tech: React (Vite) + Node + Express + MongoDB + JWT + bcrypt + RBAC

🚀 Live Demo
[View Website]https://temporary-sonic-argon-47g8eg9.vercel.app/login

## Roles
- user: can access /dashboard
- admin: can access /dashboard + /admin

## API Endpoints
POST /api/auth/register
POST /api/auth/login
GET /api/auth/me
GET /api/auth/user-dashboard (protected)
GET /api/auth/admin-dashboard (admin only)
