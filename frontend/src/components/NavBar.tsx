// navbar.tsx
import React from 'react';
import '../styles/NavBar.css';  // 네비게이션 스타일

const NavBar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="logos"><a href="/">EduCode</a></div> 
      <div className="nav-bar-top">
        <div className="nav-con">
          <div className="navbt0"><a href="/">Home</a></div>
          <div className="navbt1">
            <a href="/aiask/post" className="btn-aiask">AI 질문</a>
          </div>
          <div className="navbt2">
            <a href="/free/post" className="btn-free">자유 게시판</a>
          </div>
          <div className="navbt3">
            <a href="/offer/post" className="btn-offer">구인 게시판</a>
          </div>
          <div className="navbt4"><a href="/quiz">게임</a></div>
        </div>

        
          <div className="register">
            <a href="/register" className="btn-register">Register</a>
          </div>
          <div className="login">
            <a href="/login" className="btn-login">Login</a>
          </div>
        
        <div className="line-3"></div>
        <div className="button-rent">
          <img className="moon" src="moon0.svg" alt="Moon icon" />
          <img className="line-32" src="line-31.svg" alt="Line icon" />
          <img className="sun" src="sun0.svg" alt="Sun icon" />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;