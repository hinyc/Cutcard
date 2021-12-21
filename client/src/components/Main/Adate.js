import { useState } from 'react';
import styled from 'styled-components';

const AdateContainer = styled.div`
  box-sizing: border-box;
  border: 3px solid rgba(255, 0, 0, 0);

  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 66px;
  height: 50px;
  transition: 0.2s;

  &:hover {
    cursor: pointer;
    background-color: #97bfb4;
    /* border: 3px solid #97bfb4; */
    font-weight: 700;
    opacity: 65%;
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
  height: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
const IncomeState = styled.div`
  width: 23px;
  height: 7px;
  margin: 1px;
`;
const IncomeStateTrue = styled.div`
  background-color: skyblue;
  border-radius: 3px;
  color: blue;
  text-align: right;
  width: 23px;
  height: 7px;
  margin: 1px;
`;
const OutcomeState = styled.div`
  width: 23px;
  height: 7px;
  margin: 1px;
`;
const OutcomeStateTrue = styled.div`
  background-color: pink;
  border-radius: 3px;
  color: red;
  text-align: left;
  width: 23px;
  height: 7px;
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
          <IncomeStateTrue></IncomeStateTrue>
        ) : (
          <IncomeState />
        )}
        {inOutDate[`${year}.${month}.${date}`] === 2 || inOutDate[`${year}.${month}.${date}`] === 3 ? ( //
          <OutcomeStateTrue></OutcomeStateTrue>
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
    dateHandler,
    inOutDate,
    mainStateHandler,
    setModifyState,
    modifyStateHandler,
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
          modifyStateHandler={modifyStateHandler}
          onClick={() => {
            dateHandler(year, month - 1, date);
            // setModifyState(true);
            modifyStateHandler();
          }}
        />
      ) : index > 20 && 10 - date > 0 ? (
        <DateMaker //
          year={new Date(year, month + 1, 0).getFullYear()}
          month={new Date(year, month + 1, 0).getMonth() + 1}
          date={date}
          index={index}
          color={gray}
          inOutDate={inOutDate}
          modifyStateHandler={modifyStateHandler}
          onClick={() => {
            dateHandler(year, month + 1, date);
            // setModifyState(true);

            modifyStateHandler();
          }}
        />
      ) : (
        <DateMaker //
          year={year}
          month={month}
          date={date}
          index={index}
          inOutDate={inOutDate}
          modifyStateHandler={modifyStateHandler}
          onClick={() => {
            dateHandler(year, month, date);
            // setModifyState(true);

            modifyStateHandler();
          }}
        />
      )}
    </>
  );
};

export default Adate;
