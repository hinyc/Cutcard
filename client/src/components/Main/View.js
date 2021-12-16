import { useState } from 'react';
import styled from 'styled-components';
import OutComeList from './OutComeList';
import { SmallButton } from '../Button';

export const ViewContainer = styled.div`
  box-sizing: border-box;
  border: solid 2px #97bfb4;
  width: 330px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const ButtonContainer = styled.div`
  border: solid 2px #97bfb4;
  width: 230px;
  height: 70px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
export const ChangeButton = styled.button`
  width: 70px;
  height: 40px;
  margin: 0 20px;
  font-size: 24px;
`;

const View = ({ year, month, mainStateHandler }) => {
  return (
    <>
      <ViewContainer>
        <ButtonContainer>
          <SmallButton text={`수입`} width="80px" handler={mainStateHandler} state="income" />
          <SmallButton text={`지출`} width="80px" handler={mainStateHandler} state="outcome" />
        </ButtonContainer>
        <OutComeList year={year} month={month} />
      </ViewContainer>
    </>
  );
};

export default View;
