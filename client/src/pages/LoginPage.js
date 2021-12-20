import React from "react";
import { LoginInput } from "../components/Input";
import { BigButton } from "../components/Button";
import { Container, Title } from "../components/Common";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <Container>
      <Title margin="66px 0 53px 0" text="로그인" />
      <LoginInput
        label="이메일"
        type="text"
        placeholder="이메일을 입력해주세요"
        margin="auto"
      />
      <LoginInput
        label="비밀번호"
        type="password"
        placeholder="비밀번호를 입력해주세요"
        margin="0 auto 50px auto"
      />
      <Link to="/">
        <BigButton text="로그인" margin="12px auto" />
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
