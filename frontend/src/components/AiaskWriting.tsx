import React, { useState } from 'react'; // React와 useState를 한 번에 가져옴
<<<<<<< HEAD
import { useNavigate } from 'react-router-dom';
import '../styles/AiaskWriting.css'; // Aiask.css 불러옴
=======
import '../styles/Aiask.css'; // Aiask.css 불러옴
>>>>>>> cda9350fdedb3e3765ba47c34d8b9ccc5f15e2a1
import axios from "axios";

const Aiask: React.FC = () => {

    const [title, setTitle] = useState(''); // 제목 상태
    const [content, setContent] = useState(''); // 본문 상태
<<<<<<< HEAD
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
=======
    const [responseText, setResponseText] = useState("");
>>>>>>> cda9350fdedb3e3765ba47c34d8b9ccc5f15e2a1

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
<<<<<<< HEAD
        if (loading) return;
        setLoading(true);
=======
        setResponseText("답변 중...");
        const date = new Date().toLocaleString(); // 현재 날짜와 시간 가져오기

>>>>>>> cda9350fdedb3e3765ba47c34d8b9ccc5f15e2a1
        try {
            const requestData = {
                title: title,
                content: content,
<<<<<<< HEAD
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
=======
                date: date
            };

            const response = await axios.post(
                'http://localhost:5000/process',
                requestData,
                { headers: { 'Content-Type': 'application/json' } }
            );
            setResponseText(response.data.answer);  // 백엔드에서 가공된 문자열 받기
        } catch (error) {
            if (error.response) {
                // 서버에서 응답이 왔을 때
                console.error('Response error:', error.response.data);
            } else if (error.request) {
                // 요청이 서버로 전송되었지만 응답이 없을 때
                console.error('Request error:', error.request);
            } else {
                // 기타 에러
                console.error('Error:', error.message);
            }
        }

        // 필요 시 입력 필드 초기화
        // setTitle('');
        // setContent('');
>>>>>>> cda9350fdedb3e3765ba47c34d8b9ccc5f15e2a1
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
<<<<<<< HEAD
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
=======
                    placeholder="ㅡ"
                />
            </div>
            <div className="answer-box">
                <textarea
                    value={responseText}
                    className="answer-text"
                />
            </div>
            <button type="button" onClick={handleSubmit} className="ask-button">
                질문하기 (-100p)
>>>>>>> cda9350fdedb3e3765ba47c34d8b9ccc5f15e2a1
            </button>
        </div>
    );
};

export default Aiask;
