import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../styles/FreeWriting.css";

const FreeWriting = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState(''); // text로 변수명 통일
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const requestData = {
        title: title,
        content: text, // text 변수 사용
        id: localStorage.getItem('userid'),
      };

      const response = await axios.post(
        'http://localhost:5000/post',
        requestData,
        { headers: { 'Content-Type': 'application/json' } }
      );

      alert(response.data.answer);
      navigate('/free/post');
    } catch (error) {
      console.error('글 작성 중 오류 발생:', error);
    }
  };

  return (
    <div className="free-container">
      <div className="free-box">
        <div className="box-text">자유게시판</div>
        <img src="/free-image.png" alt="free" />
        <div className="free-container-underbox"></div>
      </div>
      <div className="free-line"></div>
      <form onSubmit={handleSubmit}>
        {/* 제목 입력란 */}
        <div className="free-title-box">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목에 핵심 내용을 요약해봐요."
            className="free-title-input"
            required
          />
        </div>
        {/* 본문 입력란 */}
        <div className="free-text-box">
          <textarea
            value={text} // text로 수정
            onChange={(e) => setText(e.target.value)}
            className="free-text-input"
            placeholder="내용을 입력하세요"
            required
          />
        </div>
        {/* 제출 버튼 */}
        <button type="submit" className="ask-button">
          작성 완료
        </button>
      </form>
    </div>
  );
};

export default FreeWriting;
