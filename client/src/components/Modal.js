import { useState } from "react";
import styled from "styled-components";
import { ButtonStyle } from "./Button";

const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: grid;
  place-items: center;
`;

const ModalContainer = styled.div`
  height: 15rem;
  text-align: center;
  margin: 120px auto;
`;

const ModalView = styled.div`
  border-radius: 10px;
  background-color: #ffffff;
  width: 350px;
  height: 150px;

  > span.close-btn {
    margin-top: 5px;
    cursor: pointer;
  }

  > div.desc {
    margin-top: 50px;
    color: #7c8986;
  }
`;

const Modal = ({ onClick, messageText, buttonText }) => {
  return (
    <ModalContainer>
      <ModalBackdrop onClick={onClick}>
        <ModalView>
          <div className="desc">{messageText}</div>
          <ButtonStyle>{buttonText}</ButtonStyle>
        </ModalView>
      </ModalBackdrop>
    </ModalContainer>
  );
};

export default Modal;
