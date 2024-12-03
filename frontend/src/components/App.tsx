import { useEffect } from "react";
import { Route, Routes, Navigate, useParams } from "react-router-dom"; // useParams 추가
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import AiaskPost from "./AiaskPost"; // Aiask 글 목록 페이지
import AiaskWriting from "./AiaskWriting"; // Aiask 글 작성 페이지
import AiaskLook from './AiaskLook'; // Aiask 글 상세 페이지
import FreePost from "./FreePost"; // Free 글 목록 페이지
import FreeWriting from "./FreeWriting"; // Free 글 작성 페이지
import FreeLook from "./FreeLook"; // Free 글 상세 페이지
import OfferPost from "./OfferPost"; // Offer 글 목록 페이지
import OfferWriting from "./OfferWriting"; // Offer 글 작성 페이지
import OfferLook from "./OfferLook"; // Offer 글 상세 페이지
import ShellRoute from "../ShellRoute";  // 새로 추가된 쉘 라우트
import Quiz from "./Quiz";
import MyPage from './MyPage';

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
      <Route path="/mypage" element={<MyPage />} />

      {/* 네비게이션 바가 필요한 페이지 */}
      <Route element={<ShellRoute />}>
        <Route
          path="/"
          element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
        />

        {/* Aiask 관련 라우트 */}
        <Route path="/aiask/post" element={<AiaskPost />} />
        <Route path="/aiask/writing" element={<AiaskWriting />} />
        <Route path="/aiask/:id" element={<AiaskLookWithParams />} />

        {/* Free 관련 라우트 */}
        <Route path="/free/post" element={<FreePost />} />
        <Route path="/free/writing" element={<FreeWriting />} />
        <Route path="/free/:id" element={<FreeLookWithParams />} />

        {/* Offer 관련 라우트 */}
        <Route path="/offer/post" element={<OfferPost />} />
        <Route path="/offer/writing" element={<OfferWriting />} />
        <Route path="/offer/:id" element={<OfferLookWithParams />} />
      </Route>
    </Routes>
  );
}

// AiaskLookWithParams 컴포넌트: URL에서 id 값을 받아 AiaskLook에 전달
const AiaskLookWithParams = () => {
  const { id } = useParams<{ id: string }>(); // URL에서 id 추출
  const postId = parseInt(id || "0", 10); // id를 숫자로 변환

  return <AiaskLook postId={postId} />; // postId를 AiaskLook에 전달
};

// FreeLookWithParams 컴포넌트: URL에서 id 값을 받아 FreeLook에 전달
const FreeLookWithParams = () => {
  const { id } = useParams<{ id: string }>(); // URL에서 id 추출
  const postId = parseInt(id || "0", 10); // id를 숫자로 변환

  return <FreeLook postId={postId} />; // postId를 FreeLook에 전달
}

// OfferLookWithParams 컴포넌트: URL에서 id 값을 받아 OfferLook에 전달
const OfferLookWithParams = () => {
  const { id } = useParams<{ id: string }>(); // URL에서 id 추출
  const postId = parseInt(id || "0", 10); // id를 숫자로 변환

  return <OfferLook postId={postId} />; // postId를 OfferLook에 전달
}

export default App;

