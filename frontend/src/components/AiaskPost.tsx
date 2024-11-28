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
  const [totalPages, setTotalPages] = useState<number>(0); // totalPages의 타입을 number로 지정
  const [currentPage, setCurrentPage] = useState<number>(1); // currentPage의 타입을 number로 지정
  const [posts, setPosts] = useState<Post[]>([]); // posts의 타입을 Post[]로 지정
  const [sortMethod, setSortMethod] = useState<number>(0);

  // 페이지 변경 핸들러
  const handlePageChange = async (pageNumber: number) => {
    setCurrentPage(pageNumber);
    try {
      const requestData = 
      { pageNumber: pageNumber,
        sortMethod: sortMethod,
      };

      const response = await axios.post(
        'http://localhost:5000/aiaskPostPages',
        requestData,
        { headers: { 'Content-Type': 'application/json' } }
      );
      setTotalPages(response.data.totalPages);  // 백엔드에서 총 페이지 수 받음
      setPosts(response.data.Pages); // 백엔드에서 페이지의 글 목록을 받음
    } catch (e) {
      console.error('error:', e);
    }
  };

  useEffect(() => {
    handlePageChange(1); // 첫 번째 페이지 데이터 가져오기
  }, [sortMethod]);

  const postsPerPage = 10;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost); // currentPosts 계산

  return (
    <div className="aiask-post-container">
      <div className="aiask-box">
        <div className="aiask-container-underbox"></div>
        <img src="/aiask-image.png" alt="aiask" />
      </div>

      <div className="aiask-post-array">
        <button 
          onClick={() => setSortMethod(0)}
          className={`aiask-sort-method-button ${sortMethod === 0 ? 'active' : ''}`}
        >
          최신순
        </button>
        <button onClick={() => setSortMethod(1)}
        className={`aiask-sort-method-button ${sortMethod === 1 ? 'active' : ''}`}
        >
          조회순
        </button>
      </div>

      {currentPosts.map((post) => (
        <AiaskPostBox
          key={post.id}
          title={post.title}
          user={post.user}
          time={post.time}
          views={post.views}
          comments={post.comments}
          text={post.text}
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

      <button className="aiask-send-button">
        <a href="/aiask/writing" className="aiask-send-button-0">질문하기 (100p)</a>
      </button>
    </div>
  );
};

export default AiaskPost;
