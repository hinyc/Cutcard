import React from "react";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

import { Navigate, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import MyPage from "./pages/MyPage";
import SignInPage from "./pages/SignInPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/main" />} />
        <Route path="/main" element={<MainPage />} />
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
