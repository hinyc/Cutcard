import React from "react";
import { Input } from "../components/Input";
import { BigButton } from "../components/Button";
import { Container, Title } from "../components/Common";
import { Link } from "react-router-dom";
// import Select from "../components/Select";

function SignInPage() {
  return (
    <Container>
      <Title margin="66px 0 53px 0" text="회원가입" />
      <Input
        label="닉네임"
        type="text"
        placeholder="닉네임을 입력해주세요"
        margin="auto"
      />
      <Input
        label="이메일"
        type="text"
        placeholder="이메일을 입력해주세요"
        margin="auto"
      />
      <Input
        marginLabel="18px 255px 0 0"
        label="비밀번호"
        type="password"
        placeholder="비밀번호를 입력해주세요"
        margin="auto"
      />
      <Input
        marginLabel="18px 225px 0 0"
        label="비밀번호 확인"
        type="password"
        placeholder="비밀번호를 한번 더 입력해주세요"
        margin="0 auto 50px auto"
      />
      <Link to="/login">
        <BigButton text="가입하기" margin="12px auto" />
      </Link>
      <Link to="/">
        <BigButton
          text="취소"
          background="white"
          color="#97BFB4"
          border="1px solid #97BFB4"
          margin="0 auto 50px auto"
        />
      </Link>
    </Container>
  );
}

export default SignInPage;
