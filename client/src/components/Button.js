import React from 'react';
import styled from 'styled-components';

const ButtonStyle = styled.button`
  color: ${(props) => props.background || 'white'};
  width: ${(props) => props.width || '190px'};
  height: ${(props) => props.height || '40px'};
  margin: ${(props) => props.margin || '0'};
  box-sizing: border-box;
  outline: 0;
  border: 0;
  background-color: ${(props) => props.background || '#97BFB4'};
  font-size: 1rem;
  font-weight: 700;
  border-radius: 5px;

  &:hover {
    cursor: pointer;
    opacity: 80%;
  }

  &:active {
    cursor: pointer;
    opacity: 95%;
  }
`;

export function SmallButton(props) {
  const {
    text, //
    width,
    height,
    onClick,
    margin,
  } = props;
  return (
    <ButtonStyle width={width} height={height} margin={margin} onClick={onClick}>
      {text}
    </ButtonStyle>
  );
}

export function BigButton({ text }) {
  return (
    <ButtonStyle width="335px" height="48px">
      {text}
    </ButtonStyle>
  );
}
