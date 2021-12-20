import React, { useState } from "react";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

import { Navigate, Route, Routes } from "react-router-dom";
import Main from "./components/Main/Main";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import MyPage from "./pages/MyPage";
import SignUpPage from "./pages/SignUpPage";
//!dummy
import { newdumy } from "./dummyData";

function App() {
  //테스트중 초기상태 임의지정
  const cards = [
    { id: 1, name: "국민카드" },
    { id: 2, name: "신한카드" },
    { id: 3, name: "하나카드" },
    { id: 4, name: "롯데카드" },
    { id: 5, name: "비씨카드" },
    { id: 6, name: "농협카드" },
    { id: 7, name: "삼성카드" },
    { id: 8, name: "현대카드" },
  ];
  const [isLogin, setIsLogin] = useState(true);
  const [userCards, setUserCards] = useState(
    newdumy.cards.map((el) => {
      return {
        id: el.id, //
        userId: el.userId,
        cardId: el.cardId,
        cardName: cards[el.cardId - 1].name,
        isCut: el.isCut,
        remainValue: el.remainValue,
        repaymentDay: el.repaymentDay,
        updated_at: el.updated_at,
      };
    })
  );

  return (
    <>
      <Navbar isLogin={isLogin} />
      <Routes>
        <Route path="/" element={<Navigate to="/main" />} />
        <Route
          path="/main"
          element={<Main isLogin={isLogin} userCards={userCards} />}
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/mypage"
          element={<MyPage cardsList={cards} userCards={userCards} />}
        />
        <Route path="/signup" element={<SignUpPage cardsList={cards} />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
