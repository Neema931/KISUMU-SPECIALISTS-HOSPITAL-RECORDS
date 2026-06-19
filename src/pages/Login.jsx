import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import api from '../services/api';

import Navbar from '../components/Navbar';
import "./styles.css";
import sidebar from '../components/Sidebar';

import logo from "../assets/logo.png";


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/dashboard";

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/auth/login", { email, password });

            // save token
            localStorage.setItem("token", response.data.token);

            // navigate to original destination or dashboard
            navigate(from, { replace: true });
        } catch (error) {
            setError("Invalid email or password");
        }
    };

    return (
            <div className="login-container">
                <form className="login-card" onSubmit={handleLogin}>
                     <div className="logo">
                    <img src={logo} alt="Kisumu Specialist Hospital Logo" className="logo" />
                    <h2>Kisumu Specialists Hospital</h2>
                </div>

                    <h2>Kisumu Specialist Hospital Records System</h2>

                    {error && <p className="error">{error}</p>}

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Login</button>
                    <Link to="/dashboard">Go to Dashboard</Link>
                </form>
            </div>
        
    );    
}

export default Login; 