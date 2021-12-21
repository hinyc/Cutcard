import { useState } from 'react';
import styled from 'styled-components';
import { SmallButton } from '../Button';

export const ViewContainer = styled.div`
  box-sizing: border-box;
  /* border: solid 2px #97bfb4; */
  width: 330px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

//! ButtonContainer
export const ButtonContainer = styled.div`
  width: 230px;
  height: 70px;
  display: flex;
  margin: 30px 0 0 0;
  justify-content: space-evenly;
  align-items: center;
`;

export const ChangeButton = styled.button`
  width: 70px;
  height: 40px;
  margin: 0 20px;
  font-size: 24px;
`;

//! ListContainer
export const ListContainer = styled.div`
  // border: solid 2px black;
  width: 300px;
  height: 470px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

//!TotalMoney
export const TotalMoneyContainer = styled.div`
  width: 150px;
  line-height: 50px;
  color: ${(props) => props.color || '#7c8986'};
  font-weight: 700;
  text-align: right;
  margin: 30px 0;
  position: absolute;
  right: 50px;
  top: ${(props) => props.top || '360px'};
`;

//!SubTitle
export const SubtitleContainer = styled.div`
  color: #7c8986;
  position: absolute;
  top: ${(props) => props.top || '20px'};
  left: ${(props) => props.left || '49px'};
`;

//!Content
//s!!!
export const ContentsContainer = styled.div`
  height: ${(props) => props.height || '300px'};
  color: #97bfb4;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: auto;
  position: absolute;
  top: ${(props) => props.top || '50px'};
`;

export const ContantWrap = styled.div`
  width: 300px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  position: relative;
`;
export const ContentContainer = styled.div`
  height: 20px;
  width: 250px;
  left: 0px;
  position: absolute;
`;
export const ContentContainerActive = styled.div`
  height: 20px;
  width: 250px;
  left: 0px;
  position: absolute;

  &:hover {
    cursor: pointer;
    opacity: 70%;
    /* text-decoration: none; */
  }

  &:active {
    cursor: pointer;
    opacity: 95%;
    /* text-decoration: none; */
  }
`;

export const ItemContainer = styled.div`
  text-align: left;
  width: 90px;
  left: 50px;
  position: absolute;
`;
export const MoneyContainer = styled.div`
  text-align: right;
  width: 110px;
  right: 0px;
  position: absolute;
`;

export const CashCard = styled.div`
  box-sizing: border-box;
  background-color: ${(props) => props.backgroundColor || 'blue'};
  border-radius: 10px;
  text-align: center;
  height: 16px;
  line-height: 16px;
  font-size: 13px;
  width: 40px;
  left: 0px;
  position: absolute;
`;

export const DeleteBox = styled.div`
  box-sizing: border-box;
  background-color: #bfc5c4;
  color: #7c8986;
  border-radius: 10px;
  text-align: center;
  width: 50px;
  height: 16px;
  line-height: 16px;
  font-size: 16px;
  width: 25px;
  right: 7px;
  top: 1px;
  position: absolute;

  &:hover {
    cursor: pointer;
    opacity: 80%;
    /* text-decoration: none; */
  }

  &:active {
    cursor: pointer;
    opacity: 95%;
    /* text-decoration: none; */
  }
`;

export const Item = ({ item }) => {
  return <ItemContainer>{item}</ItemContainer>;
};

export const Money = ({ money }) => {
  return <MoneyContainer>{`${money.toLocaleString('ko-KR')} 원`}</MoneyContainer>;
};

export const Content = (props) => {
  const {
    item, //
    money,
    isCash,
    card,
    cardId,
    deleteBox,
    modifyStateHandler,
    buttonStateHandler,
    contentDeleter,
  } = props;
  //category, price, card, cash

  return (
    <>
      <ContantWrap>
        {deleteBox ? (
          isCash === undefined ? (
            <ContentContainerActive
              onClick={() => {
                modifyStateHandler('income', item, money);
                buttonStateHandler(true);
              }}
            >
              <Item item={item} />
              <Money money={money} />
            </ContentContainerActive>
          ) : isCash ? (
            <ContentContainerActive
              onClick={() => {
                modifyStateHandler('outcome', item, money, card, isCash);
                buttonStateHandler(true);
              }}
            >
              <CashCard backgroundColor={`green`}>현금</CashCard>
              <Item item={item} />
              <Money money={money} />
            </ContentContainerActive>
          ) : (
            <ContentContainerActive
              onClick={() => {
                modifyStateHandler('outcome', item, money, card, isCash);
                buttonStateHandler(true);
              }}
            >
              <CashCard backgroundColor={`blue`}>{card.name.slice(0, 2)}</CashCard>
              <Item item={item} />
              <Money money={money} />
            </ContentContainerActive>
          )
        ) : (
          <ContentContainer>
            <Item item={item} />
            <Money money={money} />
          </ContentContainer>
        )}

        {deleteBox ? <DeleteBox onClick={() => contentDeleter()}>×</DeleteBox> : null}
      </ContantWrap>
    </>
  );
};

