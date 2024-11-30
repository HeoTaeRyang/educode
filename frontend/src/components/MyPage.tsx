import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/mypage.css';

interface MyPageData {
    id: string;
    name: string;
    point: number;
}

const MyPage: React.FC = () => {
    const [userData, setUserData] = useState<MyPageData | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem('userid'); // 로컬 스토리지에서 사용자 ID 가져오기

        if (!userId) {
            alert('로그인이 필요합니다.');
            navigate('/login'); // 로그인 페이지로 리디렉션
            return;
        }

        // Flask 서버에서 사용자 데이터 가져오기
        fetch('http://127.0.0.1:5000/myPage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: userId }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('사용자 데이터를 가져오지 못했습니다.');
                }
                return response.json();
            })
            .then((data) => {
                if (data.error) {
                    alert(data.error);
                    navigate('/login');
                } else {
                    setUserData(data[0]); // 첫 번째 데이터를 상태로 설정
                }
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
    }, [navigate]);

    const handleHomeClick = () => {
        navigate('/'); // 홈 화면으로 이동
    };

    return (
        <div className="mypage-container">
            <h1 className="mypage-title">My Page</h1>
            {userData ? (
                <form className="mypage-form">
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={userData.name}
                            readOnly
                            className="mypage-input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="id">ID:</label>
                        <input
                            type="text"
                            id="id"
                            value={userData.id}
                            readOnly
                            className="mypage-input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="point">Points:</label>
                        <input
                            type="text"
                            id="point"
                            value={userData.point.toString()}
                            readOnly
                            className="mypage-input"
                        />
                    </div>
                </form>
            ) : (
                <p>사용자 정보를 불러오는 중입니다...</p>
            )}
            <button className="mypage-home-button" onClick={handleHomeClick}>
                Home
            </button>
        </div>
    );
};

export default MyPage;
