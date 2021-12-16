import { useState, useEffect } from 'react';
import styled from 'styled-components';

export const CelandarContainer = styled.div`
  border: 2px solid black;
  width: 462px;
  height: 420px;
  margin: auto;
`;
export const Head = styled.div`
  height: 70px;
`;
export const YearMonth = styled.div``;
export const Nav = styled.div`
  height: 30px;
`;
export const Pre = styled.button``;
export const Today = styled.button``;
export const Next = styled.button``;

export const Days = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;
export const Day = styled.div`
  // border: 2px solid black;
  box-sizing: border-box;
  width: 66px;
  height: 30px;
`;

export const Dates = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
`;
export const Adate = styled.div`
  // border: 2px solid black;
  box-sizing: border-box;

  width: 66px;
  height: 50px;
`;
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const Calendar = () => {
  const [targetYear, setTargetYear] = useState(new Date().getFullYear());
  const [targetMonth, setTargetMonth] = useState(new Date().getMonth() + 1);

  const date = new Date(targetYear, targetMonth, 0);
  console.log(date);

  const viewYear = date.getFullYear();
  const viewMonth = date.getMonth() + 1;
  console.log(viewMonth);

  const preLastInfo = new Date(viewYear, viewMonth - 1, 0);
  const thisLastInfo = new Date(viewYear, viewMonth, 0);

  const preLastDate = preLastInfo.getDate();
  const preLastDay = preLastInfo.getDay();
  const thisLastDate = thisLastInfo.getDate();
  const thisLastDay = thisLastInfo.getDay();

  const prevDates = [];
  const thisDates = [...Array(thisLastDate + 1).keys()].slice(1);
  const nextDates = [];

  for (let i = 1; i < 7 - thisLastDay; i++) {
    prevDates.push(i);
  }

  for (let i = preLastDate; i > preLastDate - preLastDay - 1; i--) {
    prevDates.unshift(i);
  }

  const dates = prevDates.concat(thisDates, nextDates);

  const prevMonthHandler = () => {
    setTargetMonth(targetMonth - 1);
  };

  const nextMonthHandler = () => {
    setTargetMonth(targetMonth + 1);
  };

  return (
    <>
      <CelandarContainer>
        <Head>
          <YearMonth>{`${viewYear}년 ${viewMonth}월`}</YearMonth>
          <Nav>
            <Pre onClick={prevMonthHandler}>&lt;</Pre>
            <Today>Today</Today>
            <Next onClick={nextMonthHandler}>&gt;</Next>
          </Nav>
        </Head>

        <Days>
          {days.map((day, index) => (
            <Day key={index}>{day}</Day>
          ))}
        </Days>

        <Dates>{dates.map((day, index) => (day === 10 ? <Adate key={index}>{`${day}ggg`}</Adate> : <Adate key={index}>{day}</Adate>))}</Dates>
      </CelandarContainer>
    </>
  );
};
