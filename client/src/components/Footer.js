import React from "react";
import styled from "styled-components";

const FooterStyle = styled.footer`
  display: flex;
  background-color: black;
`;

const Text = styled.div`
  font-size: 1rem;
  padding: 6rem 16%;
  color: white;
`;

function Footer() {
  return (
    <FooterStyle>
      <Text>
        류현
        <br />
        곽예찬
        <br />
        백윤서
        <br />
        홍인열
      </Text>
    </FooterStyle>
  );
}

export default Footer;
