import React from "react";
import styled from "styled-components";

const ButtonStyle = styled.button`
  color: white;
  outline: 0;
  border: 0;
  background-color: grey;
  justify-content: center;
  align-items: center;
  padding: 1rem 3rem;
  font-size: 1rem;
  font-weight: 400;
  &:hover {
    cursor: pointer;
    opacity: 80%;
  }
  &:active {
    cursor: pointer;
    opacity: 95%;
  }
`;

function Button({ text }) {
  return <ButtonStyle>{text}</ButtonStyle>;
}

export default Button;
