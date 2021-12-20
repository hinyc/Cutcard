import React from "react";
import styled from "styled-components";

const CardStyle = styled.div`
  width: 100px;
  height: 32px;
  border: 1px solid #97bfb4;
  border-radius: 5px;
  background-color: ${(props) => props.background || "white"};
  margin: 10px 5px 0 5px;
  cursor: pointer;
`;

const Text = styled.span`
  color: ${(props) => props.color || "#97bfb4"};
  font-size: 14px;
  font-weight: 700;
  line-height: 32px;
  text-align: center;
  padding: 0 7px 0 15px;

  &:hover {
    color: #7c8986;
    font-weight: 900;
  }
`;

const Button = styled.button`
  background-color: ${(props) => props.BtnBackground || "white"};
  color: ${(props) => props.xColor || "#97bfb4"};
  outline: 0;
  border: 0;
  cursor: pointer;

  &:hover {
    color: #7c8986;
    font-weight: 900;
  }
`;

function CardList({
  text,
  onTextClick,
  onClick,
  background,
  color,
  xColor,
  btnBackground,
}) {
  return (
    <CardStyle background={background} onClick={onTextClick}>
      <Text color={color}>{text}</Text>
      <Button xColor={xColor} BtnBackground={btnBackground} onClick={onClick}>
        𝗫
      </Button>
    </CardStyle>
  );
}

export default CardList;
