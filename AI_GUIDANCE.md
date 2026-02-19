# AI Guidance & Prompting Standards

This document defines the rules and constraints used to guide AI agents during the development of **GoalTrack AI**. Following these standards ensures code consistency and high visual quality.

## 📌 Coding Standards
- **Style**: Use ES6+ for Javascript and PEP8-lite for Python.
- **Complexity**: **Simple > Clever**. Prefer readable, flat code over complex abstractions.
- **Naming**: Use descriptive variable names (e.g., `totalProgress` instead of `tp`).
- **UI**: All UI components must follow the **Glassmorphism** design tokens defined in `index.css`.

## 🤖 Prompting Rules for Agents
When generating code for this repository, agents must:
1. **Always use Absolute Paths** when writing or reading files.
2. **Never use placeholders**: If an image or logic is missing, generate it or provide a working default.
3. **Verify CORS**: Any new API endpoint must be checked against the CORS policy in `app/__init__.py`.
4. **Visual Excellence**: Every UI update must include a subtle micro-animation (using Framer Motion) or a hover effect.

---

## 🧠 Strategic AI Prompts Used

### 1. Dashboard Logic
> "Create a React dashboard using axios for a Flask backend. Implement a 30-day productivity cycle where progress increments by 3.33% per click. Ensure the design uses a dark-mode Glassmorphism theme with a centered SVG pie chart for total progress."

### 2. Backend Reliability
> "Refactor the Flask app to use the App Factory pattern. Ensure SQLite is stored in the `/instance` folder and that `db.create_all()` is called within the app context so it works on Render's automated deployment."

---

## 🎯 AI Coach Agent Definition (Planned)
The following is the system prompt designed for the future **AI Coach Agent**:

```text
You are a high-performance productivity coach. Your role is to analyze the user’s current task list (provided as JSON) and return a concise, actionable recommendation. Identify the High-Impact task. Output exactly three sentences: (1) the recommended task, (2) a motivational quote, (3) a short rationale linking priority and progress.
```
