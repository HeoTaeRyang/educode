import React, { useState } from 'react'; // React와 useState를 한 번에 가져옴
import '../styles/AiaskWriting.css'; // AiaskWriting.css 불러옴
import axios from "axios";
import { Link } from 'react-router-dom';

const Aiask: React.FC = () => {

    const [title, setTitle] = useState(''); // 제목 상태
    const [content, setContent] = useState(''); // 본문 상태
    const [responseText, setResponseText] = useState("");

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
        setResponseText("답변 중...");

        try {
            const requestData = {
                title: title,
                content: content,
                id: 'admin'
            };

            const response = await axios.post(
                'http://localhost:5000/aiask',
                requestData,
                { headers: { 'Content-Type': 'application/json' } }
            );
            setResponseText(response.data.answer);  // 백엔드에서 가공된 문자열 받기
        } catch (e) {
            console.error('error:', e);
            setResponseText("에러");
        }

        // 필요 시 입력 필드 초기화
        // setTitle('');
        // setContent('');
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
                    placeholder="질문 내용을 입력하세요"
                />
            </div>
            <Link to="/AiaskPost">
                뒤로가기
            </Link>
            <Link to="/AiaskPost">
                <button type="button" onClick={handleSubmit} className="ask-button">
                    질문하기 (-100p)
                </button>
            </Link>
        </div>
    );
};

export default Aiask;
