import { useState } from 'react';
import styled from 'styled-components';
import { Input } from '../Input';
import { SmallButton } from '../Button';
import { Select } from '../Select';

//! Right
export const SubmitContainer = styled.div`
  box-sizing: border-box;
  /* border: solid 2px #97bfb4; */
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

export const InputDate = styled.div`
  box-sizing: border-box;
  height: ${(props) => props.height || '40px'};
  width: ${(props) => props.width || '335px'};
  padding-left: 13px;
  font-size: 16px;
  border: 1px solid #bfc5c4;
  border-radius: 5px;
  color: #7c8986;
  text-align: left;
  line-height: 40px;

  ::-webkit-input-placeholder {
    color: #bfc5c4;
  } /* Chrome/Opera/Safari */
  ::-moz-placeholder {
    color: #bfc5c4;
  } /* Firefox 19+ */
  :-ms-input-placeholder {
    color: #bfc5c4;
  } /* IE 10+ */
  :-moz-placeholder {
    color: #bfc5c4;
  } /* Firefox 18- */

  &:focus {
    outline: 1px solid #7c8986;
  }
`;

const AddInCome = (props) => {
  const {
    getDate, //
    inComeCategorys,
    category,
    categoryHandler,
    price,
    priceHandler,
    inputResetHandler,
    submitHandler,
    contentModifiyer,
    buttonModifyState,
  } = props;
  return (
    <>
      <InputContainer>
        <InputDate placeholder="날짜" width={`200px`}>
          {getDate}
        </InputDate>
        <Select text="수입 카테고리" width={`200px`} options={inComeCategorys} onChange={categoryHandler} value={category} margin={'0'} />
        <Input
          placeholder="금액을 입력해주세요" //
          width={`200px`}
          onChange={priceHandler}
          value={price}
          type={`number`}
          min={`0`}
          max={`999999999`}
        />
        {buttonModifyState ? (
          <SmallButton //
            text="수정"
            width={`200px`}
            margin={`18px 0 0 0 `}
            onClick={() => {
              contentModifiyer();
              inputResetHandler(true);
            }}
          />
        ) : (
          <SmallButton //
            text="입력"
            width={`200px`}
            margin={`18px 0 0 0 `}
            onClick={() => {
              submitHandler('incomes');
              inputResetHandler(true);
            }}
          />
        )}
      </InputContainer>
    </>
  );
};

const AddOutCome = (props) => {
  const {
    getDate, //
    outComeCategorys,
    category,
    categoryHandler,
    cash,
    cashHandler,
    card,
    cardHandler,
    price,
    priceHandler,
    inputResetHandler,
    userCards,
    submitHandler,
    contentModifiyer,

    buttonModifyState,
  } = props;
  const cardsList = userCards.map((el) => el.cardName);
  return (
    <>
      <InputContainer>
        <InputDate placeholder="날짜" width={`200px`}>
          {getDate}
        </InputDate>
        <Select text="지출 카테고리" width={`200px`} options={outComeCategorys} onChange={categoryHandler} value={category} margin={'0'} />
        <Select text="현금, 카드" width={`200px`} onChange={cashHandler} options={['현금', '카드']} value={cash} margin={'0'} />
        <Select text="카드를 선택하세요" width={`200px`} onChange={cardHandler} options={cardsList} value={card} margin={'0'} />
        <Input
          placeholder="금액을 입력해주세요" //
          width={`200px`}
          onChange={priceHandler}
          value={price}
          type={`number`}
          min={`0`}
          max={`999999999`}
        />
        {buttonModifyState ? (
          <SmallButton //
            text="수정"
            width={`200px`}
            margin={`18px 0 0 0 `}
            onClick={() => {
              inputResetHandler(false);
              contentModifiyer();
            }}
          />
        ) : (
          <SmallButton //
            text="입력"
            width={`200px`}
            margin={`18px 0 0 0 `}
            onClick={() => {
              submitHandler('outcomes');
              inputResetHandler(false);
            }}
          />
        )}
      </InputContainer>
    </>
  );
};

const Submit = (props) => {
  const {
    mainState, //
    getDate,
    categoryList,
    category,
    categoryHandler,
    cash,
    cashHandler,
    card,
    cardHandler,
    price,
    priceHandler,
    inputResetHandler,
    userCards,
    modifyState,
    submitHandler,
    buttonModifyState,
    contentModifiyer,
  } = props;

  const inComeCategorys = Object.keys(categoryList.inCome);
  const outComeCategorys = Object.keys(categoryList.outCome);

  return (
    <>
      <SubmitContainer>
        {mainState === 'income' ? ( //
          <AddInCome //
            getDate={getDate}
            inComeCategorys={inComeCategorys}
            category={category}
            categoryHandler={categoryHandler}
            price={price}
            priceHandler={priceHandler}
            inputResetHandler={inputResetHandler}
            submitHandler={submitHandler}
            modifyState={modifyState}
            buttonModifyState={buttonModifyState}
            contentModifiyer={contentModifiyer}
          />
        ) : (
          <AddOutCome //
            getDate={getDate}
            outComeCategorys={outComeCategorys}
            category={category}
            categoryHandler={categoryHandler}
            cash={cash}
            cashHandler={cashHandler}
            card={card}
            cardHandler={cardHandler}
            price={price}
            priceHandler={priceHandler}
            inputResetHandler={inputResetHandler}
            userCards={userCards}
            submitHandler={submitHandler}
            modifyState={modifyState}
            buttonModifyState={buttonModifyState}
            contentModifiyer={contentModifiyer}
          />
        )}
      </SubmitContainer>
    </>
  );
};

export default Submit;
