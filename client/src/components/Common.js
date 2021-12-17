import React from "react";
import styled from "styled-components";

export const Container = styled.div`
  display: block;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const TitleStyle = styled.div`
  color: #7c8986;
  font-size: 20px;
  font-weight: 700;
  margin: ${(props) => props.margin};
`;

export const Title = ({ margin, text }) => (
  <TitleStyle margin={margin}>{text}</TitleStyle>
);
