# 🚀 Skillora AI - Career Intelligence & Skill Gap Analysis Platform

> **"Discover Your Skill Gaps. Build Your Future."**

Skillora AI is an advanced, production-oriented web platform that bridges the gap between student/job-seeker technical competencies and industry career requirements. By combining in-memory PDF resume text extraction, transparent deterministic skill-gap scoring, dynamic 8-week learning roadmaps, and configurable AI career intelligence (with automated rule-based fallback), Skillora AI empowers learners to take charge of their tech careers.

---

## 🌟 Key Highlights & Engineering Features

- **Transparent Deterministic Scoring Engine**: Core skills carry $1.2\times$ weight, Recommended carry $0.8\times$, and Optional carry $0.5\times$. Exact scores and explanations are documented—no black-box guesswork.
- **In-Memory Resume Parser**: Upload standard PDF resumes to extract technical competencies in milliseconds. Files are processed entirely in an ephemeral buffer and never retained on disk. Clear fallbacks for scanned documents.
- **Configurable AI Provider with Graceful Fallback**: Native support for Google Gemini API and OpenAI. When no API key is provided, the platform switches seamlessly to a comprehensive rule-based intelligence engine with clear labeling.
- **Dynamic 8-Week Learning Roadmaps**: Automatically synthesizes missing skills into progressive weekly goals, real documentation resources, and deployable mini-projects with interactive checkboxes.
- **Live Progress & Milestone Telemetry**: Tracks real-time task completions, milestone badges with celebratory animations, and weekly distribution charts.
- **Auditable Reports & PDF Downloads**: Instant export of high-resolution PDF skill gap reports via `jsPDF` and `html2canvas`.
- **Pre-Seeded 8 Core Tech Roles**: Full Stack Developer, Frontend Developer, Backend Developer, AI/ML Engineer, Data Analyst, Python Developer, Cybersecurity Analyst, and UI/UX Designer.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS with custom SaaS dark-palette design system
- **Routing**: React Router DOM v6
- **Icons**: Lucide React
- **Analytics & Visualizations**: Recharts (Radar, Bar, Pie charts)
- **API Client**: Axios with request/response interceptors & token expiration handling
- **Document Export & FX**: `jspdf`, `html2canvas`, `canvas-confetti`

### Backend
- **Runtime**: Node.js v18+ (tested on Node v25)
- **Framework**: Express.js REST API
- **Authentication**: JWT (JSON Web Tokens) with 7-day expiration
- **Password Security**: bcryptjs (10 salt rounds)
- **File Uploads**: Multer memory storage (5MB max limit, PDF MIME verification)
- **PDF Extraction**: `pdf-parse` combined with direct stream token fallback
- **Security Middleware**: Helmet headers, CORS policy, express-rate-limit

### Database
- **ODM**: Mongoose
- **Production Target**: MongoDB Atlas (Free Tier)
- **Development Fallback**: Automatic `mongodb-memory-server` fallback for zero-configuration testing

### AI Providers
- **Primary**: Google Gemini API (`gemini-1.5-flash`)
- **Alternative**: OpenAI API (`gpt-4o-mini`)
- **Fallback**: Built-in deterministic Rule-Based Career Intelligence Engine

---

## 📁 Repository Structure

```
Skillora AI/
├── backend/
│   ├── config/
│   │   ├── db.js                 # Dual-mode DB connection (Atlas / Memory fallback)
│   │   └── seedData.js           # Pre-seeded catalog of 8 career benchmarks
│   ├── controllers/
│   │   ├── authController.js     # User registration, login, getMe
│   │   ├── roleController.js     # Career role listings and details
│   │   ├── resumeController.js   # In-memory PDF resume analysis
│   │   ├── analysisController.js # Deterministic skill gap calculation
│   │   ├── aiController.js       # AI Advisor & Rule-based recommendations
│   │   ├── roadmapController.js  # Roadmap generation & task toggle
│   │   ├── userController.js     # Profile management & account deletion
│   │   └── reportController.js   # Aggregated report compilation
│   ├── middleware/
│   │   ├── auth.js               # JWT protection middleware
│   │   ├── upload.js             # Multer in-memory PDF filter
│   │   └── errorHandler.js       # Centralized error handler
│   ├── models/
│   │   ├── User.js               # User profile & skills schema
│   │   ├── CareerRole.js         # Benchmark requirements & project specs
│   │   ├── SkillAnalysis.js      # Match scores & gap inventory
│   │   └── LearningRoadmap.js    # Weekly progression & task status
│   ├── routes/                   # Express REST route definitions
│   ├── services/
│   │   ├── skillGapService.js    # Deterministic weighted scoring algorithm
│   │   ├── aiService.js          # Gemini/OpenAI adapter & rule-based advisor
│   │   ├── resumeParserService.js# Dual-strategy text extractor & skill mapper
│   │   └── roadmapGeneratorService.js # 8-week structured planner
│   ├── server.js                 # Express entrypoint
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/           # Navbar, Footer, Button, Card, Badge, ProgressBar
│   │   │   ├── charts/           # SkillRadarChart, SkillBarChart, ProgressPieChart
│   │   │   └── ProtectedRoute.jsx# Auth route guard
│   │   ├── context/              # AuthContext & ToastContext
│   │   ├── layouts/              # MainLayout & DashboardLayout
│   │   ├── pages/                # All 11 platform pages
│   │   ├── services/             # Axios API service clients
│   │   ├── App.jsx               # Route tree
│   │   ├── main.jsx              # App root bootstrap
│   │   └── index.css             # Tailwind theme & utilities
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
├── .env.example
├── README.md
└── package.json
```

