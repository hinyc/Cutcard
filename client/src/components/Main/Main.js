import { useState } from 'react';
import styled from 'styled-components';
import Calendar from './Calendar';
import Input from '../Input';
import Select from '../Select';
import View from './View';
import Submit from './Submit';
import dumyData from '../../dumyData';

export const MainContainer = styled.div`
  width: 1130px;
  height: 550px;

  display: flex;
  align-content: flex-start;
  justify-content: space-between;
  border: solid 2px #97bfb4;
  margin: auto;
`;

//! Center
export const CenterContainer = styled.div`
  box-sizing: border-box;

  /* border: solid 2px #97bfb4; */
  width: 500px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

export const LeftMoney = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 15px 0 0 0;
  color: #7c8986;
  height: 70px;
`;

export const SubTitle = styled.div`
  font-size: 18px;
`;
export const Amount = styled.div`
  font-size: 26px; ;
`;

const Main = () => {
  const [leftMoney, setLeftMoney] = useState(1000000);
  const [year, setYear] = useState(2021);
  const [month, setMonth] = useState(12);

  // main pages ; income, outcome, detail changer
  const [mainState, setMainState] = useState('outcome');

  const mainStateHandler = (target) => {
    setMainState(target);
  };

  console.log(mainState);

  const dateHandler = (year, month) => {
    setYear(year);
    setMonth(month);
  };

  //! dumyData

  return (
    <>
      <MainContainer>
        <View year={year} month={month} mainStateHandler={mainStateHandler} mainState={mainState} data={dumyData} />
        <CenterContainer>
          <LeftMoney>
            <SubTitle>잔여 금액</SubTitle>
            <Amount>{`${leftMoney.toLocaleString('ko-KR')} 원`}</Amount>
          </LeftMoney>
          <Calendar data={dumyData} dateHandler={dateHandler} />
        </CenterContainer>
        <Submit mainState={mainState} />
      </MainContainer>
    </>
  );
};

export default Main;
