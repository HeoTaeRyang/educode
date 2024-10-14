// src/components/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home: React.FC = () => {
    return (
        <div className="home-page">
            <header className="header">
                <div className="logo">EduCode</div>
                <div className="auth-buttons">
                    <Link to="/login" className="btn-login">Login</Link>
                    <Link to="/register" className="btn-register">Register</Link>
                </div>
            </header>

            <main>


            </main>

        </div>
    );
};

export default Home;
