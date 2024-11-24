import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login: React.FC = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({
        id: '',
        password: '',
    });
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = { id: '', password: '' };

        if (!id || !password) {
            newErrors.id = '아이디와 비밀번호를 모두 입력해주세요';
        }

        setErrors(newErrors);
        return !newErrors.id && !newErrors.password;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, password }),
        });

        const data = await response.json();

        if (response.ok) {
            console.log('로그인 성공:', data.message);
            // localStorage에 사용자 ID 저장
            localStorage.setItem('userid', id);
            navigate('/');
        } else {
            if (data.error.includes('아이디')) {
                setErrors({ id: data.error, password: '' });
            } else if (data.error.includes('비밀번호')) {
                setErrors({ id: '', password: data.error });
            }
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="id">ID:</label>
                    <input
                        type="text"
                        id="id"
                        placeholder="Enter your ID"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                    />
                    {errors.id && <p className="error-message">{errors.id}</p>}

                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && <p className="error-message">{errors.password}</p>}

                    <button type="submit" className="login-button">Login</button>
                </form>
                <p>
                    계정이 없다면, <Link to="/register">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
