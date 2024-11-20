import React, { useState, useEffect } from 'react';
import AiaskPostBox from './AiaskPostBox';
import '../styles/AiaskPost.css';

const Aiask = () => {
  // 덤프 데이터
  const [posts, setPosts] = useState([
    { id: 1, title: 'java 관련 질문드립니다.', user: '라이언', time: '41분 전', views: 12, comments: 1, text: '안녕하세요 강사님TCP와 UDP의 차이점에 대해 강의를 듣고 있는데...' },
    { id: 2, title: 'React 질문', user: '춘식이', time: '1시간 전', views: 15, comments: 3, text: 'React의 상태 관리 방법에 대해 궁금합니다...' },
    { id: 3, title: 'MySQL 쿼리 최적화 질문', user: '어피치', time: '2시간 전', views: 20, comments: 5, text: 'SELECT 문에서 인덱스를 사용하는 방법에 대해 알고 싶습니다.' },
    { id: 4, title: 'CSS Flexbox 질문', user: '라이언', time: '30분 전', views: 18, comments: 2, text: 'Flexbox로 정렬 시 공간이 고르게 배분되지 않습니다. 어떻게 해야 하나요?' },
    { id: 5, title: 'Python for loop 관련 질문', user: '프로도', time: '3시간 전', views: 25, comments: 7, text: 'for loop 안에서 조건문을 사용할 때 효율적으로 작성하는 방법이 궁금합니다.' },
    { id: 6, title: 'JavaScript 비동기 처리 질문', user: '네오', time: '4시간 전', views: 30, comments: 8, text: 'async/await와 Promise의 차이점과 사용 사례가 궁금합니다.' },
    { id: 7, title: 'HTML 마크업 관련 질문', user: '무지', time: '10분 전', views: 5, comments: 1, text: 'HTML5에서 시맨틱 태그의 올바른 사용 방법에 대해 알고 싶습니다.' },
    { id: 8, title: 'Spring Boot REST API 질문', user: '튜브', time: '2시간 전', views: 22, comments: 4, text: 'Spring Boot로 REST API를 구현할 때 예외 처리는 어떻게 해야 하나요?' },
    { id: 9, title: 'React Router 관련 질문', user: '제이지', time: '50분 전', views: 12, comments: 3, text: 'React Router에서 동적 라우팅을 설정하는 방법이 궁금합니다.' },
    { id: 10, title: 'Node.js Express 질문', user: '콘', time: '1시간 전', views: 18, comments: 6, text: 'Express에서 미들웨어를 작성하는 기본 규칙과 사례를 알고 싶습니다.' },
    { id: 11, title: 'TypeScript 타입 정의 질문', user: '라이언', time: '20분 전', views: 10, comments: 2, text: 'TypeScript에서 커스텀 타입을 정의할 때 주의할 점이 무엇인가요?' },
    // ...더 많은 데이터 추가
  ]);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const postsPerPage = 10; // 페이지당 게시물 수

  // 현재 페이지에 해당하는 게시물 계산
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // 총 페이지 수 계산
  const totalPages = Math.ceil(posts.length / postsPerPage);

  return (
    <div className="aiask-container">
      <div className="aiask-box">
        <div className="aiask-container-underbox"></div>    
        <img src="/aiask-image.png" alt="aiask" /></div>

        <div className="aiask-post-array">
        -최신순 -조회순</div>
            
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
    </div>
  );
};

export default Aiask;


