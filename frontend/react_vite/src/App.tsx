// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home.tsx';
import Login from './components/Login';
import Register from './components/Register';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/" />} /> {/* 모든 경로는 기본적으로 메인 페이지로 */}
      </Routes>
    </Router>
  );
};

export default App;
