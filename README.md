# GoalTrack AI - 30-Day Productivity Dashboard

A professional, high-performance goal tracking application featuring a 30-day productivity cycle, real-time progress visualization, and a clean Glassmorphism UI.

### 🔗 Live Links
- **Frontend (Vercel)**: [https://goal-track-ai.vercel.app](https://goal-track-ai.vercel.app)
- **Backend (Render)**: [https://goaltrack-ai.onrender.com](https://goaltrack-ai.onrender.com)

---

## 🚀 Tech Stack
- **Frontend**: React 18 (Vite) + Framer Motion (Animations) + Axios (API)
- **Backend**: Python 3.11 + Flask (RESTful Engine)
- **Database**: SQLite (Relational) with SQLAlchemy ORM
- **Hosting**: Hybrid Deployment (Vercel + Render)

---

## 💡 Key Technical Decisions

### 1. Hybrid Frontend/Backend Split
To maximize performance and reliability, I chose **Vercel** for the React frontend (fast static delivery) and **Render** for the Flask backend (persistent SQLite support). This separation ensures the UI is always snappy while keeping the data engine robust.

### 2. 30-Day Productivity Logic
Instead of generic "0-100" progress, the system is modeled on a **30-day cycle**. Each "+Day" click adds exactly **3.33%** progress. This psychological nudge encourages daily consistency and makes long-term goals feel like a series of small, manageable steps.

### 3. Glassmorphism Design System
I avoided heavy UI libraries like Bootstrap or Tailwind to maintain full control over the aesthetics. Using **pure CSS variables** and **backdrop-filters**, I implemented a high-end "Glassmorphism" theme that looks premium with zero performance bloat.

### 4. CORS & Security
In production, the backend is configured with **Flask-CORS** to specifically allow requests from the Vercel domain, ensuring secure cross-origin communication while maintaining a seamless user experience.

---

## 📂 Project Structure
```text
/app
  ├── models.py      # SQLite Schema (SQLAlchemy)
  ├── routes.py      # RESTful API Endpoints
  └── __init__.py    # App Factory & CORS Config
/frontend
  ├── src/pages/     # React Dashboard Logic
  ├── src/index.css  # Global Glassmorphism Styles
  └── vercel.json    # Frontend Routing Rules
run.py               # Backend Entry Point
Procfile             # Render Deployment Script
walkthrough.md       # Detailed Product Analysis
AI_GUIDANCE.md       # AI Prompting & Training Rules
```

---

## 🛠️ Local Setup
1. Clone the repository.
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   cd frontend && npm install
   ```
3. Run the development environment:
   ```bash
   # From root folder
   start_dev.bat
   ```
4. Dashboard will be available at `http://localhost:5173`.
