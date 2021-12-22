import React, { useState } from "react";
import { LoginInput, PasswordInput } from "../components/Input";
import { BigButton } from "../components/Button";
import { Container, Title } from "../components/Common";
import { Link } from "react-router-dom";

import axios from "axios";

function LoginPage({ setAccessToken, setUserCards, setUserInfo }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        "https://localhost:4000/users/login",
        {
          email: email,
          password: password,
          year: year,
          month: month,
        },
        {
          headers: {
            "Content-Type": "application/json",
            withCredentials: true,
          },
        }
      )
      .then((res) => {
        setUserCards(res.data.cards);
        setAccessToken(res.data.accessToken);
        setUserInfo(res.data.userInfo);
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
      <LoginInput
        label="이메일"
        type="text"
        placeholder="이메일을 입력해주세요"
        margin="auto"
        onChange={onEmailChange}
      />
      <PasswordInput
        label="비밀번호"
        type="password"
        placeholder="비밀번호를 입력해주세요"
        margin="0 auto 50px auto"
        onChange={onPasswordChange}
        // onKeyPress={onLoginPress}
      />
      <Link to="/">
        <BigButton text="로그인" margin="12px auto" onClick={onLoginClick} />
      </Link>
      <Link to="/signup">
        <BigButton
          text="회원가입"
          background="white"
          color="#97BFB4"
          border="1px solid #97BFB4"
          margin="0 auto 50px auto"
        />
      </Link>
    </Container>
  );
}

export default LoginPage;
