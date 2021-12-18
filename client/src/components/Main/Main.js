import { useState } from 'react';
import styled from 'styled-components';
import Calendar from './Calendar';
import Input from '../Input';
import Select from '../Select';
import View from './View';
import Submit from './Submit';

// dumydata
import dumyData, { newdumy } from '../../dumyData';
import { contained } from 'sequelize/dist/lib/operators';

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

const Main = ({ isLogin }) => {
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
  //! console tets 영역
  console.log(`Render! mainState:"${mainState}" date:${getDate}`);
  console.log(isLogin);
  //!
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

  //! mainpage
  // targetYear, target Month 해당 데이터의 income, outcome data를 모두 받아온다. 기준달 앞, 뒤 달의 데이터도 포함
  // 잔여금액은 해당 월의 수입이 지출이전에 발생하지 않는다면 수입전 항상 마이너스 금액을 나타낸다 ?
  console.log(newdumy);

  //? view로 전달할 정보
  // targetYear. targetMonth 해당 => 서버로 부터 받아온 데이터가 조건 충족!
  // income data => 카테고리별 합계, 총계
  // outcome data => 카테고리별 합계, 총계

  //? calendar로 전달할 정보

  const inOutDate = {};

  newdumy.transaction.map((el) => {
    const date = `${el.year}.${el.month}.${el.day}`;
    if (inOutDate[date] === undefined) {
      // 값이 없으면 추가
      if (el.isIncome) {
        inOutDate[date] = 1;
      } else {
        inOutDate[date] = 2;
      }
    } else {
      //값이 있다면
      if (inOutDate[date] === 1 && el.isIncome === false) {
        inOutDate[date] = 3;
      } else if (inOutDate[date] === 2 && el.isIncome === true) {
        inOutDate[date] = 3;
      }
    }
  });

  console.log('만드거', inOutDate);
  console.log('tans', newdumy.transaction);
  // console.log(newdumy.transaction[0].month);
  // console.log(newdumy.transaction[0].day);
  // console.log(newdumy.transaction[0].isIncome);

  console.log(inOutDate);
  //
  //@ 날짜별 지출 수입내역 수입만true 1, 지출만 2, 지출 수입 모두 3.
  // 그중, 지출이 있는 날짜, 수입이 있는 날짜 정보만 필요 => main page에서 가공해서 props로 전달  => 배열형식 데이터로 인자는 객체, {year, month, date, 수입지출 상태}

  const calendardata = {};

  //? detail view는 보류중
  // 진행한다면 선택된 날짜에 지출 수입 내역을 뷰창에 표시되로독한다.

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
            inOutDate={inOutDate}
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
