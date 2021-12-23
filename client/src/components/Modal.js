import styled from 'styled-components';
import { ButtonStyle } from './Button';

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
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;

  > div.desc {
    margin-top: 40px;
    color: #7c8986;
  }
`;

const ModalTitle = styled.div`
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 10px;
`;
const ModalContent = styled.div`
  font-weight: 600;
  margin: 5px 0;
`;
const Wrap = styled.div`
  color: #7c8986;
  padding: 20px 0;
  line-height: 20px;
  border: 1px solid #7c8986;
  border-radius: 10px;
  margin: 5px 0;
  width: 300px;
`;

const Link = styled.a`
  color: #7c8986;
  text-decoration: none;

  &:hover {
    cursor: pointer;
    font-weight: 700;
  }
`;

const Modal = ({
  onBackgroundClick,
  messageText,
  onClick,
  buttonText,
  modalData,
}) => {
  return (
    <ModalContainer>
      <ModalBackdrop onClick={onBackgroundClick}>
        <ModalView>
          <ModalTitle className="desc">Cut 가능한 카드 목록</ModalTitle>
          {modalData.map((el) => {
            return (
              <Wrap>
                <ModalContent>- {el.card.name} -</ModalContent>
                <div style={{ lineHeight: '25px' }}>
                  <Link href={el.card.address} target="_blank">
                    {`${el.card.name} Cut 하기 `}
                  </Link>
                  <div
                    style={{ lineHeight: '25px' }}
                  >{`고객센터: ${el.card.phoneNumber}`}</div>
                </div>
              </Wrap>
            );
          })}
          <ButtonStyle
            width="100px"
            margin="15px auto 25px auto"
            fontSize="16px"
            radius="30px"
            onClick={onClick}
          >
            확인
          </ButtonStyle>
        </ModalView>
      </ModalBackdrop>
    </ModalContainer>
  );
};

export default Modal;
