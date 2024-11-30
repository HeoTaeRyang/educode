// src/components/Home.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import '../styles/Home.css';

interface RankingItem {
  rank: number;
  name: string;
  point?: number; // 포인트 랭킹에 사용
  user?: string; // 게시판 랭킹에 사용
}

interface RecentJobPost {
  index: number;
  title: string;
  name: string;
  content: string;
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

  const [recentJobPosts, setRecentJobPosts] = useState<RecentJobPost[]>([]);


  const navigate = useNavigate();

  useEffect(() => {
    const storedUserid = localStorage.getItem('userid');
    if (storedUserid) {
      setUserid(storedUserid);
    } else {
      // 로그인 정보가 없으면 로그인 페이지로 이동
      navigate('/login');
      return;
    }


    // 서버에서 데이터 불러오기
    const fetchRankings = async () => {
      try {
        const pointsResponse = await fetch("http://localhost:5000/pointRanking", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        const pointsData = await pointsResponse.json();

        const aiQuestionsResponse = await fetch(
          "http://localhost:5000/aiPostRanking",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          }
        );
        const aiQuestionsData = await aiQuestionsResponse.json();

        const freeBoardResponse = await fetch(
          "http://localhost:5000/postRanking",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          }
        );
        const freeBoardData = await freeBoardResponse.json();

        const jobBoardResponse = await fetch(
          "http://localhost:5000/offerPostRanking",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          }
        );
        const jobBoardData = await jobBoardResponse.json();

        setRankings({
          points: pointsData,
          aiQuestions: aiQuestionsData,
          freeBoard: freeBoardData,
          jobBoard: jobBoardData,
        });
      } catch (error) {
        console.error("Error fetching rankings:", error);
      }
    };

    const fetchRecentJobPosts = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/offerPostRecent",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = await response.json();
        setRecentJobPosts(data);
      } catch (error) {
        console.error("Error fetching recent job posts:", error);
      }
    };

    fetchRankings();
    fetchRecentJobPosts();
  }, [navigate]);

  const handleAttendance = async () => {
    try {
      const requestData = {
        id: localStorage.getItem('userid'),
      };

      const response = await axios.post(
        'http://localhost:5000/attendence',
        requestData,
        { headers: { 'Content-Type': 'application/json' } }
      );
      alert(response.data.answer);
    } catch (e) {
      console.error('error:', e);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('userid');
    navigate('/login');
  };

  const handleMyPage = () => {
    navigate('/mypage'); // My Page로 이동
  };

  return (
    <div className="app">

      <header className="header">
        <div className="welcome-bar">
          {userid && (
            <>
              <span className="welcome-text">환영합니다, {userid}님!</span>
              <button className="logout-button" onClick={handleAttendance}>
                출석하기
              </button>
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
              <button className="mypage-button" onClick={handleMyPage}>
                My Page
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
        <div className="title">Ranking</div>
        <div className="ranking-section">
          {[{
            title: "포인트 랭킹", data: rankings.points, isPoint: true,
          }, {
            title: "AI 질문 랭킹", data: rankings.aiQuestions, isPoint: false,
          }, {
            title: "자유 게시판 랭킹", data: rankings.freeBoard, isPoint: false,
          }, {
            title: "구인 게시판 랭킹", data: rankings.jobBoard, isPoint: false,
          }].map((ranking, index) => (
            <div className="ranking-category" key={index}>
              <h3 className="ranking-title">{ranking.title}</h3>
              <table className="ranking-table">
                <thead>
                  <tr>
                    <th>Rank</th>
                    {/* 포인트 랭킹만 Name, 나머지는 Title */}
                    <th>{ranking.isPoint ? "Name" : "Title"}</th>
                    {ranking.isPoint && <th>Points</th>}
                  </tr>
                </thead>
                <tbody>
                  {ranking.data.map((item) => (
                    <tr key={item.rank}>
                      <td>{item.rank}</td>
                      <td>{item.name}</td>
                      {ranking.isPoint && <td>{item.point}</td>}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>

        <div className="recent-job-section">
          <div className="title">New</div>
          <h3 className="recent-job-title">최신 구인글</h3>
          <div className="recent-job-cards">
            {recentJobPosts.map((post) => (
              <div className="recent-job-card" key={post.index}>
                <div className="recent-job-card-title">{post.title}</div>
                <div className="recent-job-card-author">{post.name}</div>
                <div className="recent-job-card-content">{post.content}</div>
              </div>
            ))}
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
}

export default Home;