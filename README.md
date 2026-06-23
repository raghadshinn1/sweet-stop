# 🍰 Sweet Stop — Full Stack

Complete dessert shop website with React frontend + Node.js backend.

## 📁 Project Structure

```
sweet-stop/
├── frontend/          ← React + TypeScript + Vite
│   ├── src/
│   │   ├── api/     ← Ready for backend connection
│   │   ├── components/
│   │   ├── pages/
│   │   └── ...
│   └── package.json
│
├── backend/           ← Node.js + Express + MongoDB
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── ...
│   └── package.json
│
├── package.json       ← Root scripts (run both)
└── .gitignore
```

## 🚀 Quick Start

### Step 1: Install everything
```bash
cd sweet-stop
npm run install:all
```

### Step 2: Setup environment variables

**Backend** (`backend/.env`):
```env
PORT=3001
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
EMAIL_USER=...
EMAIL_PASS=...
CLIENT_URL=http://localhost:5174
```

**Frontend** (`frontend/.env`):
```env
VITE_API_URL=http://localhost:3001/api
```

### Step 3: Seed the database
```bash
cd backend
npm run seed
```

### Step 4: Run both (from root)
```bash
cd sweet-stop
npm run dev
```

This starts:
- Backend: http://localhost:3001
- Frontend: http://localhost:5174

## 📋 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run install:all` | Install deps for both frontend & backend |
| `npm run dev` | Run both frontend and backend together |
| `npm run dev:frontend` | Run frontend only |
| `npm run dev:backend` | Run backend only |
| `npm run build` | Build frontend for production |
| `npm run seed` | Seed database with sample data |
| `npm run start` | Start backend in production mode |

## 🛠 Tech Stack

**Frontend:**
- React 18 + TypeScript
- Vite
- React Router DOM
- Axios
- Lucide React (icons)

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Stripe Payments
- Cloudinary (images)
- Nodemailer (emails)

---
Made with ♡ for Sweet Stop
