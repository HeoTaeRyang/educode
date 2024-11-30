import React, { useState } from 'react';
import axios from 'axios';

const FreeWriting = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/freeposts', {
        title,
        text,
      });
      console.log('글 작성 성공:', response.data);
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
          <textarea
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
