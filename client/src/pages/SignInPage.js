import React, { useState } from "react";
import { Input, EmailInput, Notification } from "../components/Input";
import { BigButton } from "../components/Button";
import { Container, Title } from "../components/Common";
import { Link } from "react-router-dom";
import Select from "../components/Select";

function SignInPage() {
  const [email, setEmail] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [emailExists, setEmailExists] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const onEmailChange = (e) => {
    const emailValidator =
      /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    const result = emailValidator.test(e.target.value);
    console.log("이메일 유효성 검사", result);
    setIsEmail(result);
    setEmail(e.target.value);
  };

  const onEmailFocus = (e) => {
    setEmailFocused(true);
  };

  const emailExistsCheck = () => {
    setEmailExists(!emailExists);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onPasswordChangeCheck = (e) => {
    setPasswordCheck(e.target.value);
  };

  return (
    <Container>
      <Title margin="66px 0 px 0" text="회원가입" />
      <Input
        label="닉네임"
        type="text"
        placeholder="닉네임을 입력해주세요"
        margin="auto"
      />
      <EmailInput
        label="이메일"
        type="text"
        placeholder="이메일을 입력해주세요"
        margin="0 17px 0 106px"
        value={email}
        onChange={onEmailChange}
        onFocus={onEmailFocus}
        onClick={emailExistsCheck}
      />
      {emailFocused ? (
        email !== "" && isEmail ? (
          emailExists ? (
            <Notification color="#FF6B6B" margin="4px 160px 0 0">
              * 이미 존재하는 이메일입니다.
            </Notification>
          ) : (
            <Notification>* 사용 가능한 이메일입니다.</Notification>
          )
        ) : (
          <Notification color="#FF6B6B" margin="4px 175px 0 0">
            * 이메일 형식을 지켜주세요
          </Notification>
        )
      ) : null}
      <Input
        marginLabel="18px 255px 0 0"
        label="비밀번호"
        type="password"
        placeholder="비밀번호를 입력해주세요"
        margin="auto"
        value={password}
        onChange={onPasswordChange}
      />
      <Input
        marginLabel="18px 225px 0 0"
        label="비밀번호 확인"
        type="password"
        placeholder="비밀번호를 한번 더 입력해주세요"
        margin="auto"
        value={passwordCheck}
        onChange={onPasswordChangeCheck}
      />
      {password !== "" && password === passwordCheck ? (
        <Notification margin="4px 186px 0 0">
          * 비밀번호가 일치합니다.
        </Notification>
      ) : (
        <Notification color="#FF6B6B" margin="4px 152px 0 0">
          * 비밀번호가 일치하지 않습니다.
        </Notification>
      )}
      <Select
        label="카드 등록"
        text="카드를 선택해주세요"
        options={[
          "BC카드",
          "KB국민카드",
          "삼성카드",
          "신한카드",
          "우리카드",
          "하나카드",
          "롯데카드",
          "현대카드",
          "NH농협카드",
        ]}
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
