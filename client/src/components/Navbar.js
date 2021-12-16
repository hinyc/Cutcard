import React, { useState } from 'react';
import styled from 'styled-components';

const Header = styled.header`
  box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, 0.07);
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 30px 10%;
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
  margin-right: ${(props) => props.marginRight || '90px'};
  padding-top: ${(props) => props.paddingTop || '8px'};

  &:hover {
    cursor: pointer;
    font-weight: 700;
    color: #7c8986;
  }
`;

function Navbar() {
  const [isLogin, setIsLogin] = useState(false);
  const Login = () => {
    setIsLogin(!isLogin);
  };

  return (
    <Header>
      <Nav>
        <Logo>Cut Card</Logo>
        <Menu paddingTop="0px">소개</Menu>
      </Nav>
      {isLogin ? (
        <>
          <Menu marginRight="20px">마이페이지</Menu>
          <Menu onClick={Login}>로그아웃</Menu>
        </>
      ) : (
        <Menu onClick={Login}>회원가입 / 로그인</Menu>
      )}
    </Header>
  );
}

export default Navbar;
