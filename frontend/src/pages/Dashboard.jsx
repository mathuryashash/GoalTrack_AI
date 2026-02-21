import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus, Target, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

// Dynamically set API URL
const API_BASE = import.meta.env.PROD
    ? 'https://goaltrack-ai.onrender.com'
    : '/api';

axios.defaults.baseURL = API_BASE;

// Set Axios timeout to 15 seconds to allow for backend cold start
axios.defaults.timeout = 15000;

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState(3);
    const [isWaking, setIsWaking] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchTasks = async (showWaking = false) => {
        if (showWaking) setIsWaking(true);
        setLoading(true);
        try {
            const res = await axios.get('/tasks/');
            setTasks(res.data);
            setIsWaking(false);
        } catch (err) {
            console.error("Fetch failed", err);
            if (err.code === 'ECONNABORTED' || err.message.includes('Network Error')) {
                setIsWaking(true);
                // Silently retry once after 5 seconds if it looks like a cold start
                setTimeout(() => fetchTasks(), 5000);
            } else {
                alert("Failed to fetch tasks: " + err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks(true);
    }, []);

    const addTask = async (e) => {
        e.preventDefault();
        if (!title) return;
        setLoading(true);
        try {
            await axios.post('/tasks/', { title, priority });
            setTitle('');
            fetchTasks();
        } catch (err) {
            console.error("Add failed", err);
            const errorMsg = err.response?.data?.message || err.message;
            if (err.code === 'ECONNABORTED' || err.message.includes('Network Error')) {
                alert("Server is still waking up. Please wait a few seconds and try again.");
                setIsWaking(true);
            } else {
                alert("Failed to add goal. Error: " + errorMsg);
            }
        } finally {
            setLoading(false);
        }
    };

    const updateProgress = async (id, currentProgress, delta) => {
        // Spans 30 days, so each step is 100/30 ~ 3.33
        const newProgress = Math.min(100, Math.max(0, currentProgress + delta));
        await axios.put(`/tasks/${id}`, { progress: parseFloat(newProgress.toFixed(1)) });
        fetchTasks();
    };

    const deleteTask = async (id) => {
        await axios.delete(`/tasks/${id}`);
        fetchTasks();
    };

    const getProgressColor = (percent) => {
        if (percent >= 100) return 'var(--accent-success)';
        if (percent >= 50) return 'var(--accent-warning)';
        return 'var(--accent-danger)';
    };

    const getStatus = (percent) => {
        if (percent >= 100) return 'Completed';
        if (percent > 0) return 'In Progress';
        return 'Not Started';
    };

    // Global Statistics
    const totalProgress = tasks.length > 0
        ? tasks.reduce((acc, task) => acc + task.progress, 0) / tasks.length
        : 0;

    const dayCounter = Math.floor((totalProgress / 100) * 30);

    return (
        <div className="container" style={{ maxWidth: '1000px' }}>
            <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <div className="pie-container">
                        <svg width="120" height="120" viewBox="0 0 120 120">
                            <circle
                                cx="60" cy="60" r="54"
                                fill="transparent"
                                stroke="rgba(255,255,255,0.05)"
                                strokeWidth="8"
                            />
                            <motion.circle
                                cx="60" cy="60" r="54"
                                fill="transparent"
                                stroke="var(--primary)"
                                strokeWidth="8"
                                strokeDasharray="339.29"
                                initial={{ strokeDashoffset: 339.29 }}
                                animate={{ strokeDashoffset: 339.29 - (339.29 * totalProgress) / 100 }}
                                strokeLinecap="round"
                                transform="rotate(-90 60 60)"
                            />
                        </svg>
                        <div className="pie-center">
                            <span style={{ fontSize: '1.25rem', fontWeight: 800 }}>{Math.round(totalProgress)}%</span>
                            <span style={{ fontSize: '0.6rem', color: 'var(--secondary)' }}>TOTAL</span>
                        </div>
                    </div>
                    <div>
                        <h1 style={{ fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem', margin: 0 }}>
                            GoalTracker
                        </h1>
                        <p style={{ color: 'var(--secondary)', margin: '0.2rem 0 0 0' }}>30-Day Productivity Cycle.</p>
                    </div>
                </div>
                <div className="glass-panel" style={{ padding: '1rem', textAlign: 'center' }}>
                    <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>
                        Day {dayCounter} / 30
                    </span>
                </div>
            </header>

            {/* Quick Add Form */}
            <motion.div
                className="glass-panel"
                style={{ padding: '1.5rem', marginBottom: '2.5rem' }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <form onSubmit={addTask} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ flex: 1 }}>
                        <label style={{ fontSize: '0.75rem', color: 'var(--secondary)', marginBottom: '0.4rem', display: 'block' }}>GOAL NAME</label>
                        <input
                            className="glass-input"
                            placeholder="e.g., Coding and developing"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            disabled={loading}
                        />
                    </div>
                    <div style={{ width: '150px' }}>
                        <label style={{ fontSize: '0.75rem', color: 'var(--secondary)', marginBottom: '0.4rem', display: 'block' }}>PRIORITY</label>
                        <select
                            className="glass-input"
                            value={priority}
                            onChange={(e) => setPriority(parseInt(e.target.value))}
                            disabled={loading}
                        >
                            <option value="1">1 - Critical</option>
                            <option value="2">2 - High</option>
                            <option value="3">3 - Medium</option>
                            <option value="4">4 - Low</option>
                            <option value="5">5 - Lowest</option>
                        </select>
                    </div>
                    <button
                        className="glass-btn"
                        type="submit"
                        style={{ marginTop: '1.3rem', display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: loading ? 0.5 : 1 }}
                        disabled={loading}
                    >
                        <Plus size={18} /> {loading ? 'Adding...' : 'Add Goal'}
                    </button>
                </form>
                {isWaking && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{ marginTop: '1rem', color: 'var(--accent-warning)', fontSize: '0.85rem', textAlign: 'center' }}
                    >
                        🚀 Backend is waking up... This might take a few seconds on first load.
                    </motion.div>
                )}
            </motion.div>

            {/* Tasks Table */}
            <div style={{ overflowX: 'auto' }}>
                <table className="glass-table">
                    <thead>
                        <tr>
                            <th style={{ width: '40%' }}>Goal Name</th>
                            <th style={{ width: '25%' }}>Monthly Progress</th>
                            <th style={{ width: '15%' }}>Priority</th>
                            <th style={{ width: '10%' }}>Status</th>
                            <th style={{ width: '10%', textAlign: 'right' }}>Log Day</th>
                        </tr>
                    </thead>
                    <tbody>
                        <AnimatePresence mode="popLayout">
                            {tasks.map(task => (
                                <motion.tr
                                    key={task.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    layout
                                >
                                    <td>
                                        <div style={{ fontWeight: 600, fontSize: '1rem' }}>{task.title}</div>
                                        <div style={{ fontSize: '0.7rem', color: 'var(--secondary)', marginTop: '0.2rem' }}>
                                            Day {Math.round((task.progress / 100) * 30)} of 30 Complete
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <div className="progress-container">
                                                <div
                                                    className="progress-fill"
                                                    style={{
                                                        width: `${task.progress}%`,
                                                        backgroundColor: getProgressColor(task.progress)
                                                    }}
                                                />
                                            </div>
                                            <div style={{ fontSize: '0.85rem', fontWeight: 700, minWidth: '35px' }}>{Math.round(task.progress)}%</div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`badge badge-p${task.priority}`}>
                                            {task.priority === 1 ? '1 - Critical' :
                                                task.priority === 2 ? '2 - High' :
                                                    task.priority === 3 ? '3 - Medium' :
                                                        task.priority === 4 ? '4 - Low' : '5 - Lowest'}
                                        </span>
                                    </td>
                                    <td>
                                        <div style={{ fontSize: '0.85rem', fontWeight: 500, color: task.is_completed ? 'var(--accent-success)' : 'inherit' }}>
                                            {getStatus(task.progress)}
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'flex-end' }}>
                                            <button
                                                onClick={() => updateProgress(task.id, task.progress, 3.33)}
                                                className="glass-btn"
                                                style={{ padding: '0.4rem 0.8rem', fontSize: '11px', background: 'var(--primary)' }}
                                            >
                                                +Day
                                            </button>
                                            <button onClick={() => deleteTask(task.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent-danger)', marginLeft: '0.5rem', opacity: 0.3 }}>
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </tbody>
                </table>
                {tasks.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--secondary)', background: 'var(--glass-bg)', borderRadius: '1rem', border: '1px solid var(--glass-border)' }}>
                        <Target size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
                        <p>No goals added yet. Start by adding one above!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
