import React, { useState, useEffect } from 'react';
import AiaskPostBox from './AiaskPostBox';
import '../styles/AiaskPost.css';
import axios from "axios";
import { Link } from 'react-router-dom';

const Aiask = () => {
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState();


  // 덤프 데이터
  const [posts, setPosts] = useState([]);

  // 페이지 변경 핸들러
  const handlePageChange = async (pageNumber: number) => {
    setCurrentPage(pageNumber);

    try {
      const requestData = {
        pageNumber: pageNumber
      };

      const response = await axios.post(
          'http://localhost:5000//aiaskPostPages',
          requestData,
          { headers: { 'Content-Type': 'application/json' } }
      );
      setTotalPages(response.data.totalPages);  // 백엔드에서 총 페이지 수 받음
      setPosts(response.data.Pages); //백엔드에서 페이지의 글 목록을 받음
  } catch (e) {
      console.error('error:', e);
  }
  };

  useEffect(() => {
    handlePageChange(1); // 첫 번째 페이지 데이터 가져오기
  }, []);

  return (
    <div className="aiask-container">
      <div className="aiask-box">
        <div className="aiask-container-underbox"></div>    
        <img src="/aiask-image.png" alt="aiask" /></div>

        <div className="aiask-post-array">
          <Link to="/">홈</Link>
          -최신순 -조회순
          <Link to="/AiaskWriting">글쓰기</Link>
        </div>
            
      {posts.map((post) => (
        <AiaskPostBox
          key={post.id}
          title={post.title}
          user={post.user}
          time={post.time}
          views={post.views}
          comments={0}
          text={'x'}
        />
      ))}

      {/* 페이지네이션 버튼 */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Aiask;


