import { useState } from 'react';
import styled from 'styled-components';

const AdateContainer = styled.div`
  box-sizing: border-box;
  border-radius: 10px;
  color: black;
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
  color: black;
`;
const DateNumSat = styled.div`
  color: blue;
`;
const DateNumSun = styled.div`
  color: red;
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
  background-color: green;
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
  background-color: royalblue;
  width: 20px;
  height: 20px;
  margin: 1px;
`;
const clickHandler = (year, month, date) => {
  console.log(`준비중 ${year}.${month}.${date}`);
};
const Adate = (props) => {
  const { date, year, month, index, inComes, outComes, inComesDate, dateHandler } = props;

  const [inComeState, setInComeState] = useState(false);
  const [outComeState, setOutComeState] = useState(false);

  // console.log('inComes', inComes);
  // console.log('inComesDate', inComesDate);
  // console.log('outComes', outComes);
  // console.log(inComes[0].date.split('-')[2]);
  // console.log(date);

  // for (let i = 0; i < inComes.length; i++) {
  //   if (inComes[i].date.split('-')[2] === date) {
  //     setInComeState(true);
  //   }
  // }

  return (
    <>
      <AdateContainer
        onClick={() => {
          dateHandler(year, month, date);
        }}
      >
        {
          //
          (index + 1) % 7 === 0 ? (
            <DateNumSat>{date}</DateNumSat> //
          ) : index % 7 === 0 ? (
            <DateNumSun>{date}</DateNumSun>
          ) : (
            <DateNum>{date}</DateNum>
          )
        }
        <StateContainer>
          {inComeState ? <IncomeStateTrue /> : <IncomeState />}
          {outComeState ? <OutcomeStateTrue /> : <OutcomeState />}
        </StateContainer>
      </AdateContainer>
    </>
  );
};

export default Adate;
