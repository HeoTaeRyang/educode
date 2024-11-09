//import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';  // 추가된 부분
import App from './components/App.tsx';
//import Login from './components/Login.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>  {/* Router로 감싸줌 */}
      <App />
    </Router>
  </StrictMode>,
);