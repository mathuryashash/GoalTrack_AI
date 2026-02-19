# Project Walkthrough: GoalTrack AI

## 🏗️ Technical Structure

### 1. Relational Data Model (`app/models.py`)
The system uses a highly optimized SQLite schema.
- **Attributes**: `id`, `title`, `priority` (1-5), `progress` (Float), `is_completed`.
- **Validation**: The backend enforces that `progress` never exceeds 100% and automatically triggers the `is_completed` flag when the goal is reached.

### 2. React Component Architecture
The **Dashboard** is a unified state-machine:
- **State Sync**: Uses `useEffect` hooks to synchronize with the Render API on mount.
- **Micro-animations**: Framer Motion handles the "entry" animations for table rows and the dynamic rotation of the SVG Pie Chart.
- **Responsive Logic**: The layout adapts to screen size while maintaining the glass panel aesthetics.

---

## 🤖 AI Usage & Guidance Framework

### Prompting Strategy
I used a **"Constraint-First"** prompting strategy. By defining `AI_GUIDANCE.md` before writing complex logic, I ensured the AI assistant (and any sub-agents) followed these rules:
- **Simple > Clever**: Avoid deep inheritance or complex patterns where a single function suffices.
- **Visual-First**: Prioritize premium UX/UI feedback in every code generation.

### AI Debugging & Optimization
- **Backend**: AI was used to script the CORS and Port-Binding fixes for Render.
- **Frontend**: AI generated the complex SVG path math for the progress pie chart based on CSS variables.

---

## ⚠️ Risks & Mitigation

### 1. Persistence on Free Tiers
**Risk**: On Render's free tier, the SQLite file might be reset if the instance is redeployed.
**Mitigation**: The system is designed to be easily migrated to **PostgreSQL**. The `requirements.txt` already includes `psycopg2-binary` for a professional database handshake.

### 2. Startup Latency
**Risk**: Render "spins down" after inactivity.
**Mitigation**: I added a "Loading" state indicator in the frontend code to manage user expectations during the 50-second "wake-up" period of the free server.

---

## 🔮 Extension Approach: The "AI Coach"
The project is architected for immediate expansion into an **AI Coaching Dashboard**:
1. **Endpoint**: Create a `/tasks/analyze` route.
2. **Logic**: Send the current task list JSON to OpenAI (using the existing `openai` library in `requirements.txt`).
3. **UI**: Display the coach’s recommendation in a new glass panel above the task list.

---

## ✅ Final Verification Method
1. **API Integrity**: verified via `https://goaltrack-ai.onrender.com/tasks/` returning raw JSON.
2. **Frontend Sync**: verified by adding a goal on the Vercel site and seeing it reflected in the Render database immediately.
