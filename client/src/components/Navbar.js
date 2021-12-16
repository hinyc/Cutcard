import React, { useState } from 'react';
import styled from 'styled-components';

const HeaderStyle = styled.div`
  display: flex;
`;

const Logo = styled.button`
  background: white;
  border: 0;
  outline: 0;
  padding: 0.5rem;
  margin: 0.5rem 50% 0.5rem 15%;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  font-size: 2rem;
  font-weight: 900;

  &:hover {
    cursor: pointer;
    background: gray;
  }
`;

const LoginOrUser = styled.button`
  background: white;
  border: 0;
  outline: 0;
  margin: 0.5rem;
  font-size: 1rem;

  &:hover {
    cursor: pointer;
    background: gray;
  }
`;

const NavbarStyle = styled.div`
  background: black;
  display: flex;
`;

const Menu = styled.button`
  background: black;
  color: white;
  border: 0;
  outline: 0;
  padding: 1rem;
  margin: 0.5rem 1rem;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  font-size: 1rem;
  font-weight: 600;

  &:hover {
    cursor: pointer;
    background: gray;
  }
`;

function Navbar() {
  const [isLogin, setIsLogin] = useState(false);
  const Login = () => {
    setIsLogin(!isLogin);
  };

  return (
    <>
      <HeaderStyle>
        <Logo>Cut Card</Logo>
        <LoginOrUser onClick={Login}>{isLogin ? 'ㅇㅇ님 환영합니다' : '회원가입/로그인'}</LoginOrUser>
      </HeaderStyle>
      <NavbarStyle>
        <Menu style={{ marginLeft: '15%' }}>Menu 1</Menu>
        <Menu>Menu 2</Menu>
      </NavbarStyle>
    </>
  );
}

export default Navbar;
