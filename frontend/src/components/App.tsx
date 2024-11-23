import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Aiask from "./AiaskPost";
import ShellRoute from "../ShellRoute";  // 새로 추가된 쉘 라우트
import AiaskLook from './AiaskLook';

function App() {
  return (
    <Routes>
      {/* 로그인, 회원가입 페이지는 네비게이션 바가 없음 */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* 네비게이션 바가 필요한 페이지 */}
      <Route element={<ShellRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/aiask/post" element={<Aiask />} />
        <Route path="/aiask/writing" element={<Aiask />} />
        <Route path="/aiask/:id" element={<Aiask />} />
      </Route>
    </Routes>
  );
}

export default App;