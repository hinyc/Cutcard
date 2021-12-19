import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Adate from './Adate';

export const CelandarContainer = styled.div`
  border: 2px solid #97bfb4;
  border-radius: 15px;
  width: 462px;
  height: 405px;
  margin: auto;
`;
export const Head = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
`;
export const Nav = styled.div`
  width: 410px;
  display: flex;
  justify-content: space-between;
  height: 30px;
  position: relative;
`;
export const YearMonth = styled.div`
  position: absolute;
  color: #7c8986;
  font-weight: 700;
  left: 40px;
  top: 5px;
`;
export const Arrow = styled.button`
  color: #97bfb4;
  background-color: white;
  font-size: large;
  outline: 0;
  border: 0;
  &:hover {
    cursor: pointer;
    opacity: 80%;
  }
`;
export const Today = styled.button``;

export const Days = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;
export const Day = styled.div`
  text-align: center;
  box-sizing: border-box;
  color: #97bfb4;
  width: 66px;
  height: 30px;
`;
export const DaySat = styled.div`
  text-align: center;
  box-sizing: border-box;
  color: blue;
  width: 66px;
  height: 30px;
`;
export const DaySun = styled.div`
  text-align: center;
  box-sizing: border-box;
  color: red;
  width: 66px;
  height: 30px;
`;

export const Dates = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
`;

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const Calendar = (props) => {
  const {
    data, //
    dateHandler,
    targetYear,
    targetMonth,
    pickDateHandler,
    inOutDate,
    mainStateHandler,
  } = props;
  //!

  // console.log(`달력 데이터 테스트`);
  // console.log(`${data}`);
  // console.dir(data);
  // console.log(data);

  //!
  //! calendar array generate
  const preLastInfo = new Date(targetYear, targetMonth - 1, 0);
  const thisLastInfo = new Date(targetYear, targetMonth, 0);

  const preLastDate = preLastInfo.getDate();
  const preLastDay = preLastInfo.getDay();
  const thisLastDate = thisLastInfo.getDate();
  const thisLastDay = thisLastInfo.getDay();

  const prevDates = [];
  const thisDates = [...Array(thisLastDate + 1).keys()].slice(1);
  const nextDates = [];

  if (preLastDay < 6) {
    for (let i = preLastDate; i > preLastDate - preLastDay - 1; i--) {
      prevDates.unshift(i);
    }
  }

  for (let i = 1; i < 7 - thisLastDay; i++) {
    nextDates.push(i);
  }

  const dates = prevDates.concat(thisDates, nextDates);
  //! -----------

  const prevMonthHandler = () => {
    pickDateHandler(targetYear, targetMonth - 1);
  };

  const nextMonthHandler = () => {
    pickDateHandler(targetYear, targetMonth + 1);
  };

  return (
    <>
      <CelandarContainer>
        <Head>
          <Nav>
            <Arrow onClick={prevMonthHandler}>&lt;</Arrow>
            <YearMonth>{`${targetYear}년 ${targetMonth}월`}</YearMonth>
            {/* <Today>Today</Today> */}
            <Arrow onClick={nextMonthHandler}>&gt;</Arrow>
          </Nav>
        </Head>

        <Days>
          {days.map((day, index) =>
            day === 'Sat' ? ( //
              <DaySat key={index}>{day}</DaySat>
            ) : day === 'Sun' ? (
              <DaySun key={index}>{day}</DaySun>
            ) : (
              <Day key={index}>{day}</Day>
            )
          )}
        </Days>

        <Dates>
          {dates.map((date, index) => (
            <Adate //
              key={index}
              date={date}
              year={targetYear}
              month={targetMonth}
              index={index}
              data={data}
              dateHandler={dateHandler}
              inOutDate={inOutDate}
              mainStateHandler={mainStateHandler}
            />
          ))}
        </Dates>
      </CelandarContainer>
    </>
  );
};

export default Calendar;
