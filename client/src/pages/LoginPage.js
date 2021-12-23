import React, { useState } from 'react';
import { LoginInput, PasswordInput } from '../components/Input';
import { BigButton } from '../components/Button';
import { Container, Title } from '../components/Common';
import { Notification } from '../components/Input';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginPage({
  setAccessToken,
  setUserCards,
  setUserInfo,
  setIsLogin,
  isLogin,
  setTransaction,
  setModalData,
  setCardPrice,
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isBtnClick, setIsBtnClick] = useState(false);

  const navigate = useNavigate();

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onLoginClick = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    axios
      .post(
        'http://localhost:4000/users/login',
        {
          email: email,
          password: password,
          year: year,
          month: month,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            withCredentials: true,
          },
        },
      )
      .then((res) => {
        console.log('------------', res.data.modal[0].card);
        setIsLogin(true);
        setUserCards(res.data.cards);
        setAccessToken(res.data.accessToken);
        setUserInfo(res.data.userInfo);
        setTransaction(res.data.transaction);
        setModalData(res.data.modal);
        setCardPrice(res.data.cardPrice);
        navigate('/');
      })
      .catch((err) => {
        setIsBtnClick(true);
        setIsLogin(false);
        console.error(err);
      });
  };

  const onLoginPress = (e) => {
    if (e.key === 'Enter') {
      onLoginClick();
    }
  };

  const onSignUpClick = () => {
    navigate('/signup');
  };

  return (
    <Container>
      <Title margin="66px 0 53px 0" text="로그인" />
      <LoginInput onChange={onEmailChange} />
      <PasswordInput onChange={onPasswordChange} onKeyPress={onLoginPress} />
      {isBtnClick ? (
        isLogin ? null : (
          <Notification color="#FF6B6B" margin="4px 186px 0 0">
            로그인에 실패하였습니다.
          </Notification>
        )
      ) : null}
      <BigButton
        text="로그인"
        margin="62px auto 12px auto"
        onClick={onLoginClick}
      />
      <BigButton
        text="회원가입"
        background="white"
        color="#97BFB4"
        border="1px solid #97BFB4"
        margin="0 auto 50px auto"
        onClick={onSignUpClick}
      />
    </Container>
  );
}

export default LoginPage;
