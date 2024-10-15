// src/components/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home: React.FC = () => {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-bar-top">
            
            <div className="logos">EduCode</div>

            <div className="home">Home</div>
            <div className="ai1">AI 질문</div>
            <div className="div">자유 게시판</div>
            <div className="div2">구인 게시판</div>
            <div className="div3">게임</div>

            {/* 회원가입 버튼 */}
            <div className="register"><Link to="/register" className="btn-register">Register</Link></div>
            

            {/* 로그인 버튼 */}
            <div className="login"><Link to="/login" className="btn-login">Login</Link></div>
            
          <div className="line-3"></div>
          <div className="line-4"></div>
          
          <div className="button-rent">
            <img className="moon" src="moon0.svg" />
            <img className="line-32" src="line-31.svg" />
            <img className="sun" src="sun0.svg" />
          </div>
        </div>
      </nav>

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
