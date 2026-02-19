import { motion } from 'framer-motion';
import { UserPlus } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(email, password);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to register');
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
                    <UserPlus size={48} color="var(--primary)" />
                    <h1>Create Account</h1>
                    <p style={{ color: 'var(--secondary)' }}>Join GoalTrack AI to boost your productivity.</p>
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
                        Sign Up
                    </button>
                </form>
                <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem' }}>
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Register;
