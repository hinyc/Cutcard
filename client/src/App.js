import React, { useState } from 'react';

import Footer from './components/Footer';
import Navbar from './components/Navbar';

import { Navigate, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import MyPage from './pages/MyPage';
import SignInPage from './pages/SignInPage';

function App() {
  //테스트중 초기상태 임의지정
  const [isLogin, setIsLogin] = useState(true);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/main" />} />
        <Route path="/main" element={<MainPage isLogin={isLogin} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/signin" element={<SignInPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
