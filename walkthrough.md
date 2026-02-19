# Project Walkthrough: GoalTrack AI

## 🏗️ Structure
The project is built with a clean separation of concerns:
- **`app/models.py`**: Defines the `Task` entity with SQLite. Enforces rules like maximum progress (100%).
- **`app/routes.py`**: Contains public REST endpoints. Simple, predictable CRUD operations.
- **`frontend/src/pages/Dashboard.jsx`**: The heart of the app. Manages local state, handles API sync, and calculates the 30-day cycle statistics.

## 🤖 AI Usage & Guidance
- **Prompting Strategy**: Used `AI_GUIDANCE.md` to enforce a "Simple > Clever" coding style.
- **Verification**: AI was used to generate initial boilerplate, which was then manually refactored to remove complex Auth layers and optimize the tabular layout.
- **Debugging**: Utilized AI-driven diagnostics to trace 404 proxy errors and frontend rendering crashes.

## ⚠️ Risks & Extensions
- **Risks**: Currently data is stored in a local `goaltrack.db`. Loss of this file results in data loss.
- **Extensions**: 
  - **Auth**: The structure is ready to re-integrate Flask-JWT-Extended (which was removed for simplicity).
  - **AI Coach**: An OpenAI-powered "Coach Widget" can be added to the dashboard to analyze the current table and give advice.

## ✅ Verification
Behavior is verified through:
1. **Manual Flow**: Adding a task -> Logging days -> Checking Pie Chart sync.
2. **Endpoint Checks**: Direct testing of `/api/tasks/` to ensure 200/201 responses.
