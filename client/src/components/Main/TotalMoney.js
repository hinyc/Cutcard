import React from 'react';
import styled from 'styled-components';

export const Container = styled.div`
  border: 2px solid black;
  width: 150px;
  line-height: 50px;
  color: red;
  font-weight: 700;
  margin: 30px 0;
  position: absolute;
  top: ${(props) => props.top || '350px'};
`;

export const TotalMoney = ({ totalMoney, top }) => {
  return <Container top={top}>{`${totalMoney.toLocaleString('ko-KR')} 원`}</Container>;
};

export default TotalMoney;
