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
  color: #7c8986;
  font-weight: 700;
  margin: 30px 0;
  position: absolute;
  top: ${(props) => props.top || '350px'};
`;

//!SubTitle
export const SubtitleContainer = styled.div`
  color: #7c8986;
  position: absolute;
  top: 30px;
  left: 49px;
`;

//!Content
//s!!!
export const ContentsContainer = styled.div`
  height: 250px;
  color: #97bfb4;
  font-weight: 700;
  position: absolute;
  top: 70px;
`;

export const ContentContainer = styled.div`
  margin: 5px 0;
  display: flex;
  justify-content: space-between;
`;

export const ItemContainer = styled.div`
  text-align: left;
  width: 100px;
`;
export const MoneyContainer = styled.div`
  text-align: right;
  width: 100px;
`;

export const Item = ({ item }) => {
  return <ItemContainer>{item}</ItemContainer>;
};

export const Money = ({ money }) => {
  return <MoneyContainer>{`${money.toLocaleString('ko-KR')} 원`}</MoneyContainer>;
};

export const Content = ({ item, money }) => {
  return (
    <>
      <ContentContainer>
        <Item item={item} />
        <Money money={money} />
      </ContentContainer>
    </>
  );
};

export const SubTitle = ({ title }) => {
  return <SubtitleContainer>{title}</SubtitleContainer>;
};

export const TotalMoney = ({ totalMoney, top }) => {
  return <TotalMoneyContainer top={top}>{`${totalMoney.toLocaleString('ko-KR')} 원`}</TotalMoneyContainer>;
};

const OutComeList = ({ year, month, outComes }) => {
  return (
    <>
      <ListContainer>
        <SubTitle title={`${year}.${month} 지출 내역`} />
        <ContentsContainer>
          {outComes.map((come, index) => (
            <Content key={index} item={come.category} money={come.money} />
          ))}
        </ContentsContainer>
        <TotalMoney totalMoney={33333} />
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
          {inComes.map((come, index) => {
            return <Content key={index} item={come.category} money={come.money} />;
          })}
        </ContentsContainer>
        <TotalMoney totalMoney={33333} />
      </ListContainer>
    </>
  );
};

const View = (props) => {
  const {
    year, //
    month,
    mainStateHandler,
    mainState,
    data,
  } = props;
  const inComes = data.inComes;
  const outComes = data.outComes;

  return (
    <>
      <ViewContainer>
        <ButtonContainer>
          <SmallButton text={`수입`} width="80px" onClick={() => mainStateHandler('income')} />
          <SmallButton text={`지출`} width="80px" onClick={() => mainStateHandler('outcome')} />
        </ButtonContainer>
        {mainState === 'income' ? ( //
          <InComeList year={year} month={month} inComes={inComes} />
        ) : mainState === 'outcome' ? (
          <OutComeList year={year} month={month} outComes={outComes} />
        ) : null}
      </ViewContainer>
    </>
  );
};

export default View;
