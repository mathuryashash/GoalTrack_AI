import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to login');
        }
    };

    return (
        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <motion.div
                className="glass-panel"
                style={{ padding: '2rem', width: '100%', maxWidth: '400px' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <LogIn size={48} color="var(--primary)" />
                    <h1>Welcome Back</h1>
                    <p style={{ color: 'var(--secondary)' }}>Enter your credentials to access your workspace.</p>
                </div>

                {error && <div style={{ color: 'var(--accent-danger)', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                        <input
                            type="email"
                            placeholder="Email"
                            className="glass-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <input
                            type="password"
                            placeholder="Password"
                            className="glass-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="glass-btn" style={{ width: '100%' }}>
                        Sign In
                    </button>
                </form>
                <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem' }}>
                    Don't have an account? <Link to="/register">Register</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;
