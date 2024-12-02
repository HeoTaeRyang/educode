import { useState, useEffect } from 'react';
import AiaskPostBox from './AiaskPostBox';
import '../styles/AiaskPost.css';
import axios from "axios";

type Post = {
  id: number;
  title: string;
  user: string;
  time: string;
  views: number;
  comments: number;
  text: string;
};

const AiaskPost = () => {
  const [totalPages, setTotalPages] = useState<number>(0);  // 총 페이지 수
  const [currentPage, setCurrentPage] = useState<number>(1);  // 현재 페이지
  const [posts, setPosts] = useState<Post[]>([]);  // 게시글 목록
  const [sortMethod, setSortMethod] = useState<number>(0);  // 정렬 방법

  // 페이지 변경 핸들러
  const handlePageChange = async (pageNumber: number) => {
    setCurrentPage(pageNumber);
    try {
      const requestData = {
        pageNumber: pageNumber,
        sortMethod: sortMethod,
      };

      // 백엔드에서 페이지에 맞는 데이터를 가져옴
      const response = await axios.post(
        'http://localhost:5000/aiaskPostPages',
        requestData,
        { headers: { 'Content-Type': 'application/json' } }
      );
      setTotalPages(response.data.totalPages);  // 총 페이지 수 업데이트
      setPosts(response.data.Pages);  // 페이지에 맞는 게시글 목록 업데이트
    } catch (e) {
      console.error('error:', e);
    }
  };

  useEffect(() => {
    handlePageChange(1);  // 페이지 로딩 시 첫 번째 페이지 데이터 가져오기
  }, [sortMethod]);

  return (
    <div className="aiask-post-container">
      <div className="aiask-box">
        <img src="/aiask-image.png" alt="aiask" />
        <div className="box-text">AI 질문게시판</div>
        <div className="aiask-container-underbox"></div>
      </div>

      <div className="aiask-post-array">
        <button 
          onClick={() => setSortMethod(0)}  // 최신순 정렬
          className={`aiask-sort-method-button ${sortMethod === 0 ? 'active' : ''}`}
        >
          최신순
        </button>
        <button 
          onClick={() => setSortMethod(1)}  // 조회순 정렬
          className={`aiask-sort-method-button ${sortMethod === 1 ? 'active' : ''}`}
        >
          조회순
        </button>
      </div>

      {/* 게시글 목록 출력 */}
      {posts.map((post) => (
        <AiaskPostBox
          key={post.id}
          postId={post.id}
          title={post.title}
          user={post.user}
          time={post.time}
          views={post.views}
          comments={post.comments}
        />
      ))}

      {/* 페이지네이션 버튼 */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}  // 페이지 번호 클릭 시 페이지 변경
            className={currentPage === index + 1 ? 'active' : ''}  // 현재 페이지 활성화
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* 질문하기 버튼 */}
      <button className="aiask-send-button">
        <a href="/aiask/writing" className="aiask-send-button-0">질문하기 (100p)</a>
      </button>
    </div>
  );
};

export default AiaskPost;
