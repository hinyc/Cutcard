import { useState } from 'react';
import styled from 'styled-components';
import Calendar from './Calendar';
import Input from '../Input';
import Select from '../Select';
import ViewContainer from './ViewContainer';
import SubmitContainer from './SubmitContainer';

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
  flex-direction: column;
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

export const ResidualAmount = styled.div`
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

const Main = ({ mainStateHandler, inComes }) => {
  const [residualAmount, setResidualAmount] = useState(100000);
  return (
    <>
      <MainContainer>
        <ViewContainer />
        <CenterContainer>
          <Calendar inComes={inComes} />
        </CenterContainer>
        <SubmitContainer />
      </MainContainer>
    </>
  );
};

export default Main;
