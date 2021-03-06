import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Calendar from './Calendar';
import View, { Item } from './View';
import Submit from './Submit';
import { newdumy } from '../../dummyData';
import axios from 'axios';
import { useBeforeunload } from 'react-beforeunload';
import Modal from '../Modal';

//asdfsafd
export const MainContainer = styled.div`
  width: 1130px;
  height: 550px;
  border-radius: 15px;
  display: flex;
  align-content: flex-start;
  justify-content: space-between;
  border: solid 3px #97bfb4;
  margin: auto;
`;

//! Center
export const CenterContainer = styled.div`
  box-sizing: border-box;

  /* border: solid 2px #97bfb4; */
  width: 500px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

export const LeftMoney = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 15px 0 0 0;
  color: #7c8986;
  height: 70px;
`;

export const SubTitle = styled.div`
  font-size: 18px;
`;
export const Amount = styled.div`
  text-align: center;
  font-size: 26px;
`;

export const Note = styled.span`
  color: #ff6b6b;
  font-size: 14px;
`;

const Main = ({
  isLogin,
  userCards,
  cardsId,
  accessToken,
  transaction,
  setTransaction,
  modalData,
  cardPrice,
}) => {
  const [mainState, setMainState] = useState('outcome');
  const [modifyState, setModifyState] = useState(false);
  const [buttonModifyState, setButtonModifyState] = useState(false);

  const [temporaryData, setTemporaryData] = useState({});
  const [requestMessage, setRequestMessage] = useState('');
  const [savemode, setSavemode] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useBeforeunload((event) => event.preventDefault());

  let targetMonthBalance = 0;
  transaction.forEach((el) => {
    if (transaction.isIncome) {
      targetMonthBalance -= el.price;
    } else targetMonthBalance -= el.price;
  });

  const [thisMonthBalance, setthisMonthBalance] = useState(0);

  // const lestMonthCardUsage = cardPrice.reduce((acc, cur) => acc + cur.price, 0);

  const [pickDate, setPickDate] = useState(new Date());

  const [targetDate, setTargetDate] = useState(25);
  const targetYear = pickDate.getFullYear();
  const targetMonth = pickDate.getMonth() + 1;
  const getDate = `${targetYear}-${targetMonth}-${targetDate}`;

  useEffect(() => {
    if (modalData.length > 0) {
      setShowModal(true);
    }
  }, [modalData]);

  //Submit
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [card, setCard] = useState('');
  const [cash, setCash] = useState('');

  //!

  const url = `${process.env.REACT_APP_API_URL}transaction/`;
  //!

  const categoryList = {
    inCome: {
      ??????: 0,
      ?????????: 0,
      ????????????: 0,
    },
    outCome: {
      ??????: 0,
      '??????/??????': 0,
      ????????????: 0,
      '??????/??????': 0,
      '??????/??????': 0,
      '??????/??????': 0,
      '??????/??????': 0,
      '?????????/??????': 0,
      ????????????: 0,
    },
  };
  //! ????????? ??????

  const token = accessToken;

  const userCardId = cardsId.findIndex((el) => el.name === card) + 1 || null;
  const outcomeIsCash = cash === '??????' ? true : false;
  const isIncome =
    mainState === 'income' ? true : mainState === 'outcome' ? false : null;

  const resData = {
    year: targetYear,
    month: targetMonth,
    day: targetDate,
    category,
    outcomeIsCash,
    userCardId,
    price: Number(price),
    isIncome,
  };

  //! API
  //* ??????, ?????? ??????
  const submitHandler = (endPoint) => {
    if (!isLogin) {
      return setRequestMessage('* ???????????? ???????????????.');
    }
    if (
      !resData.category.length ||
      resData.category === '?????? ??????' ||
      resData.category === '?????? ??????'
    ) {
      return setRequestMessage('* ??????????????? ??????????????????');
    }
    if (mainState === 'outcome') {
      if (cash === '' || cash === '?????? ??????') {
        return setRequestMessage('* ?????? ????????? ????????? ?????????');
      } else if ((cash === '??????' && card === '') || card === '?????? ??????') {
        return setRequestMessage('* ????????? ??????????????????');
      }
    }
    if (resData.price === 0) {
      return setRequestMessage('* ????????? ??????????????????');
    }

    //????????? ????????? ?????? ???????????? API????????? ????????? ??????

    axios
      .post(
        `${url}${endPoint}s`, //
        resData,
        {
          headers: {
            'Content-Type': 'application/json', //
            authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        setTransaction(res.data.transaction);
      })
      .catch((err) => console.log(err));
    inputResetHandler();
    setRequestMessage('');
    setModifyState(true);
  };

  //! API
  //* ?????? ???????????? ????????? ????????? ????????????
  const calendarMover = (year, month) => {
    if (!isLogin) {
      return setRequestMessage('* ???????????? ???????????????.');
    }

    const resDate = {
      year,
      month,
    };

    axios
      .post(
        `${url}date`, //
        resDate,
        {
          headers: {
            'Content-Type': 'application/json', //
            authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        setTransaction(res.data.transaction);
      })
      .catch((err) => console.log(err));
  };

  //! API
  //* ??????, ?????? ????????? ??????
  const contentDeleter = (data) => {
    if (!isLogin) {
      return setRequestMessage('* ???????????? ???????????????.');
    }
    const category = data.category || null;
    const price = data.price;
    const isIncome = data.isIncome;
    const outcomeIsCash = data.isCash === undefined ? null : data.isCash;
    const userCardId = data.card ? data.card.id : null;
    const id = data.id;
    const resData = {
      year: targetYear,
      month: targetMonth,
      day: targetDate,
      category,
      price,
      isIncome,
      outcomeIsCash,
      userCardId,
      id,
    };
    axios
      .post(
        `${url}delete`, //
        resData,
        {
          headers: {
            'Content-Type': 'application/json', //
            authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        setTransaction(res.data.transaction);
      })
      .catch((err) => console.log(err));
  };

  //! API
  //* ????????? ??????!
  const contentModifiyer = () => {
    if (!isLogin) {
      return setRequestMessage('* ???????????? ???????????????.');
    }
    const resData = {
      id: temporaryData.id,
      year: targetYear,
      month: targetMonth,
      day: targetDate,
      category: temporaryData.category,
      newCategory: category,
      price: temporaryData.price,
      newPrice: Number(price),
      outcomeIsCash,
      userCardId,
    };

    if (
      !resData.newCategory.length ||
      resData.newCategory === '?????? ??????' ||
      resData.newCategory === '?????? ??????'
    ) {
      return setRequestMessage('* ??????????????? ??????????????????');
    }
    if (mainState === 'outcome') {
      if (cash === '' || cash === '?????? ??????') {
        return setRequestMessage('* ?????? ????????? ????????? ?????????');
      } else if ((cash === '??????' && card === '') || card === '?????? ??????') {
        return setRequestMessage('* ????????? ??????????????????');
      }
    }
    if (resData.newPrice === 0) {
      return setRequestMessage('* ????????? ??????????????????');
    }

    axios
      .post(
        `${url}correct`, //
        resData,
        {
          headers: {
            'Content-Type': 'application/json', //
            authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        setTransaction(res.data.transaction);
      })
      .catch((err) => console.log(err));

    inputResetHandler();
    setRequestMessage('');
  };

  const mainStateHandler = (
    state,
    modifyState,
    category,
    price,
    card,
    cash,
  ) => {
    setMainState(state);
    setModifyState(modifyState);
    inputResetHandler(category, price, card, cash);
    setRequestMessage('');
  };
  const buttonStateHandler = (state) => {
    setButtonModifyState(state);
  };

  const modifyStateHandler = (state, id, category, price, card, cash) => {
    setModifyState(true);
    setTemporaryData({
      id: id,
      year: targetYear,
      month: targetMonth,
      day: targetDate,
      category,
      price,
    });
    if (state) {
      setMainState(state);
    }
    inputResetHandler(category, price, card, cash);
    setRequestMessage('');
  };
  //Calendar
  const pickDateHandler = (year, month) => {
    const newDate = new Date(year, month, 0);
    setPickDate(newDate);

    calendarMover(newDate.getFullYear(), newDate.getMonth() + 1);
  };

  const dateHandler = (year, month, date, move) => {
    const newDate = new Date(year, month, 0);
    setPickDate(newDate);
    setTargetDate(date);

    if (move) {
      calendarMover(newDate.getFullYear(), newDate.getMonth() + 1);
    }
  };

  //Submit
  const priceHandler = (e) => setPrice(e.target.value);
  const categoryHandler = (e) => setCategory(e.target.value);
  const cardHandler = (e) => setCard(e.target.value);
  const cashHandler = (e) => setCash(e.target.value);

  const inputResetHandler = (category, price, card, cash) => {
    setCategory(category || '');
    setPrice(price || '');
    setCard(card ? card.name : '');
    if (cash === undefined) {
      setCash('');
    } else if (cash) {
      setCash('??????');
    } else {
      setCash('??????');
    }
  };

  //! mainpage

  const inOutDataList = {
    inComes: {
      ...categoryList.inCome,
      categorys: Object.keys(categoryList.inCome),
      totalPrice: 0,
    },
    outComes: {
      ...categoryList.outCome,
      categorys: Object.keys(categoryList.outCome),
      totalPrice: 0,
    },
    detail: {
      inComes: [],
      inComesTotal: 0,
      outComes: [],
      outComesTotal: 0,
    },
  };

  const inOutDate = {};

  transaction.map((el) => {
    //inOut data ??????
    const date = `${el.year}.${el.month}.${el.day}`;
    if (inOutDate[date] === undefined) {
      if (el.isIncome) {
        inOutDate[date] = 1;
      } else {
        inOutDate[date] = 2;
      }
    } else {
      //?????? ?????????
      if (inOutDate[date] === 1 && !el.isIncome) {
        inOutDate[date] = 3;
      } else if (inOutDate[date] === 2 && el.isIncome) {
        inOutDate[date] = 3;
      }
    }

    if (el.month === targetMonth) {
      if (el.isIncome) {
        inOutDataList.inComes[el.category] += el.price;
        inOutDataList.inComes.totalPrice += el.price;
      } else {
        inOutDataList.outComes[el.category] += el.price;
        inOutDataList.outComes.totalPrice += el.price;
      }
    }

    if (el.day === targetDate) {
      if (el.isIncome) {
        //??????
        inOutDataList.detail.inComes = [
          ...inOutDataList.detail.inComes,
          {
            id: el.id,
            category: el.category,
            price: el.price,
            isIncome: true,
          },
        ];
        inOutDataList.detail.inComesTotal += el.price;
      } else {
        //??????

        inOutDataList.detail.outComes = [
          ...inOutDataList.detail.outComes,
          {
            id: el.id,
            category: el.category,
            price: el.price,
            isCash: el.outcomeIsCash,
            card: cardsId[el.userCardId - 1],
            isIncome: false,
          },
        ];
        inOutDataList.detail.outComesTotal += el.price;
      }
    }
  });

  //! console tets ??????

  const leftMoney =
    inOutDataList.inComes.totalPrice - inOutDataList.outComes.totalPrice;

  return (
    <>
      {showModal && isLogin ? (
        <Modal modalData={modalData} onClick={() => setShowModal(false)} />
      ) : null}
      <MainContainer>
        <View
          year={targetYear} //
          month={targetMonth}
          date={targetDate}
          mainStateHandler={mainStateHandler}
          mainState={mainState}
          data={inOutDataList}
          transaction={transaction}
          modifyStateHandler={modifyStateHandler}
          modifyState={modifyState}
          buttonStateHandler={buttonStateHandler}
          contentDeleter={contentDeleter}
        />
        <CenterContainer>
          <LeftMoney>
            <SubTitle>?????? ?????? ??????</SubTitle>
            <Amount>{`${leftMoney.toLocaleString('ko-KR')} ???`}</Amount>
            <Note onClick={() => setSavemode(!savemode)}></Note>
          </LeftMoney>
          <Calendar //
            dateHandler={dateHandler}
            targetYear={targetYear}
            targetMonth={targetMonth}
            pickDateHandler={pickDateHandler}
            inOutDate={inOutDate}
            mainStateHandler={mainStateHandler}
            setModifyState={setModifyState}
            modifyStateHandler={modifyStateHandler}
            buttonStateHandler={buttonStateHandler}
          />
        </CenterContainer>
        <Submit
          mainState={mainState} //
          getDate={getDate}
          categoryList={categoryList}
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
          modifyState={modifyState}
          submitHandler={submitHandler}
          buttonModifyState={buttonModifyState}
          contentModifiyer={contentModifiyer}
          requestMessage={requestMessage}
        />
      </MainContainer>
    </>
  );
};

export default Main;
