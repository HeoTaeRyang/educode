import { useEffect } from "react";
import { Route, Routes, Navigate, useParams } from "react-router-dom"; // useParams 추가
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import AiaskPost from "./AiaskPost"; // Aiask 글 목록 페이지
import AiaskWriting from "./AiaskWriting"; // Aiask 글 작성 페이지
import AiaskLook from './AiaskLook'; // Aiask 글 상세 페이지
import ShellRoute from "../ShellRoute";  // 새로 추가된 쉘 라우트
import Quiz from "./Quiz";

function App() {
  const isLoggedIn = !!localStorage.getItem('userid'); // 로그인 상태 체크

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
          element={isLoggedIn ? <Home /> : <Navigate to="/login" />} // 로그인 여부에 따른 접근 제어
        />

        {/* Aiask 관련 라우트 */}
        <Route path="/aiask/post" element={<AiaskPost />} />
        <Route path="/aiask/writing" element={<AiaskWriting />} />
        
        {/* postId를 URL 파라미터로 전달하여 AiaskLook 컴포넌트에 전달 */}
        <Route path="/aiask/:id" element={<AiaskLookWithParams />} />
      </Route>
    </Routes>
  );
}

// AiaskLookWithParams 컴포넌트: URL에서 id 값을 받아 AiaskLook에 전달
const AiaskLookWithParams = () => {
  const { id } = useParams<{ id: string }>(); // URL에서 id 추출
  const postId = parseInt(id || "0", 10); // id를 숫자로 변환

  return <AiaskLook postId={postId} />; // postId를 AiaskLook에 전달
}

export default App;
