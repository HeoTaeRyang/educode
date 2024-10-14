import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Register.css'; // styles 폴더 안의 Register.css를 불러옴

const Register: React.FC = () => {
    return (
        <div className="register-container">
            <div className="register-image">
                <img src="/educode_register.png" alt="EduCode Welcome" />
            </div>
            <div className="register-box">
                <h2>Register</h2>
                <form>
                    <label htmlFor="id">ID:</label>
                    <input type="text" id="id" placeholder="Enter your ID" />

                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" placeholder="Enter your username" />

                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" placeholder="Enter your email" />

                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" placeholder="Enter your password" />

                    <button type="submit" className="register-button">Register</button>
                </form>
                <p>
                    <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;

