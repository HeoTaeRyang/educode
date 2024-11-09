import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Register.css'; // styles 폴더 안의 Register.css를 불러옴

const Register: React.FC = () => {
    // 입력 필드 상태
    const [userId, setUserId] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // 각 항목에 대한 오류 상태
    const [errors, setErrors] = useState<any>({});

    // 입력값 검증 함수
    const validate = (field: string, value: string) => {
        let errorMessage = '';

        if (field === 'username') {
            if (value.length < 3 || value.length > 10) {
                errorMessage = '사용자 이름은 3자 이상 10자 이하로 입력해주세요.';
            }
        }
        if (field === 'password') {
            if (value.length < 6) {
                errorMessage = '비밀번호는 6자리 이상이어야 합니다.';
            }
        }
        if (field === 'email') {
            if (!/\S+@\S+\.\S+/.test(value)) {
                errorMessage = '이메일 형식이 올바르지 않습니다.';
            }
        }
        if (field === 'userId' && !value) {
            errorMessage = '아이디를 입력해주세요.';
        }

        // 오류 상태 업데이트
        setErrors((prevErrors: any) => ({
            ...prevErrors,
            [field]: errorMessage,
        }));
    };

    const handleChange = (field: string, value: string) => {
        // 필드별로 상태를 업데이트
        if (field === 'userId') setUserId(value);
        if (field === 'username') setUsername(value);
        if (field === 'email') setEmail(value);
        if (field === 'password') setPassword(value);

        // 입력값이 바뀔 때마다 실시간 검증
        validate(field, value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 서버 요청 로직 (여기서는 예시)
        // 폼 제출 시 검증
        if (Object.keys(errors).length > 0) {
            return; // 오류가 있으면 제출하지 않음
        }

        // 백엔드에 데이터 전송 (fetch 요청 등)
    };

    return (
        <div className="register-container">
            <div className="register-image">
                <img src="/educode_register.png" alt="EduCode Welcome" />
            </div>
            <div className="register-box">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="id">ID:</label>
                        <input
                            type="text"
                            id="id"
                            placeholder="Enter your ID"
                            value={userId}
                            onChange={(e) => handleChange('userId', e.target.value)}
                        />
                        {errors.userId && <div style={{ color: 'red' }}>{errors.userId}</div>}
                    </div>

                    <div>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => handleChange('username', e.target.value)}
                        />
                        {errors.username && <div style={{ color: 'red' }}>{errors.username}</div>}
                    </div>

                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => handleChange('email', e.target.value)}
                        />
                        {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
                    </div>

                    <div>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => handleChange('password', e.target.value)}
                        />
                        {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
                    </div>

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
