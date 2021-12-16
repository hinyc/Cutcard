import { useState } from 'react';
import styled from 'styled-components';

export const CelandarContainer = styled.div`
  border: 2px solid black;
  width: 462px;
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
`;
export const Adate = styled.div`
  // border: 2px solid black;
  box-sizing: border-box;

  width: 66px;
  height: 55px;
`;

export const Calendar = () => {
  const [date, setDate] = useState(new Date());

  const [viewYear, setViewYear] = useState(date.getFullYear());
  const [viewMonth, setViewMonth] = useState(date.getMonth() + 1);

  const [preLast, setPreLast] = useState(new Date(viewYear, viewMonth, 0));
  const [thisLast, setThisLast] = useState(new Date(viewYear, viewMonth + 1, 0));

  const [PLDate, setPLDate] = useState(preLast.getDate());
  const [PLDay, setPLDay] = useState(preLast.getDay());

  const [TLDate, setTLDate] = useState(thisLast.getDate());
  const [TLDay, setTLDay] = useState(thisLast.getDay());

  const [prevDates, setPrevDates] = useState([]);
  const [thisDates, setThisDates] = useState([...Array(TLDate + 1).keys()].slice(1));
  const [nextDates, setNextDate] = useState([]);

  for (let i = 1; i < 7 - TLDay; i++) {
    nextDates.push(i);
  }

  const [dates, setDates] = useState(prevDates.concat(thisDates, nextDates));
  console.log(dates);

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return (
    <>
      <CelandarContainer>
        <Head>
          <YearMonth>{`${viewYear}년 ${viewMonth}월`}</YearMonth>
          <Nav>
            <Pre>&lt;</Pre>
            <Today>Today</Today>
            <Next>&gt;</Next>
          </Nav>
        </Head>
        <Days>
          <Days>
            {days.map((day, index) => (
              <Day key={index}>{day}</Day>
            ))}
          </Days>
        </Days>
        <Dates>{dates.map((day, index) => (day === 10 ? <Adate key={index}>{`${day}ggg`}</Adate> : <Adate key={index}>{day}</Adate>))}</Dates>
      </CelandarContainer>
    </>
  );
};
