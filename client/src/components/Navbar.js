import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import axios from "axios";

const Header = styled.header`
  box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, 0.07);
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 30px 10%;
  margin-bottom: 40px;
`;

const Nav = styled.span`
  margin-right: auto;
`;

const Logo = styled.button`
  background-color: white;
  color: #97bfb4;
  border: 0;
  outline: 0;
  box-sizing: border-box;
  font-size: 2rem;
  font-weight: 900;
  margin-left: 90px;

  &:hover {
    cursor: pointer;
  }
`;

const Menu = styled.button`
  background-color: white;
  color: #97bfb4;
  border: 0;
  outline: 0;
  box-sizing: border-box;
  font-size: 1rem;
  margin-left: 50px;
  margin-right: ${(props) => props.marginRight || "90px"};
  padding-top: ${(props) => props.paddingTop || "8px"};

  &:hover {
    cursor: pointer;
    font-weight: 700;
    color: #7c8986;
  }
`;

function Navbar({ isLogin }) {
  const [login, setIsLogin] = useState(isLogin);

  // const LoginClick = () => {
  //   setIsLogin(true);
  // };

  // const LogoutClick = () => {
  //   setIsLogin(false);
  // };

  const onLogoutClick = () => {
    axios
      .get("http://localhost:4000/users/logout")
      .then((res) => console.log(res));
  };

  // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJodXVmeXVAbmF2ZXIuY29tIiwibmlja25hbWUiOiLjhYfslYjrhZXjhYciLCJjcmVhdGVkQXQiOiIyMDIxLTEyLTIwVDEyOjU1OjMzLjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIxLTEyLTIwVDEyOjU1OjMzLjAwMFoiLCJpYXQiOjE2NDAwMDg4ODEsImV4cCI6MTY0MDE4MTY4MX0.or_4YTtUy3EBOkSemOcf5KoILstUObLmASybHVuyRTc;
  const onMyPageClick = () => {
    axios
      .get("http://localhost:4000/users/userinfo", {
        withCredentials: true,
        credentials: "include",
      })
      .then((res) => console.log(res));
  };

  return (
    <Header>
      <Nav>
        <Link to="/main">
          <Logo>Cut Card</Logo>
        </Link>
        <Link to="/about">
          <Menu paddingTop="0px">소개</Menu>
        </Link>
      </Nav>
      {login ? (
        <>
          <Link to="/mypage">
            <Menu marginRight="20px" onClick={onMyPageClick}>
              마이페이지
            </Menu>
          </Link>
          <Menu onClick={onLogoutClick}>로그아웃</Menu>
        </>
      ) : (
        <Link to="/login">
          <Menu>회원가입 / 로그인</Menu>
        </Link>
      )}
    </Header>
  );
}

export default Navbar;
