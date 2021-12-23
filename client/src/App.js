import React, { useEffect, useState } from 'react';

import Footer from './components/Footer';
import Navbar from './components/Navbar';

import { Navigate, Route, Routes } from 'react-router-dom';
import Main from './components/Main/Main';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import MyPage from './pages/MyPage';
import SignUpPage from './pages/SignUpPage';
import { Modal } from './components/Modal';
import { newdumy } from './dummyData';

function App() {
  //테스트중 초기상태 임의지정
  const cards = [
    { id: 1, name: '국민카드' },
    { id: 2, name: '신한카드' },
    { id: 3, name: '하나카드' },
    { id: 4, name: '롯데카드' },
    { id: 5, name: '비씨카드' },
    { id: 6, name: '농협카드' },
    { id: 7, name: '삼성카드' },
    { id: 8, name: '현대카드' },
  ];
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [userCards, setUserCards] = useState([]);
  const [accessToken, setAccessToken] = useState('');
  const [transaction, setTransaction] = useState(newdumy.transaction);
  const [modalData, setModalData] = useState([]);
  console.log('userCards', userCards);
  console.log('accessToken', accessToken);
  console.log('userInfo', userInfo);

  const userCardList = userCards.map((el) => {
    return {
      cardId: el.cardId,
      createdAt: el.createdAt,
      id: el.id,
      isCut: el.isCut,
      remainValue: el.remainValue,
      repaymentDay: el.repaymentDay,
      updatedAt: el.updatedAt,
      cardName: cards[el.cardId - 1].name,
      userId: 1,
    };
  });

  return (
    <>
      <Navbar
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        accessToken={accessToken}
        setAccessToken={setAccessToken}
        setUserCards={setUserCards}
        setUserInfo={setUserInfo}
        setTransaction={setTransaction}
      />
      {/* <Modal /> */}
      <Routes>
        <Route path="/" element={<Navigate to="/main" />} />
        <Route
          path="/main"
          element={
            <Main
              isLogin={isLogin}
              userCards={userCardList}
              cardsId={cards}
              accessToken={accessToken}
              transaction={transaction}
              setTransaction={setTransaction}
              modalData={modalData}
            />
          }
        />
        <Route path="/about" element={<AboutPage />} />
        <Route
          path="/login"
          element={
            <LoginPage
              setUserCards={setUserCards}
              isLogin={isLogin}
              setIsLogin={setIsLogin}
              setUserInfo={setUserInfo}
              setAccessToken={setAccessToken}
              setTransaction={setTransaction}
              setModalData={setModalData}
            />
          }
        />
        <Route
          path="/mypage"
          element={
            <MyPage
              isLogin={isLogin}
              setIsLogin={setIsLogin}
              accessToken={accessToken}
              setAccessToken={setAccessToken}
              cardsList={cards}
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              userCards={userCards}
              setUserCards={setUserCards}
            />
          }
        />
        <Route path="/signup" element={<SignUpPage cardsList={cards} />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
