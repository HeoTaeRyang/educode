import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

interface RankingItem {
  rank: number;
  username?: string;
  points?: number;
  name?: string;
  user?: string;
}

const Home: React.FC = () => {
  const [userid, setUserid] = useState<string | null>(null);
  const [rankings, setRankings] = useState<{
    points: RankingItem[];
    aiQuestions: RankingItem[];
    freeBoard: RankingItem[];
    jobBoard: RankingItem[];
  }>({
    points: [],
    aiQuestions: [],
    freeBoard: [],
    jobBoard: [],
  });
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserid = localStorage.getItem('userid');
    if (storedUserid) {
      setUserid(storedUserid);
    } else {
      navigate('/login');
    }

    // 예시 데이터 - 실제로는 DB에서 받아온 데이터를 설정
    setRankings({
      points: [
        { rank: 1, username: '라이언', points: 1400 },
        { rank: 2, username: '판다', points: 1320 },
        { rank: 3, username: '곰탱이', points: 1020 },
      ],
      aiQuestions: [
        { rank: 1, name: 'chatgpt API 사용', user: '홈홈' },
        { rank: 2, name: 'AI를 활용법', user: '개발바닥' },
        { rank: 3, name: '데이터 분석', user: '뽕뽕' },
      ],
      freeBoard: [
        { rank: 1, name: '대기업 개발자 취업 스펙', user: '일등' },
        { rank: 2, name: '게임 개발 노답썰', user: '책벌레' },
        { rank: 3, name: 'AI와 함께한 1년 개발', user: '잡식' },
      ],
      jobBoard: [
        { rank: 1, name: '개발 능력자 구해요', user: '안궁' },
        { rank: 2, name: '백엔드 모셔가요', user: '하하하' },
        { rank: 3, name: '열심히 같이 해봐요', user: '공룡' },
      ],
    });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userid');
    navigate('/login');
  };

  return (
    <div className="app">
      <header className="header">
        <div className="welcome-bar">
          {userid && (
            <>
              <span className="welcome-text">환영합니다, {userid}님!</span>
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </header>

      <div className="mainbox">
        <img className="main" src="main0.svg" />
        <div className="edu-code">EduCode</div>
        <div className="maintextbox0">
          <div className="maintextbox1">
            <div className="ai0">
              AI에게 질문하면, 질문과 답변에 대한
              <br />
              게시글이 자동 생성되는 기능을 제공합니다.
            </div>
          </div>
        </div>
      </div>

      <main className="content">
        <div className="ranking-section">
          <div className="ranking-category">
            <h3 className="ranking-title">포인트 랭킹</h3>
            <table className="ranking-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Name</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {rankings.points.map((item) => (
                  <tr key={item.rank}>
                    <td>{item.rank}</td>
                    <td>{item.username}</td>
                    <td>{item.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="ranking-category">
            <h3 className="ranking-title">AI 질문 랭킹</h3>
            <table className="ranking-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Title</th>
                </tr>
              </thead>
              <tbody>
                {rankings.aiQuestions.map((item) => (
                  <tr key={item.rank}>
                    <td>{item.rank}</td>
                    <td>{item.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="ranking-category">
            <h3 className="ranking-title">자유 게시판 랭킹</h3>
            <table className="ranking-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Title</th>
                </tr>
              </thead>
              <tbody>
                {rankings.freeBoard.map((item) => (
                  <tr key={item.rank}>
                    <td>{item.rank}</td>
                    <td>{item.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="ranking-category">
            <h3 className="ranking-title">구인 게시판 랭킹</h3>
            <table className="ranking-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Title</th>
                </tr>
              </thead>
              <tbody>
                {rankings.jobBoard.map((item) => (
                  <tr key={item.rank}>
                    <td>{item.rank}</td>
                    <td>{item.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="_2024-edu-code-all-rights-reserved">
          © 2024 EduCode. All rights reserved.
        </div>
        <div className="line"></div>
        <div className="logo">
          <div className="our-vision-is-to-provide-convenience-and-help-you">
            Our vision is to provide convenience and help you.
          </div>
        </div>
        <div className="group-1303">
          <div className="logo2">EduCode</div>
        </div>
        <img className="socmed-facebook" src="facebook0.svg" />
        <img className="socmed-twitter" src="twitter0.svg" />
        <img className="socmed-instagram" src="instagram0.svg" />
      </footer>
    </div>
  );
};

export default Home;