---

## ⚡ Quick Start & Local Setup

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### 2. Clone and Install Dependencies
From the repository root directory:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Environment Variables
Create a `.env` file in the `backend/` directory (or copy from `.env.example`):
```bash
cp .env.example backend/.env
```

Default recommended local values:
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
JWT_SECRET=skillora_dev_jwt_secret_key_987654321_secure
JWT_EXPIRES_IN=7d

# Optional Database (leave blank to use embedded in-memory MongoDB):
MONGODB_URI=

# Optional AI Key (leave blank to use Rule-Based Intelligence Mode):
AI_PROVIDER=none
GEMINI_API_KEY=
```

### 4. Running the Application

Open two terminal sessions:

**Terminal 1 (Backend API):**
```bash
cd backend
npm run dev
# Starts server at http://localhost:5000 with auto-seeding
```

**Terminal 2 (Frontend Client):**
```bash
cd frontend
npm run dev
# Launches Vite dev server at http://localhost:5173
```

Navigate to `http://localhost:5173` in your browser.

---

## 🧪 Quick Test / Demo Accounts

For instant evaluation, you can:
1. Register a new account with your own target role and study hours.
2. Or on the `/login` page, click the **"Autofill Sample Demo Account"** button to immediately explore pre-configured data.
3. Test PDF resume parsing using any standard text PDF resume or the generated `sample_resume.pdf` in the root folder.

---

## 📡 REST API Reference

| Method | Endpoint | Description | Protected |
|---|---|---|---|
| `GET` | `/api/health` | Service health status | No |
| `POST` | `/api/auth/register` | Register new learner account | No |
| `POST` | `/api/auth/login` | Login and obtain JWT token | No |
| `GET` | `/api/auth/me` | Current authenticated user session | Yes |
| `GET` | `/api/roles` | Retrieve all 8 career role benchmarks | No |
| `GET` | `/api/roles/:id` | Detailed role requirements & projects | No |
| `POST` | `/api/resume/analyze` | In-memory PDF upload & skill parsing | Yes |
| `POST` | `/api/analysis` | Run deterministic skill gap analysis | Yes |
| `GET` | `/api/analysis` | Fetch user's analysis history | Yes |
| `GET` | `/api/analysis/:id` | Fetch specific analysis record | Yes |
| `GET` | `/api/ai/status` | Current AI provider status (Live / Rule-based) | No |
| `POST` | `/api/ai/recommendations` | Generate strategic career advice & portfolio | Yes |
| `POST` | `/api/roadmaps` | Generate 8-week structured roadmap | Yes |
| `GET` | `/api/roadmaps` | Fetch user roadmaps | Yes |
| `PATCH` | `/api/roadmaps/:id/tasks/:taskId` | Toggle task completion & update telemetry | Yes |
| `GET` | `/api/users/profile` | Get user profile & skills inventory | Yes |
| `PATCH` | `/api/users/profile` | Update profile, target role & study hours | Yes |
| `DELETE` | `/api/users/account` | Permanently wipe account & all records | Yes |
| `GET` | `/api/reports/:analysisId` | Aggregated report for PDF export | Yes |

---

## ☁️ Free-Tier Deployment Guide

### Frontend Deployment (Vercel)
1. Push repository to GitHub.
2. In Vercel, import the repository and set **Root Directory** to `frontend`.
3. Set Build Command to `npm run build` and Output Directory to `dist`.
4. Add environment variable:
   - `VITE_API_URL`: Your deployed backend URL (e.g. `https://skillora-api.onrender.com`).
5. Deploy.

### Backend Deployment (Render / Railway)
1. Create a **New Web Service** connected to your GitHub repository.
2. Set **Root Directory** to `backend`.
3. Build Command: `npm install`.
4. Start Command: `node server.js`.
5. Configure Environment Variables in Render:
   - `NODE_ENV`: `production`
   - `PORT`: `10000`
   - `CLIENT_URL`: `https://your-frontend.vercel.app`
   - `MONGODB_URI`: Your MongoDB Atlas connection string (`mongodb+srv://...`)
   - `JWT_SECRET`: Random 32+ character secret
   - `AI_PROVIDER`: `gemini` (optional)
   - `GEMINI_API_KEY`: Your Gemini API key (optional)

### Database Setup (MongoDB Atlas Free M0 Tier)
1. Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a database user with read/write credentials.
3. In Network Access, allow IP `0.0.0.0/0` (standard for serverless/Render hosting).
4. Copy connection string into `MONGODB_URI`.
5. On the very first server launch, `db.js` will automatically seed all 8 career roles into your database!

---

## 🔒 Security & Data Integrity

- Passwords hashed using `bcryptjs` with salt work factor of 10.
- All protected endpoints strictly verify JWT Bearer tokens and match record ownership to `req.user._id`.
- Resumes are validated for PDF MIME type, limited to 5MB, processed in ephemeral memory buffers, and never saved to persistent disk.
- Centralized error handler prevents leakage of server traces, database internals, or API keys.

---

## 📄 License
This project is licensed under the MIT License. Built for engineering portfolios, academic demonstrations, and career enablement.
