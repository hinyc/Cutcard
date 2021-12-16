import React from 'react';
import styled from 'styled-components';

export const Container = styled.div`
  text-align: right;
  width: 100px;
`;
export const Money = ({ money }) => {
  return <Container>{`${money.toLocaleString('ko-KR')} 원`}</Container>;
};

export default Money;
