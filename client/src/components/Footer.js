import React from "react";
import styled from "styled-components";

const FooterStyle = styled.footer`
  display: flex;
  background-color: ${(props) => props.color || "white"};
  height: 32px;
  padding: ${(props) => props.padding || "0px"};
`;

const Member = styled.li`
  font-size: ${(props) => props.size || "14px"};
  display: inline-block;
  color: #97bfb4;
  margin: 10px 0px 10px 30px;
`;

function Footer() {
  return (
    <>
      <FooterStyle padding="150px 0 150px 200px">
        <ul>
          <Member size="24px">Cut Card</Member>
          <Member>류현</Member>
          <Member>곽예찬</Member>
          <Member>백윤서</Member>
          <Member>홍인열</Member>
        </ul>
      </FooterStyle>
      <FooterStyle color="#97bfb4" />
    </>
  );
}

export default Footer;
