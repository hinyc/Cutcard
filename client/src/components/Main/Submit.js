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

const testIncomeSubmiter = (getDate, category, price) => {
  console.log(
    `{
      year: ${getDate.split('-')[0]},
      month: ${getDate.split('-')[1]},
      date: ${getDate.split('-')[2]},
      category: ${category},
      price: ${price}
    }`
  );
};

const testOutComeSubmiter = (getDate, category, cash, card, price) => {
  console.log(
    `{
      year: ${getDate.split('-')[0]},
      month: ${getDate.split('-')[1]},
      date: ${getDate.split('-')[2]},
      category: ${category},
      cash: ${cash},
      card: ${card},
      price: ${price}
    }`
  );
};

const AddInCome = (props) => {
  const {
    getDate, //
    inComeCategorys,
    category,
    categoryHandler,
    price,
    priceHandler,
    inputResetHandler,
  } = props;
  return (
    <>
      <InputContainer>
        <InputDate placeholder="날짜" width={`200px`}>
          {getDate}
        </InputDate>
        <Select text="수입 카테고리" width={`200px`} options={inComeCategorys} onChange={categoryHandler} value={category} margin={'0'} />
        <Input placeholder="금액을 입력해주세요" width={`200px`} onChange={priceHandler} value={price} />
        <SmallButton //
          text="입력"
          width={`200px`}
          margin={`18px 0 0 0 `}
          onClick={() => {
            testIncomeSubmiter(getDate, category, price);
            inputResetHandler();
          }}
        />
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
    cards,
  } = props;
  const cardsList = cards.map((el) => el.name);
  return (
    <>
      <InputContainer>
        <InputDate placeholder="날짜" width={`200px`}>
          {getDate}
        </InputDate>
        <Select text="지출 카테고리" width={`200px`} options={outComeCategorys} onChange={categoryHandler} value={category} margin={'0'} />
        <Select text="현금, 카드" width={`200px`} onChange={cashHandler} options={['현금', '카드']} value={cash} margin={'0'} />
        <Select text="카드를 선택하세요" width={`200px`} onChange={cardHandler} options={cardsList} value={card} margin={'0'} />
        <Input placeholder="금액을 입력해주세요" width={`200px`} onChange={priceHandler} value={price} />
        <SmallButton //
          text="입력"
          margin={`18px 0 0 0 `}
          width={`200px`}
          onClick={() => {
            testOutComeSubmiter(getDate, category, cash, card, price);
            inputResetHandler();
          }}
        />
      </InputContainer>
    </>
  );
};

const Modify = (props) => {
  const {
    getDate, //
    inComeCategorys,
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
    cards,
    modifyState,
  } = props;
  const cardsList = cards.map((el) => el.name);
  return (
    <>
      {modifyState === 'income' ? (
        //inCome 수정
        <InputContainer>
          <InputDate placeholder="날짜" width={`200px`}>
            {getDate}
          </InputDate>
          <Select text="수입 카테고리" width={`200px`} options={inComeCategorys} onChange={categoryHandler} value={category} margin={'0'} />
          <Input placeholder="금액을 입력해주세요" width={`200px`} onChange={priceHandler} value={price} />
          <SmallButton //
            text="수정"
            width={`200px`}
            margin={`18px 0 0 0 `}
            onClick={() => {
              testIncomeSubmiter(getDate, category, price);
              inputResetHandler();
            }}
          />
        </InputContainer>
      ) : (
        //outCome 수정
        <InputContainer>
          <InputDate placeholder="날짜" width={`200px`}>
            {getDate}
          </InputDate>
          <Select text="지출 카테고리" width={`200px`} options={outComeCategorys} onChange={categoryHandler} value={category} margin={'0'} />
          <Select text="현금, 카드" width={`200px`} onChange={cashHandler} options={['현금', '카드']} value={cash} margin={'0'} />
          <Select text="카드를 선택하세요" width={`200px`} onChange={cardHandler} options={cardsList} value={card} margin={'0'} />
          <Input placeholder="금액을 입력해주세요" width={`200px`} onChange={priceHandler} value={price} />
          <SmallButton //
            text="수정"
            margin={`18px 0 0 0 `}
            width={`200px`}
            onClick={() => {
              testOutComeSubmiter(getDate, category, cash, card, price);
              inputResetHandler();
            }}
          />
        </InputContainer>
      )}
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
    cards,
    modifyState,
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
          />
        ) : mainState === 'outcome' ? (
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
            cards={cards}
          />
        ) : mainState === 'detail' ? (
          <Modify
            getDate={getDate}
            category={category}
            inComeCategorys={inComeCategorys}
            outComeCategorys={outComeCategorys}
            categoryHandler={categoryHandler}
            cash={cash}
            cashHandler={cashHandler}
            card={card}
            cardHandler={cardHandler}
            price={price}
            priceHandler={priceHandler}
            inputResetHandler={inputResetHandler}
            cards={cards}
            modifyState={modifyState}
          />
        ) : null}
      </SubmitContainer>
    </>
  );
};

export default Submit;
