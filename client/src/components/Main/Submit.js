import { useState } from 'react';
import styled from 'styled-components';
import { Input } from '../Input';
import { SmallButton } from '../Button';
import Select from '../Select';

//! Right
export const SubmitContainer = styled.div`
  box-sizing: border-box;
  border: solid 2px #97bfb4;
  width: 300px;
  position: relative;
`;

export const SubHead = styled.div`
  border: solid 2px #97bfb4;
  color: #97bfb4;
  font-size: 26px;
  height: 70px;
  line-height: 70px;
`;

export const InputContainer = styled.div`
  width: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 100px;
`;

const AddInCome = () => {
  return (
    <>
      <InputContainer>
        <Input text="날짜" width={`200px`} />
        <Select text="수입 카테고리" width={`200px`} options={['월급', '보너스', '기타']} />
        <Input text="금액을 입력해주세요" width={`200px`} />
        <SmallButton text="입력" width={`200px`} margin={`18px 0 0 0 `} />
      </InputContainer>
    </>
  );
};

const AddOutCome = () => {
  return (
    <>
      <InputContainer>
        <Input text="날짜" width={`200px`} />
        <Select text="지출 카테고리" width={`200px`} options={['식비', '공과금', '기타']} />
        <Select text="현금, 카드" width={`200px`} options={['현금', '카드']} />
        <Select text="사용 카드" width={`200px`} options={['삼성', '하나']} />
        <Input text="금액을 입력해주세요" width={`200px`} />
        <SmallButton text="입력" margin={`18px 0 0 0 `} width={`200px`} />
      </InputContainer>
    </>
  );
};

const Submit = ({ mainState }) => {
  return (
    <>
      <SubmitContainer>
        {mainState === 'income' ? ( //
          <AddInCome />
        ) : mainState === 'outcome' ? (
          <AddOutCome />
        ) : null}
      </SubmitContainer>
    </>
  );
};

export default Submit;
