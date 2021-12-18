import { useState } from 'react';
import styled from 'styled-components';

const AdateContainer = styled.div`
  box-sizing: border-box;

  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 66px;
  height: 50px;
  transition: 0.2s;

  &:hover {
    cursor: pointer;
    background-color: #97bfb4;
    opacity: 60%;
  }

  &:active {
    cursor: pointer;
    background-color: #97bfb4;
    opacity: 95%;
  }
`;
const DateNum = styled.div`
  color: ${(props) => props.color || 'black'};
`;
const DateNumSat = styled.div`
  color: ${(props) => props.color || 'blue'};
`;
const DateNumSun = styled.div`
  color: ${(props) => props.color || 'red'};
`;

const StateContainer = styled.div`
  width: 60px;
  display: flex;
  justify-content: center;
`;
const IncomeState = styled.div`
  width: 20px;
  height: 20px;
  margin: 1px;
`;
const IncomeStateTrue = styled.div`
  color: blue;
  text-align: right;
  width: 20px;
  height: 20px;
  margin: 1px;
`;
const OutcomeState = styled.div`
  width: 20px;
  height: 20px;
  margin: 1px;
`;
const OutcomeStateTrue = styled.div`
  color: red;
  text-align: left;
  width: 20px;
  height: 20px;
  margin: 1px;
`;

const gray = '#BFC5C4';

const DateMaker = (props) => {
  const {
    year, //
    month,
    date,
    index,
    onClick,
    color,
    inOutDate,
  } = props;

  //!console!
  console.log(`${year} ${month} ${date}`);
  console.log(inOutDate);
  return (
    <AdateContainer onClick={onClick}>
      {
        //
        (index + 1) % 7 === 0 ? (
          <DateNumSat color={color}>{date}</DateNumSat> //
        ) : index % 7 === 0 ? (
          <DateNumSun color={color}>{date}</DateNumSun>
        ) : (
          <DateNum color={color}>{date}</DateNum>
        )
      }
      <StateContainer>
        {inOutDate[`${year}.${month}.${date}`] === 1 || inOutDate[`${year}.${month}.${date}`] === 3 ? ( //
          <IncomeStateTrue>+</IncomeStateTrue>
        ) : (
          <IncomeState />
        )}
        {inOutDate[`${year}.${month}.${date}`] === 2 || inOutDate[`${year}.${month}.${date}`] === 3 ? ( //
          <OutcomeStateTrue>-</OutcomeStateTrue>
        ) : (
          <OutcomeState />
        )}
      </StateContainer>
    </AdateContainer>
  );
};

const Adate = (props) => {
  const {
    date, //
    year,
    month,
    index,
    inComes,
    outComes,
    dateHandler,
    inOutDate,
  } = props;

  return (
    <>
      {index < 6 && date - 10 > 0 ? ( //
        <DateMaker //
          year={new Date(year, month - 1, 0).getFullYear()}
          month={new Date(year, month - 1, 0).getMonth() + 1}
          date={date}
          index={index}
          color={gray}
          inOutDate={inOutDate}
          onClick={() => dateHandler(year, month - 1, date)}
        />
      ) : index > 20 && 10 - date > 0 ? (
        <DateMaker //
          year={new Date(year, month + 1, 0).getFullYear()}
          month={new Date(year, month + 1, 0).getMonth() + 1}
          date={date}
          index={index}
          color={gray}
          inOutDate={inOutDate}
          onClick={() => dateHandler(year, month + 1, date)}
        />
      ) : (
        <DateMaker //
          year={year}
          month={month}
          date={date}
          index={index}
          inOutDate={inOutDate}
          onClick={() => dateHandler(year, month, date)}
        />
      )}
    </>
  );
};

export default Adate;
