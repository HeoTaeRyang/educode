import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Login.css'; // Login.css 불러옴

const Login: React.FC = () => {
    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>
                <form>
                    <label htmlFor="id">ID:</label>
                    <input type="text" id="id" placeholder="Enter your ID" />

                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" placeholder="Enter your password" />

                    <button type="submit" className='login-button'>Login</button>
                </form>
                <p>
                    계정이 없다면, <Link to="/register">Register</Link>
                </p>
            </div>
            <div className="login-image">
                <img src="/educode_login.png" alt="Login" />
            </div>
        </div>
    );
};

export default Login;

