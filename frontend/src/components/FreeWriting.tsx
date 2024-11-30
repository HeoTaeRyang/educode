import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FreeWriting = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const requestData = {
        title: title,
        content: text,
        id: localStorage.getItem('userid')
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
    <div className="freewriting-container">
      <h2>글 작성</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>제목:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>내용:</label>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
        </div>
        <button type="submit">작성 완료</button>
      </form>
    </div>
  );
};

export default FreeWriting;
