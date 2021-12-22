import { useState } from 'react';
import styled from 'styled-components';
import { PriceInput } from '../Input';
import { SmallButton } from '../Button';
import { Select } from '../Select';

//! Right
export const SubmitContainer = styled.div`
  box-sizing: border-box;
  /* border: solid 2px #97bfb4; */
  display: flex;
  flex-direction: column;
  align-items: center;
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
  /* position: absolute;
  top: 130px; */
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
  margin-top: 130px;

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
const wrap = styled.div`
  width: ${(props) => props.width || '40px'};
  height: ${(props) => props.height || '40px'};
  top: ${(props) => props.top || '0px'};
  left: ${(props) => props.left || '0px'};
  right: ${(props) => props.right || '0px'};
  bottom: ${(props) => props.bottom || '0px'};
  position: ${(props) => props.position || '40px'};
  color: ${(props) => props.color || 'none'};
  margin: ${(props) => props.margin || '0'};
`;
const RequestMessage = styled.div`
  box-sizing: border-box;
  padding-left: 15px;
  color: #ff6b6b;
  width: 200px;
  text-align: left;
  line-height: 14px;

  font-size: 14px;
  font-weight: 700;
  /* position: absolute;
  bottom: 150px; */
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
    requestMessage,
  } = props;
  console.log(requestMessage);
  return (
    <>
      <InputContainer>
        <InputDate placeholder="날짜" width={`200px`}>
          {getDate}
        </InputDate>
        <Select
          text="수입 유형" //
          width={`200px`}
          options={inComeCategorys}
          onChange={categoryHandler}
          value={category}
          margin={`10px 0 10px 0`}
          padding={`0`}
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
    userCards,
    submitHandler,
    contentModifiyer,
    buttonModifyState,
    requestMessage,
  } = props;
  const cardsList = userCards.map((el) => el.cardName);
  console.log(cash);
  console.log(cash === '카드' ? `40px` : `0px`);
  return (
    <>
      <InputContainer>
        <InputDate placeholder="날짜" width={`200px`}>
          {getDate}
        </InputDate>
        <Select
          text="지출 유형" //
          width={`200px`}
          options={outComeCategorys}
          onChange={categoryHandler}
          value={category}
          margin={`10px 0 10px 0`}
          padding={`0`}
        />
        <Select
          text="결제 수단" //
          width={`200px`}
          onChange={cashHandler}
          options={['현금', '카드']}
          value={cash}
          margin={`0 0 10px 0`}
          padding={`0`}
        />
        {/* {cash === '카드' ? ( // */}
        <Select
          text="카드 목록" //
          width={`200px`}
          thisHeight={cash === '카드' ? `40px` : `0px`}
          border={cash === '카드' ? `` : `none`}
          onChange={cardHandler}
          options={cardsList}
          value={card}
          margin={cash === '카드' ? `0 0 10px 0` : `0`}
          padding={`0`}
          transition={`.2s`}
        />
        {/* ) : null} */}
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
    requestMessage,
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
            requestMessage={requestMessage}
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
            requestMessage={requestMessage}
          />
        )}

        <PriceInput
          placeholder="금액을 입력해주세요" //
          width={`200px`}
          onChange={priceHandler}
          value={price}
          type={`number`}
          min={`0`}
          max={`999999999`}
          labelHeight={`0px`}
          margin={`0 0 5px 0`}
          // position={`absolute`}
          // bottom={`170px`}
        />
        <RequestMessage>{requestMessage}</RequestMessage>
        <SmallButton //
          text={buttonModifyState ? '수정' : '입력'}
          width={`200px`}
          margin={`5px 0 0 0 `}
          // position={`absolute`}
          // bottom={`110px`}
          onClick={buttonModifyState ? contentModifiyer : () => submitHandler(mainState)}
        />
      </SubmitContainer>
    </>
  );
};

export default Submit;
