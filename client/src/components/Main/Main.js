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
  border-radius: 15px;
  display: flex;
  align-content: flex-start;
  justify-content: space-between;
  border: solid 3px #97bfb4;
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
  const [mainState, setMainState] = useState('outcome');
  // Calendar
  const [pickDate, setPickDate] = useState(new Date());
  const targetYear = pickDate.getFullYear();
  const targetMonth = pickDate.getMonth() + 1;
  const [targetDate, setTargetDate] = useState(pickDate.getDate());
  const getDate = `${targetYear}-${targetMonth}-${targetDate}`;

  //Submit
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [card, setCard] = useState('');
  const [cash, setCash] = useState('');

  console.log(`Render! mainState:"${mainState}" date:${getDate}`);

  const mainStateHandler = (target) => {
    setMainState(target);
    inputResetHandler();
  };

  //Calendar
  const pickDateHandler = (year, month) => {
    setPickDate(new Date(year, month, 0));
  };

  const dateHandler = (year, month, date) => {
    setPickDate(new Date(year, month, 0));
    setTargetDate(date);
  };

  //Submit
  const priceHandler = (e) => {
    setPrice(e.target.value);
  };
  const categoryHandler = (e) => {
    setCategory(e.target.value);
  };
  const cardHandler = (e) => {
    setCard(e.target.value);
  };
  const cashHandler = (e) => {
    setCash(e.target.value);
  };

  const inputResetHandler = () => {
    setCategory('');
    setPrice('');
    setCard('');
    setCash('');
  };

  //! dumyData

  //? view로 전달할 정보

  //? calendar로 전달할 정보

  //? submit에서 받아올 정보

  return (
    <>
      <MainContainer>
        <View
          year={targetYear} //
          month={targetMonth}
          mainStateHandler={mainStateHandler}
          mainState={mainState}
          data={dumyData}
        />
        <CenterContainer>
          <LeftMoney>
            <SubTitle>잔여 금액</SubTitle>
            <Amount>{`${leftMoney.toLocaleString('ko-KR')} 원`}</Amount>
          </LeftMoney>
          <Calendar //
            data={dumyData}
            dateHandler={dateHandler}
            targetYear={targetYear}
            targetMonth={targetMonth}
            pickDateHandler={pickDateHandler}
          />
        </CenterContainer>
        <Submit
          mainState={mainState} //
          getDate={getDate}
          category={category}
          categoryHandler={categoryHandler}
          cash={cash}
          cashHandler={cashHandler}
          card={card}
          cardHandler={cardHandler}
          price={price}
          priceHandler={priceHandler}
          inputResetHandler={inputResetHandler}
        />
      </MainContainer>
    </>
  );
};

export default Main;
