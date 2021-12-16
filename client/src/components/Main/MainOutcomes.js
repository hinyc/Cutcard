import { useState } from 'react';
import styled from 'styled-components';
import Calendar from './Calendar';
import Input from '../Input';
import Select from '../Select';

export const MainContainer = styled.div`
  width: 1130px;
  height: 550px;
  color: red;
  display: flex;
  border: solid 2px black;
  margin: auto;
`;

//! Left
export const LeftContainer = styled.div`
  border: solid 2px black;
  width: 330px;
  display: flex;

  flex-wrap: wrap;
  justify-content: center;
  align-content: flex-start;
`;

export const ButtonContainer = styled.div`
  // border: solid 2px black;
  width: 230px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ChangeButton = styled.button`
  width: 70px;
  height: 40px;
  margin: 0 20px;
  font-size: 24px;
`;
export const OutcomeList = styled.div`
  // border: solid 2px black;
  width: 200px;
  height: 350px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
`;
export const OutcomeMoney = styled.div`
  color: black;
  margin: 10px 0;
`;
export const TotalMoney = styled.div`
  border: 2px solid black;
  // background-color: blue;
  width: 150px;
  line-height: 50px;
  color: red;
  font-weight: 700;
  margin: 30px 0; ;
`;

//! Center
export const CenterContainer = styled.div`
  border: solid 2px black;
  width: 500px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

export const LeftMoney = styled.div`
  // border: solid 2px black;
  font-size: 36px;
  height: 70px;
  line-height: 70px;
`;

//! Right
export const RigthContainer = styled.div`
  border: solid 2px black;
  width: 300px;
`;

export const SubHead = styled.div`
  border: solid 2px black;
  color: black;
  font-size: 26px;
  height: 70px;
  line-height: 70px;
`;
export const AddOutcome = styled.div`
  border: solid 2px black;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const InputDate = styled.input`
  margin: 10px 0;
  width: 150px;
`;
export const InputOption = styled.input`
  margin: 10px 0;
  width: 150px;
`;
export const InputMoney = styled.input`
  margin: 10px 0;
  width: 150px;
`;
export const InputButton = styled.button`
  margin: 10px 0;
  width: 150px;
  font-size: 24px;
`;

export const MainOutcomes = ({ mainStateHandler, outComes }) => {
  const [leftMoney, setLeftMoney] = useState(100000);
  const [livingExpenses, setLivingExpenses] = useState(500000);
  const [utilityBills, setUtilityBills] = useState(500000);
  const [premium, setPremium] = useState(500000);
  const [etcExpenses, setEtcExpenses] = useState(300000);
  const [totalMoney, setTotalMoney] = useState(livingExpenses + utilityBills + premium + etcExpenses);

  console.log(outComes);
  return (
    <>
      <MainContainer>
        <LeftContainer>
          <ButtonContainer>
            <ChangeButton
              onClick={() => {
                mainStateHandler('income');
              }}
            >
              수입
            </ChangeButton>
            <ChangeButton
              onClick={() => {
                mainStateHandler('outcome');
              }}
            >
              지출
            </ChangeButton>
          </ButtonContainer>
          <OutcomeList>
            <OutcomeMoney>{`생활비: ${livingExpenses}`}</OutcomeMoney>
            <OutcomeMoney>{`공과금: ${utilityBills}`}</OutcomeMoney>
            <OutcomeMoney>{`보험료: ${premium}`}</OutcomeMoney>
            <OutcomeMoney>{`추가지출: ${etcExpenses}`}</OutcomeMoney>
          </OutcomeList>
          <TotalMoney>{`지출합계: ${totalMoney}`}</TotalMoney>
        </LeftContainer>
        <CenterContainer>
          <LeftMoney>{`잔여 금액: ${leftMoney} 원`}</LeftMoney>
          <Calendar outComes={outComes} />
        </CenterContainer>
        <RigthContainer>
          <SubHead>지출 추가</SubHead>
          <AddOutcome>
            <Input text={'날짜'} />
            <Select text={'수입 카테고리'} options={['월급', '보너스', '기타']}></Select>
            <Select text={'현금, 카드'} options={['현금', '카드']}></Select>
            <Select text={'사용 카드'} options={['현대', '신한', '삼성', '국민', '하나', '우리', '농협']}></Select>

            <Input text={'금액을 입력해주세요'} />
          </AddOutcome>
          <InputButton>추가하기</InputButton>
        </RigthContainer>
      </MainContainer>
    </>
  );
};
