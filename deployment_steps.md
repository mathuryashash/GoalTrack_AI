# Hosting Instructions

## 1. Backend (Render.com)
1. Create a **New Web Service** on Render.
2. Connect your GitHub repo.
3. Use these settings:
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn run:app`
4. Copy the URL Render gives you (e.g., `https://goaltrack-api.onrender.com`).

## 2. Connect Frontend to Backend
1. In your code, open `frontend/src/pages/Dashboard.jsx`.
2. Update the `API_BASE` variable:
   ```javascript
   const API_BASE = import.meta.env.PROD 
     ? 'https://your-backend-url.onrender.com/api' // <-- Paste your Render URL here
     : '/api';
   ```
3. `git add`, `git commit`, and `git push` your changes.

## 3. Frontend (Vercel.com)
1. Go to Vercel and **Add New Project**.
2. Select your repository.
3. **Crucial**: Set the **Root Directory** to `frontend`.
4. Vercel will auto-detect Vite. Click **Deploy**.
5. Your site is live!
