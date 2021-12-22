import React from 'react';
import styled from 'styled-components';

const ButtonStyle = styled.button`
  color: ${(props) => props.color || 'white'};
  width: ${(props) => props.width || '190px'};
  height: ${(props) => props.height || '40px'};
  margin: ${(props) => props.margin || '0'};
  bottom: ${(props) => props.bottom || '0'};
  position: ${(props) => props.position || 'none'};

  box-sizing: border-box;
  outline: 0;
  border: ${(props) => props.border || 0};
  background-color: ${(props) => props.background || '#97BFB4'};
  font-size: 16px;
  font-weight: 700;
  border-radius: 5px;
  display: block;
  /* text-decoration: none; */

  &:hover {
    cursor: pointer;
    opacity: 80%;
    /* text-decoration: none; */
  }

  &:active {
    cursor: pointer;
    opacity: 95%;
    /* text-decoration: none; */
  }

  &:visited {
    /* text-decoration: none; */
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

export function BigButton({ text, background, color, border, margin, onClick }) {
  return (
    <ButtonStyle width="335px" height="48px" background={background} color={color} border={border} margin={margin} onClick={onClick}>
      {text}
    </ButtonStyle>
  );
}
