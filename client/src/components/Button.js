import React from "react";
import styled from "styled-components";

export const ButtonStyle = styled.button`
  color: ${(props) => props.color || "white"};
  width: ${(props) => props.width || "190px"};
  height: ${(props) => props.height || "40px"};
  margin: ${(props) => props.margin || "0"};
  bottom: ${(props) => props.bottom || "0"};
  position: ${(props) => props.position || "none"};
  box-sizing: border-box;
  outline: 0;
  border: ${(props) => props.border || 0};
  background-color: ${(props) => props.background || "#97BFB4"};
  font-size: ${(props) => props.fontSize || "16px"};
  font-weight: 700;
  border-radius: ${(props) => props.radius || "5px"};
  display: block;
  opacity: ${(props) => props.opacity || "100%"};

  &:hover {
    cursor: ${(props) => props.cursor || "pointer"};
    opacity: ${(props) => props.hoverOpacity || "80%"};
  }

  &:active {
    cursor: pointer;
    opacity: 95%;
  }

  @media only screen and (max-width: 910px) {
    color: rgba(0, 0, 0, 0.1);
    background-color: rgba(0, 0, 0, 0.1);
    border: rgba(0, 0, 0, 0.1);
  }
`;

export function SmallButton(props) {
  const {
    text, //
    width,
    height,
    margin,
    background,
    color,
    border,
    onClick,
    position,
    bottom,
  } = props;
  return (
    <ButtonStyle
      width={width} //
      height={height}
      margin={margin}
      onClick={onClick}
      background={background}
      color={color}
      border={border}
      position={position}
      bottom={bottom}
    >
      {text}
    </ButtonStyle>
  );
}

export function BigButton({
  text,
  background,
  color,
  border,
  margin,
  onClick,
  disabled,
  opacity,
  hoverOpacity,
  cursor,
}) {
  return (
    <ButtonStyle
      width="335px"
      height="48px"
      background={background}
      color={color}
      border={border}
      margin={margin}
      onClick={onClick}
      disabled={disabled}
      opacity={opacity}
      hoverOpacity={hoverOpacity}
      cursor={cursor}
    >
      {text}
    </ButtonStyle>
  );
}
