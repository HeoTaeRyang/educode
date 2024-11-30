import { Routes, Route, Navigate, useParams } from 'react-router-dom'; // useParams 추가
import NavBar from './components/NavBar'; // 네비게이션바 컴포넌트
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import AiaskPost from "./components/AiaskPost"; // 글 목록 페이지
import AiaskWriting from "./components/AiaskWriting"; // 글 작성 페이지
import AiaskLook from "./components/AiaskLook"; // 글 상세 페이지
import FreePost from './components/FreePost'; // 글 목록 페이지
import FreeWriting from './components/FreeWriting'; // 글 작성 페이지
import FreeLook from './components/FreeLook'; // 글 상세 페이지

// ShellRoute 컴포넌트: 네비게이션 바와 콘텐츠를 공통 레이아웃으로 설정
const ShellRoute = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavBar />
      <div className="content">{children}</div>
    </>
  );
};

// AiaskLookWithParams 컴포넌트: URL의 id 값을 받아서 AiaskLook 컴포넌트에 전달
const AiaskLookWithParams = () => {
  const { id } = useParams<{ id: string }>(); // URL의 id 값 추출
  const postId = parseInt(id || "0", 10); // 문자열을 숫자로 변환
  return <AiaskLook postId={postId} />;
};

// FreeLookWithParams 컴포넌트: URL의 id 값을 받아서 FreeLook 컴포넌트에 전달
const FreeLookWithParams = () => {
  const { id } = useParams<{ id: string }>(); // URL의 id 값 추출
  const postId = parseInt(id || "0", 10); // 문자열을 숫자로 변환
  return <FreeLook postId={postId} />;
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

      {/* Aiask 관련 라우트 */}
      <Route
        path="/aiask/:id"
        element={
          <ShellRoute>
            <AiaskLookWithParams />
          </ShellRoute>
        }
      />
      <Route
        path="/aiask/post"
        element={
          <ShellRoute>
            <AiaskPost />
          </ShellRoute>
        }
      />
      <Route
        path="/aiask/writing"
        element={
          <ShellRoute>
            <AiaskWriting />
          </ShellRoute>
        }
      />

      {/* Free 관련 라우트 */}
      <Route
        path="/free/:id"
        element={
          <ShellRoute>
            <FreeLookWithParams />
          </ShellRoute>
        }
      />
      <Route
        path="/free/post"
        element={
          <ShellRoute>
            <FreePost />
          </ShellRoute>
        }
      />
      <Route
        path="/free/writing"
        element={
          <ShellRoute>
            <FreeWriting />
          </ShellRoute>
        }
      />
    </Routes>
  );
}

export default App;
