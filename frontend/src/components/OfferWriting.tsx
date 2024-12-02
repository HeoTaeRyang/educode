import React, { useState } from 'react'; // React와 useState를 한 번에 가져옴
import { useNavigate } from 'react-router-dom';
import '../styles/OfferWriting.css';
import axios from "axios";

const Offer: React.FC = () => {

    const [title, setTitle] = useState(''); // 제목 상태
    const [header, setHeader] = useState(''); // 본문 상태
    const [content, setContent] = useState(''); // 본문 상태
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // 제목 입력 변화 핸들러
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    // 헤더 입력 변화 핸들러
    const handleHeaderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHeader(e.target.value);
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
                header: header,
                content: content,
                id: localStorage.getItem('userid')
            };

            const response = await axios.post(
                'http://localhost:5000/offerPost',
                requestData,
                { headers: { 'Content-Type': 'application/json' } }
            );
            alert(response.data.answer);
            navigate('/offer/post');
        } catch (e) {
            console.error('error:', e);
        }
    };

    return (
        <div className="offer-container">
            <div className="offer-box">
            <div className="box-text">구인게시판</div>
                <img src="/offer-image.png" alt="offer" />
                <div className="offer-container-underbox"></div>   
            </div>
            <div className="offer-line"></div>
            <div className="offer-title-box">
                <input
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="제목에 핵심 내용을 요약해봐요."
                    className="offer-title-input"
                />
            </div>
            <div className="offer-header-box">
                <input
                    type="text"
                    value={header}
                    onChange={handleHeaderChange}
                    placeholder="헤더 입력."
                    className="offer-header-input"
                />
            </div>
            <div className="offer-text-box">
                <textarea
                    value={content}
                    onChange={handleContentChange}
                    className="offer-text-input"
                    placeholder="질문을 입력하세요"
                />
            </div>
            <button
                type="button"
                onClick={handleSubmit}
                className="offer-button"
            >
                작성 완료
            </button>
        </div>
    );
};

export default Offer;
