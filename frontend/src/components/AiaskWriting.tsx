import React, { useState } from 'react'; // React와 useState를 한 번에 가져옴
import { useNavigate } from 'react-router-dom';
import '../styles/AiaskWriting.css'; // Aiask.css 불러옴
import axios from "axios";

const Aiask: React.FC = () => {

    const [title, setTitle] = useState(''); // 제목 상태
    const [content, setContent] = useState(''); // 본문 상태
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // 제목 입력 변화 핸들러
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    // 본문 내용 변화 핸들러
    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    };

    // 버튼 클릭 시 제목, 본문, 날짜 콘솔 출력
    const handleSubmit = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const requestData = {
                title: title,
                content: content,
                id: localStorage.getItem('userid')
            };

            const response = await axios.post(
                'http://localhost:5000/aiask',
                requestData,
                { headers: { 'Content-Type': 'application/json' } }
            );
            alert(response.data.answer);
            navigate('/aiask/post');
        } catch (e) {
            console.error('error:', e);
        }
    };

    return (
        <div className="aiask-container">
            <div className="aiask-box">
                <div className="aiask-container-underbox"></div>    
                <img src="/aiask-image.png" alt="aiask" />
            </div>
            <div className="ask-line"></div>
            <div className="ask-title-box">
                <input
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="제목에 핵심 내용을 요약해봐요."
                    className="ask-title-input"
                />
            </div>
            <div className="ask-text-box">
                <textarea
                    value={content}
                    onChange={handleContentChange}
                    className="ask-text-input"
                    placeholder="질문을 입력하세요"
                />
            </div>
            <button
                type="button"
                onClick={handleSubmit}
                className="ask-button"
                disabled={loading} // 로딩 상태일 때 버튼 비활성화
            >
                {loading ? '답변 중...' : '질문하기 (-100p)'}
            </button>
        </div>
    );
};

export default Aiask;
