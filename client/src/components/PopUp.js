import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: "flex";
  justify-content: "center";
  align-items: "center";
  position: "fixed";
  bottom: 30;
  left: 0;
  width: "100%";
  height: 50;
`;

const Message = styled.div`
  text-align: "center";
  width: "30%";
  border-radius: 30;
  background: "grey";
  font-size: 20;
  color: "white";
`;

function PopUp({ message }) {
  return (
    <Container>
      <Message>
        <p>{message}</p>
      </Message>
    </Container>
  );
}

export default PopUp;
