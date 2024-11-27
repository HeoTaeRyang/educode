// src/components/Home.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

const Home: React.FC = () => {
  const [userid, setUserid] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
      const storedUserid = localStorage.getItem('userid');
      if (storedUserid) {
          setUserid(storedUserid);
      } else {
          // 로그인 정보가 없으면 로그인 페이지로 이동
          navigate('/login');
      }
  }, [navigate]);

  const handleLogout = () => {
      localStorage.removeItem('userid');
      navigate('/login');
  };
  return (
    <div className="app">
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
        <div className="rectangle-23785">
          <p>This is a simple website built with Vite and TypeScript!</p>
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