import React, { useState } from "react";
import { LoginInput, PasswordInput } from "../components/Input";
import { BigButton } from "../components/Button";
import { Container, Title } from "../components/Common";
import { Notification } from "../components/Input";
import { useNavigate } from "react-router-dom";
import axios from "axios";

<<<<<<< HEAD
import axios from 'axios';

=======
>>>>>>> 7c20fbd987b45cd1c11c19354307b8d63f60e5fc
function LoginPage({
  setAccessToken,
  setUserCards,
  setUserInfo,
  setIsLogin,
  isLogin,
  setTransaction,
}) {
<<<<<<< HEAD
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
=======
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
>>>>>>> 7c20fbd987b45cd1c11c19354307b8d63f60e5fc
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
        "http://localhost:4000/users/login",
        {
          email: email,
          password: password,
          year: year,
          month: month,
        },
        {
          headers: {
<<<<<<< HEAD
            'Content-Type': 'application/json',
            withCredentials: true,
=======
            "Content-Type": "application/json",
>>>>>>> 7c20fbd987b45cd1c11c19354307b8d63f60e5fc
          },
        },
      )
      .then((res) => {
        console.log(res);
        setIsLogin(true);
        setUserCards(res.data.cards);
        setAccessToken(res.data.accessToken);
        setUserInfo(res.data.userInfo);
<<<<<<< HEAD
        //? 이 안에서 main 페이지로 이동할 수 있도록 조적
=======
        setTransaction(res.data.transaction);
        // setTimeout(function () {
        navigate("/");
        // }, 800);
>>>>>>> 7c20fbd987b45cd1c11c19354307b8d63f60e5fc
      })
      .catch((err) => {
        setIsBtnClick(true);
        setIsLogin(false);
        console.error(err);
      });
  };

  const onLoginPress = (e) => {
    if (e.key === "Enter") {
      onLoginClick();
    }
  };

  const onSignUpClick = () => {
    navigate("/signup");
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
<<<<<<< HEAD
      {isLogin ? (
        <Link to="/">
          <BigButton
            text="로그인"
            margin="62px auto 12px auto"
            onClick={onLoginClick}
          />
        </Link>
      ) : (
        <BigButton
          text="로그인"
          margin="62px auto 12px auto"
          onClick={onLoginClick}
        />
      )}
      <Link to="/signup">
        <BigButton
          text="회원가입"
          background="white"
          color="#97BFB4"
          border="1px solid #97BFB4"
          margin="0 auto 50px auto"
        />
      </Link>
=======
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
>>>>>>> 7c20fbd987b45cd1c11c19354307b8d63f60e5fc
    </Container>
  );
}

export default LoginPage;
