import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Login.css'; // Login.css 불러옴

const Login: React.FC = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({
        id: '',
        password: '',
    });

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

        // 입력 값이 유효한지 체크
        if (!validateForm()) {
            return;
        }

        // 서버에 로그인 요청 보내기
        const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, password }),
        });

        const data = await response.json();

        // 서버 응답에 따른 오류 처리
        if (response.ok) {
            // 로그인 성공
            console.log('로그인 성공:', data.message);
            // 로그인 후 페이지 이동 또는 다른 처리
        } else {
            // 서버에서 오는 오류 메시지 처리
            setErrors({
                id: data.error || '',
                password: data.error || '',
            });
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
            <div className="login-image">
                <img src="/educode_login.png" alt="Login" />
            </div>
        </div>
    );
};

export default Login;
