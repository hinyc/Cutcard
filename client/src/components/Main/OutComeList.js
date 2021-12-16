import { useState } from 'react';
import styled from 'styled-components';
import SubTitle from './SubTitle';

import Content from './Content';
import TotalMoney from './TotalMoney';
import ContentContainer from './ContentContainer';

export const OutcomeContainer = styled.div`
  // border: solid 2px black;
  width: 300px;
  height: 470px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

// export const ContentContainer = styled.div``;
const OutComeList = ({ year, month }) => {
  return (
    <>
      <OutcomeContainer>
        <SubTitle title={`${year}.${month} 지출 내역`} />
        <ContentContainer>
          <Content item={`식비`} money={12343} />
        </ContentContainer>
        <TotalMoney totalMoney={33333} />
      </OutcomeContainer>
    </>
  );
};

export default OutComeList;
