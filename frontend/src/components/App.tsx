import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Aiask from "./AiaskPost";
import ShellRoute from "../ShellRoute";  // 새로 추가된 쉘 라우트
// import AiaskLook from './AiaskLook';
import Quiz from "./Quiz";

function App() {
  const isLoggedIn = !!localStorage.getItem('userid');

  useEffect(() => {
    document.title = "educode"; // 모든 페이지에서 동일한 제목 설정
  }, []);

  return (
    <Routes>
      {/* 로그인, 회원가입 페이지는 네비게이션 바가 없음 */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/quiz" element={<Quiz />} />

      {/* 네비게이션 바가 필요한 페이지 */}
      <Route element={<ShellRoute />}>
        <Route
            path="/"
            element={isLoggedIn ? <Home /> : <Navigate to="/" />}
        />
        <Route path="/aiask/post" element={<Aiask />} />
        <Route path="/aiask/writing" element={<Aiask />} />
        <Route path="/aiask/:id" element={<Aiask />} />
      </Route>
    </Routes>
  );
}

export default App;