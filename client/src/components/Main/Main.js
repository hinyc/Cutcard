import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Calendar from './Calendar';
import View, { Item } from './View';
import Submit from './Submit';
// dumydata
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
  // const [transaction, setTransaction] = useState([]);
  const [temporaryData, setTemporaryData] = useState({});
  const [requestMessage, setRequestMessage] = useState('');
  const [savemode, setSavemode] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useBeforeunload((event) => event.preventDefault());
  //현제 월 수입-지출
  //set 실행조건은 targetMonth가 이번달일 경우만 실행
  console.log('transaction', transaction);

  const targetMonthBalance = 0;
  // transaction.forEach((el) => {
  //   if (transaction.isIncome) {
  //     targetMonthBalance += transaction.price;
  //   }
  //   targetMonthBalance -= transaction.price;
  // });

  const [thisMonthBalance, setthisMonthBalance] = useState(0);
  //지난달 카드 사용금액
  const lestMonthCardUsage = cardPrice.reduce((acc, cur) => acc + cur.price, 0);

  // Calendar

  const [pickDate, setPickDate] = useState(new Date());
  // const [targetDate, setTargetDate] = useState(pickDate.getDate());
  const [targetDate, setTargetDate] = useState(25);
  const targetYear = pickDate.getFullYear();
  const targetMonth = pickDate.getMonth() + 1;
  const getDate = `${targetYear}-${targetMonth}-${targetDate}`;

  useEffect(() => {
    if (modalData.length > 0) {
      setShowModal(true);
    }
  }, modalData);
  console.log('isLogin', isLogin);
  console.log(mainState);
  console.log(modifyState);
  //Submit
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [card, setCard] = useState('');
  const [cash, setCash] = useState('');

  //!
  // 마지막 '/'까지입력
  const url = 'http://localhost:4000/transaction/';
  //!

  const categoryList = {
    inCome: {
      월급: 0,
      보너스: 0,
      기타수입: 0,
    },
    outCome: {
      식비: 0,
      '주거/통신': 0,
      생활용품: 0,
      '의복/미용': 0,
      '건강/문화': 0,
      '교육/육아': 0,
      '교통/차량': 0,
      '공과금/보험': 0,
      기타지출: 0,
    },
  };
  //! 이벤트 발생

  const token = accessToken;

  // 입력 클릭(in,out) transaction 업데이트 후 받아오기
  const userCardId = cardsId.findIndex((el) => el.name === card) + 1 || null;
  const outcomeIsCash = cash === '현금' ? true : false;
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
  //* 수입, 지출 입력
  const submitHandler = (endPoint) => {
    // 모든 데이터입력을 위한 조건문
    if (!isLogin) {
      return setRequestMessage('* 로그인이 필요합니다.');
    }
    if (
      !resData.category.length ||
      resData.category === '지출 유형' ||
      resData.category === '수입 유형'
    ) {
      return setRequestMessage('* 카테고리를 선택해주세요');
    }
    if (mainState === 'outcome') {
      if (cash === '' || cash === '결제 수단') {
        return setRequestMessage('* 결제 수단을 선택해 주세요');
      } else if ((cash === '카드' && card === '') || card === '카드 목록') {
        return setRequestMessage('* 카드를 선택해주세요');
      }
    }
    if (resData.price === 0) {
      return setRequestMessage('* 금액을 입력해주세요');
    }

    //데이터 입력이 모두 되었다면 API보내고 입력창 리셋

    console.log(`url:  ${url}${endPoint}s`);
    console.log('보내는거', resData);
    axios
      .post(
        `${url}${endPoint}s`, //
        resData,
        {
          headers: {
            'Content-Type': 'application/json', //
            authorization: `Bearer ${token}`,
          },
          // withCredentials: true,
        },
      )
      .then((res) => {
        setTransaction(res.data.transaction);
        console.log('응답데이터', res.data.transaction);
        console.log('카드요금', res.data.cardPrice);
      })
      .catch((err) => console.log(err));
    inputResetHandler();
    setRequestMessage('');
    setModifyState(true);
  };

  //! API
  //* 달력 월이동시 해당월 데이터 불러오기
  const calendarMover = (year, month) => {
    if (!isLogin) {
      return setRequestMessage('* 로그인이 필요합니다.');
    }

    const resDate = {
      year,
      month,
    };

    console.log(`${url}date`);
    console.log('요청데이터', resData);
    axios
      .post(
        `${url}date`, //
        resDate,
        {
          headers: {
            'Content-Type': 'application/json', //
            authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        },
      )
      .then((res) => {
        setTransaction(res.data.transaction);
      })
      .catch((err) => console.log(err));
  };

  //! API
  //* 수입, 지출 데이터 삭제
  const contentDeleter = (data) => {
    if (!isLogin) {
      return setRequestMessage('* 로그인이 필요합니다.');
    }
    const category = data.category || null;
    const price = data.price;
    const isIncome = data.isIncome;
    // console.log('isIncome', data.category ? );
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
    console.log(`${url}elete`);
    console.log('삭제요청데이터', resData);
    axios
      .post(
        `${url}delete`, //
        resData,
        {
          headers: {
            'Content-Type': 'application/json', //
            authorization: `Bearer ${token}`,
          },
          // withCredentials: true,
        },
      )
      .then((res) => {
        setTransaction(res.data.transaction);
        console.log('delet!', res.data.transaction);
      })
      .catch((err) => console.log(err));
  };

  //! API
  //* 데이터 수정!
  const contentModifiyer = () => {
    if (!isLogin) {
      return setRequestMessage('* 로그인이 필요합니다.');
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

    // 모든 데이터입력을 위한 조건문
    if (
      !resData.newCategory.length ||
      resData.newCategory === '지출 유형' ||
      resData.newCategory === '수입 유형'
    ) {
      return setRequestMessage('* 카테고리를 선택해주세요');
    }
    if (mainState === 'outcome') {
      if (cash === '' || cash === '결제 수단') {
        return setRequestMessage('* 결제 수단을 선택해 주세요');
      } else if ((cash === '카드' && card === '') || card === '카드 목록') {
        return setRequestMessage('* 카드를 선택해주세요');
      }
    }
    if (resData.newPrice === 0) {
      return setRequestMessage('* 금액을 입력해주세요');
    }

    console.log('수정요청데이터', resData);
    axios
      .post(
        `${url}correct`, //
        resData,
        {
          headers: {
            'Content-Type': 'application/json', //
            authorization: `Bearer ${token}`,
          },
          // withCredentials: true,
        },
      )
      .then((res) => {
        setTransaction(res.data.transaction);
        console.log('correct!', res.data.transaction);
      })
      .catch((err) => console.log(err));
    //입력창 리셋
    inputResetHandler();
    setRequestMessage('');
    // setModifyState(false);
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
    // const cardName = cardsId[card - 1].name;

    setCategory(category || '');
    setPrice(price || '');
    setCard(card ? card.name : '');
    if (cash === undefined) {
      setCash('');
    } else if (cash) {
      setCash('현금');
    } else {
      setCash('카드');
    }
  };

  //! mainpage

  // 잔여금액은 해당 월의 수입이 지출이전에 발생하지 않는다면 수입전 항상 마이너스 금액을 나타낸다 ?

  //? view로 전달할 정보
  // targetYear. targetMonth 해당 => 서버로 부터 받아온 데이터가 조건 충족!
  // incomeList => 카테고리별 합계, 총계
  // outcomeList => 카테고리별 합계, 총계

  //target month 기준, 객체 복사
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
    //inOut data 생성
    const date = `${el.year}.${el.month}.${el.day}`;
    if (inOutDate[date] === undefined) {
      // 값이 없으면 추가
      if (el.isIncome) {
        inOutDate[date] = 1;
      } else {
        inOutDate[date] = 2;
      }
    } else {
      //값이 있다면
      if (inOutDate[date] === 1 && !el.isIncome) {
        inOutDate[date] = 3;
      } else if (inOutDate[date] === 2 && el.isIncome) {
        inOutDate[date] = 3;
      }
    }

    // inComeList outComtList 생성
    if (el.month === targetMonth) {
      if (el.isIncome) {
        inOutDataList.inComes[el.category] += el.price;
        inOutDataList.inComes.totalPrice += el.price;
      } else {
        inOutDataList.outComes[el.category] += el.price;
        inOutDataList.outComes.totalPrice += el.price;
      }
    }

    // detail
    if (el.day === targetDate) {
      if (el.isIncome) {
        //수입
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
        //지출

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

  //! console tets 영역

  console.log(
    `Render! mainState:"${mainState}" modifyState:"${modifyState}" date:${getDate}`,
  );

  const leftMoney =
    inOutDataList.inComes.totalPrice - inOutDataList.outComes.totalPrice;
  const leftMoneyEceptLMCU = leftMoney - lestMonthCardUsage;

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
            <SubTitle>사용 가능 금액</SubTitle>
            <Amount>{`${(savemode
              ? leftMoneyEceptLMCU
              : leftMoney
            ).toLocaleString('ko-KR')} 원`}</Amount>
            <Note onClick={() => setSavemode(!savemode)}>
              <Note>
                {savemode //
                  ? `* 이번 달 카드결제 예정금액 포함`
                  : `* 이번 달 카드결제 예정금액 미포함`}
              </Note>
            </Note>
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
