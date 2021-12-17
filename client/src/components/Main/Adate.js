import { useState } from 'react';
import styled from 'styled-components';

const AdateContainer = styled.div`
  box-sizing: border-box;
  color: black;
  width: 66px;
  height: 50px;
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
const clickHandler = () => {
  console.log('준비중');
};
const Adate = (props) => {
  const { day, index, inComes, outComes, inComesDate } = props;

  const [inComeState, setInComeState] = useState(false);
  const [outComeState, setOutComeState] = useState(false);

  // console.log('inComes', inComes);
  // console.log('inComesDate', inComesDate);
  // console.log('outComes', outComes);
  // console.log(inComes[0].date.split('-')[2]);
  // console.log(day);

  // for (let i = 0; i < inComes.length; i++) {
  //   if (inComes[i].date.split('-')[2] === day) {
  //     setInComeState(true);
  //   }
  // }

  return (
    <>
      <AdateContainer onClick={clickHandler}>
        {
          //
          (index + 1) % 7 === 0 ? (
            <DateNumSat>{day}</DateNumSat> //
          ) : index % 7 === 0 ? (
            <DateNumSun>{day}</DateNumSun>
          ) : (
            <DateNum>{day}</DateNum>
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
