import { useState } from 'react';
import styled from 'styled-components';

//! Right
export const SubmitContainer = styled.div`
  box-sizing: border-box;
  border: solid 2px #97bfb4;
  width: 300px;
`;

export const SubHead = styled.div`
  border: solid 2px #97bfb4;
  color: #97bfb4;
  font-size: 26px;
  height: 70px;
  line-height: 70px;
`;
export const AddOutcome = styled.div`
  border: solid 2px #97bfb4;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const InputDate = styled.input`
  margin: 10px 0;
  width: 150px;
`;
export const InputOption = styled.input`
  margin: 10px 0;
  width: 150px;
`;
export const InputMoney = styled.input`
  margin: 10px 0;
  width: 150px;
`;
export const InputButton = styled.button`
  margin: 10px 0;
  width: 150px;
  font-size: 24px;
`;

const Submit = () => {
  return (
    <>
      <SubmitContainer></SubmitContainer>
    </>
  );
};

export default Submit;
