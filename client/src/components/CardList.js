import React from "react";
import styled from "styled-components";
import { ReactComponent as Cancel } from "../assets/icons/Cancel.svg";

const CardStyle = styled.div`
  width: 100px;
  height: 32px;
  border: 1px solid #97bfb4;
  border-radius: 5px;
  background-color: ${(props) => props.background || "white"};
  margin: 10px 5px 0 5px;
`;

const Text = styled.span`
  color: #97bfb4;
  font-size: 14px;
  font-weight: 700;
  line-height: 32px;
  text-align: center;
  padding: 0 7px 0 15px;
`;

const Button = styled.button`
  background-color: white;
  outline: 0;
  border: 0;
  cursor: pointer;
`;

function CardList({ text }) {
  return (
    <CardStyle>
      <Text>{text}</Text>
      <Button>
        <Cancel />
      </Button>
    </CardStyle>
  );
}

export default CardList;
