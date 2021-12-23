import React from "react";
import styled from "styled-components";

const FooterStyle = styled.footer`
  display: flex;
  background-color: ${(props) => props.color || "white"};
  height: 40px;
  padding: ${(props) => props.padding || "0px"};
  justify-content: space-around;
  align-items: center;

  @media only screen and (max-width: 910px) {
    background-color: rgba(0, 0, 0, 0);
  }
`;

const Left = styled.span`
  margin-right: auto;
`;

const Margin = styled.ul`
  margin: ${(props) => props.margin || "0px"};
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
      <FooterStyle padding="130px 10% 50px 10%">
        <Left>
          <Margin>
            <Member size="24px">Cut Card</Member>
            <Member>© 2021 CutCard, Inc.</Member>
          </Margin>
        </Left>
        <Margin margin="0 100px 0 0">
          <Member>류현</Member>
          <Member>곽예찬</Member>
          <Member>백윤서</Member>
          <Member>홍인열</Member>
        </Margin>
      </FooterStyle>
      <FooterStyle color="#97bfb4" />
    </>
  );
}

export default Footer;