export const SubTitle = ({ title, top }) => {
  return <SubtitleContainer top={top}>{title}</SubtitleContainer>;
};

export const TotalMoney = ({ totalMoney, top, color }) => {
  return <TotalMoneyContainer top={top} color={color}>{`${totalMoney.toLocaleString('ko-KR')} 원`}</TotalMoneyContainer>;
};

const OutComeList = ({ year, month, outComes }) => {
  return (
    <>
      <ListContainer>
        <SubTitle title={`${year}.${month} 지출 내역`} />
        <ContentsContainer>
          {outComes.categorys.map((category, index) => (
            <Content key={index} item={category} money={outComes[category]} />
          ))}
        </ContentsContainer>
        <TotalMoney totalMoney={outComes.totalPrice} />
      </ListContainer>
    </>
  );
};

const InComeList = ({ year, month, inComes }) => {
  return (
    <>
      <ListContainer>
        <SubTitle title={`${year}.${month} 수입 내역`} />
        <ContentsContainer>
          {inComes.categorys.map((category, index) => (
            <Content key={index} item={category} money={inComes[category]} />
          ))}
        </ContentsContainer>
        <TotalMoney totalMoney={inComes.totalPrice} />
      </ListContainer>
    </>
  );
};

const DetailList = (props) => {
  const { year, month, date, detail, modifyStateHandler, buttonStateHandler, contentDeleter } = props;
  const { inComes, inComesTotal, outComes, outComesTotal } = detail;

  return (
    <>
      <ListContainer>
        {/* 수입 */}
        <SubTitle title={`${year}.${month}.${date} 수입 내역`} />
        <ContentsContainer height={`75px`}>
          {inComes.map((el, index) => (
            <Content
              key={index} //
              item={el.category}
              money={el.price}
              deleteBox={true}
              modifyStateHandler={modifyStateHandler}
              buttonStateHandler={buttonStateHandler}
              contentDeleter={contentDeleter}
            />
          ))}
        </ContentsContainer>
        <TotalMoney totalMoney={inComesTotal} top={`100px`} color={`skyblue`} />
        {/* 지출 */}
        <SubTitle title={`${year}.${month}.${date} 지출 내역`} top={`200px`} />
        <ContentsContainer top={`230px`} height={`150px`}>
          {outComes.map((el, index) => (
            <Content
              key={index} //
              item={el.category}
              money={el.price}
              isCash={el.isCash}
              card={el.card}
              cardId={el.cardId}
              deleteBox={true}
              modifyStateHandler={modifyStateHandler}
              buttonStateHandler={buttonStateHandler}
              contentDeleter={contentDeleter}
            />
          ))}
        </ContentsContainer>
        <TotalMoney totalMoney={outComesTotal} color={`pink`} />
      </ListContainer>
    </>
  );
};

const View = (props) => {
  const {
    year, //
    month,
    date,
    mainStateHandler,
    mainState,
    data,
    transaction,
    modifyStateHandler,
    modifyState,
    buttonStateHandler,
    contentDeleter,
  } = props;
  const { inComes, outComes, detail } = data;
  return (
    <>
      <ViewContainer>
        <ButtonContainer>
          <SmallButton
            text={`수입`}
            width="80px"
            onClick={() => {
              mainStateHandler('income', false);
              buttonStateHandler(false);
            }}
          />
          <SmallButton
            text={`지출`}
            width="80px"
            onClick={() => {
              mainStateHandler('outcome', false);
              buttonStateHandler(false);
            }}
          />
        </ButtonContainer>
        {modifyState ? (
          <DetailList year={year} month={month} date={date} detail={detail} modifyStateHandler={modifyStateHandler} buttonStateHandler={buttonStateHandler} contentDeleter={contentDeleter} />
        ) : mainState === 'income' ? ( //
          <InComeList year={year} month={month} inComes={inComes} />
        ) : (
          <OutComeList year={year} month={month} outComes={outComes} />
        )}
      </ViewContainer>
    </>
  );
};

export default View;
