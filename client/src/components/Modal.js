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
  text-align: center;
  margin: 120px auto;
`;

const ModalView = styled.div`
  border-radius: 20px;
  background-color: #ffffff;
  width: 300px;
  height: 150px;

  > div.desc {
    margin-top: 40px;
    color: #7c8986;
  }
`;

const Modal = ({ onBackgroundClick, messageText, onClick, buttonText }) => {
  return (
    <ModalContainer>
      <ModalBackdrop onClick={onBackgroundClick}>
        <ModalView>
          <div className="desc">{messageText}</div>
          <ButtonStyle
            width="100px"
            margin="25px auto 0 auto"
            fontSize="14px"
            radius="30px"
            onClick={onClick}
          >
            {buttonText}
          </ButtonStyle>
        </ModalView>
      </ModalBackdrop>
    </ModalContainer>
  );
};

export default Modal;
