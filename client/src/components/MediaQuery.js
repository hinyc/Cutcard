import styled from "styled-components";

const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: grid;
  place-items: center;
`;

const ModalContainer = styled.div`
  text-align: center;
  margin: 120px auto;
`;

const ModalView = styled.div`
  border-radius: 20px;
  width: 300px;
  height: 150px;

  > div.desc {
    color: #ffffff;
    font-size: 16px;
    font-weight: 700;
    line-height: 30px;
  }
`;

const MediaQuery = () => {
  return (
    <ModalContainer>
      <ModalBackdrop>
        <ModalView>
          <div className="desc">
            |￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣|
            <br />
            앗! ( *Ꙩꙻ₀Ꙩꙻ)！
            <br />
            화면이 너무 작아요 <br /> 크기를 키워주세요!
            <br />
            |＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿|
            <br />
            (\__/)&nbsp;&nbsp;&nbsp;
            ||&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <br />
            (•ㅅ•).&nbsp;&nbsp;
            ||&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <br />/ . . .
            .&nbsp;&nbsp;づ&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </div>
        </ModalView>
      </ModalBackdrop>
    </ModalContainer>
  );
};

export default MediaQuery;
