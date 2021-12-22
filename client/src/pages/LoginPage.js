import React, { useState } from 'react';
import { LoginInput, PasswordInput } from '../components/Input';
import { BigButton } from '../components/Button';
import { Container, Title } from '../components/Common';
import { Link } from 'react-router-dom';
import { Notification } from '../components/Input';

import axios from 'axios';

function LoginPage({ setAccessToken, setUserCards, setUserInfo, setIsLogin, isLogin, setTransaction }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isBtnClick, setIsBtnClick] = useState(false);
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
          },
        }
      )
      .then((res) => {
        console.log(res);
        setIsLogin(true);
        setUserCards(res.data.cards);
        setAccessToken(res.data.accessToken);
        setUserInfo(res.data.userInfo);
        //? 이 안에서 main 페이지로 이동할 수 있도록 조적
      })
      .catch((err) => {
        setIsBtnClick(true);
        setIsLogin(false);
        console.error(err);
      });
  };

  // const onLoginPress = (e) => {
  //   if (e.key === "Enter") {
  //     onLoginClick();
  //     history.push("/main");
  //   }
  // };

  return (
    <Container>
      <Title margin="66px 0 53px 0" text="로그인" />
      <LoginInput onChange={onEmailChange} />
      <PasswordInput
        onChange={onPasswordChange}
        // onKeyPress={onLoginPress}
      />
      {isBtnClick ? (
        isLogin ? null : (
          <Notification color="#FF6B6B" margin="4px 186px 0 0">
            로그인에 실패하였습니다.
          </Notification>
        )
      ) : null}
      {isLogin ? (
        <Link to="/">
          <BigButton text="로그인" margin="62px auto 12px auto" onClick={onLoginClick} />
        </Link>
      ) : (
        <BigButton text="로그인" margin="62px auto 12px auto" onClick={onLoginClick} />
      )}
      <Link to="/signup">
        <BigButton text="회원가입" background="white" color="#97BFB4" border="1px solid #97BFB4" margin="0 auto 50px auto" />
      </Link>
    </Container>
  );
}

export default LoginPage;
