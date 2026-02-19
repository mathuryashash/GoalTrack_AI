# GoalTrack AI - Simplified Productivity Tracker

A streamlined, single-user goal tracking application built with a focus on simplicity, readability, and immediate productivity.

## 🚀 Tech Stack
- **Frontend**: React (Vite) + Framer Motion for animations.
- **Backend**: Python + Flask (RESTful API).
- **Database**: SQLite (Relational).

## 💡 Key Technical Decisions
1. **Simplified Architecture**: Transitioned from a multi-user JWT-authenticated system to a single-user local tracker. This choice was made to reduce system complexity, eliminate database migration overhead, and focus on the core "filling in" user experience.
2. **Glassmorphism UI**: Used a custom CSS design system rather than heavy UI libraries to demonstrate control over styling and premium aesthetics with zero bloat.
3. **Decoupled Frontend/Backend**: Strict separation between the React frontend and Flask API, communicating via a Vite proxy.
4. **Progress Increment System**: Implemented a "Day Log" system (3.3% increments) to model a 30-day productivity cycle, making long-term goals feel manageable.

## 📂 Structure
- `/app`: Backend logic (Flask app, models, and routes).
- `/frontend`: React application.
- `/tests`: Automated test suite.
- `AI_GUIDANCE.md`: Philosophy and rules used to guide the development.

## 🛠️ Setup
1. Run `start_dev.bat` to launch both servers.
2. Visit `http://localhost:5173`.
