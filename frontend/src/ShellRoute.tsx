import { Routes, Route, Navigate, useParams } from 'react-router-dom'; // useParams 추가
import NavBar from './components/NavBar'; // 네비게이션바 컴포넌트
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import AiaskPost from "./components/AiaskPost"; // 글 목록 페이지
import AiaskWriting from "./components/AiaskWriting"; // 글 작성 페이지
import AiaskLook from "./components/AiaskLook"; // 글 상세 페이지

const ShellRoute = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavBar />
      <div className="content">{children}</div>
    </>
  );
};

const AiaskLookWithParams = () => {
  const { id } = useParams<{ id: string }>(); // URL의 id 값 추출
  const postId = parseInt(id || "0", 10); // 문자열을 숫자로 변환
  return <AiaskLook postId={postId} />;
};

function App() {
  return (
    <Routes>
      {/* 로그인 및 회원가입 페이지는 네비게이션바 없이 */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* 나머지 페이지는 네비게이션바 포함 */}
      <Route
        path="/"
        element={
          <ShellRoute>
            <Home />
          </ShellRoute>
        }
      />
      
      {/* /aiask 기본 경로에서 /aiask/post로 리디렉션 */}
      <Route path="/aiask" element={<Navigate to="/aiask/post" replace />} />
      
      {/* 글 상세 페이지 */}
      <Route
        path="/aiask/:id"
        element={
          <ShellRoute>
            <AiaskLookWithParams />
          </ShellRoute>
        }
      />

      {/* 글 목록 페이지 */}
      <Route
        path="/aiask/post"
        element={
          <ShellRoute>
            <AiaskPost />
          </ShellRoute>
        }
      />

      {/* 글 작성 페이지 */}
      <Route
        path="/aiask/writing"
        element={
          <ShellRoute>
            <AiaskWriting />
          </ShellRoute>
        }
      />
    </Routes>
  );
}

export default App;