import { useState } from "react";
import styled from "styled-components";
import Calendar from "./Calendar";
import Input from "../Input";
import { Select } from "../Select";
import View from "./View";
import Submit from "./Submit";
// dumydata
import { newdumy } from "../../dummyData";
import axios from "axios";

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
  font-size: 26px; ;
`;

const Main = ({ isLogin, userCards, cardsId, accessToken }) => {
  const [leftMoney, setLeftMoney] = useState(1000000);
  //leftMoney => 해달 월 수입계 - 해당월 현금 사용 - 전월 카드사용 ?
  const [mainState, setMainState] = useState("outcome");
  const [modifyState, setModifyState] = useState(false);
  const [buttonModifyState, setButtonModifyState] = useState(false);
  const [transaction, setTransaction] = useState(newdumy.transaction);
  const [dataForModify, setDataForModify] = useState({});
  // Calendar
  const [pickDate, setPickDate] = useState(new Date());
  // const [targetDate, setTargetDate] = useState(pickDate.getDate());
  const [targetDate, setTargetDate] = useState(25);
  const targetYear = pickDate.getFullYear();
  const targetMonth = pickDate.getMonth() + 1;
  const getDate = `${targetYear}-${targetMonth}-${targetDate}`;

  //Submit
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [card, setCard] = useState("");
  const [cash, setCash] = useState("");

  const categoryList = {
    inCome: {
      월급: 0,
      보너스: 0,
      기타수입: 0,
    },
    outCome: {
      식비: 0,
      "주거/통신": 0,
      생활용품: 0,
      "의복/미용": 0,
      "건강/문화": 0,
      "교육/육아": 0,
      "교통/차량": 0,
      "공과금/보험": 0,
      기타지출: 0,
    },
  };
  //! 이벤트 발생

  const token = accessToken;

  // 입력 클릭(in,out) transaction 업데이트 후 받아오기
  const userCardId = cardsId.findIndex((el) => el.name === card) + 1 || null;
  const outcomeIsCash = cash === "현금" ? true : false;
  const isIncome =
    mainState === "income" ? true : mainState === "outcome" ? false : null;

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
    console.log(`url:  http://localhost:4000/transaction/${endPoint}`);
    console.log("보내는거", resData);
    // if (mainState === 'income' &&//
    //   resData.category === "" ||

    // ) {
    // if (resData.isIncome) {
    //   //현금

    //   if (!resData.category.length) {
    //     return console.log('카테고리를 선택해주세요');
    //   } else if (resData.price === 0) {
    //     return console.log('금액을 입력해주세요 ');
    //   }
    // } else {
    //   //카드
    //   if (!resData.category.length) {
    //     return console.log('카테고리를 선택해주세요');
    //   } else if (!resData.userCardId) {
    //     return console.log('카드를 선택해주세요');
    //     //! 현금인지 카든지 state로 관리해야됨!
    //   } else if (resData.price === 0) {
    //     return console.log('금액을 입력해주세요 ');
    //   } else if (resData.price === 0) {
    //     return console.log('금액을 입력해주세요 ');
    //   }
    //   console.log('12319303939393933123');
    // }
    // }

    axios
      .post(
        `http://localhost:4000/transaction/${endPoint}`, //
        resData,
        {
          headers: {
            "Content-Type": "application/json", //
            authorization: `Bearer ${token}`,
          },
          // withCredentials: true,
        }
      )
      .then((res) => {
        setTransaction(res.data.transaction);
        console.log("응답데이터", res.data.transaction);
      })
      .catch((err) => console.log(err));
  };

  //! API
  //* 달력 월이동시 해당월 데이터 불러오기
  const calendarMover = (year, month) => {
    console.log(`http://localhost:4000/transaction/date`);

    const resDate = {
      year,
      month,
    };

    axios
      .post(
        `http://localhost:4000/transaction/date`, //
        resDate,
        {
          headers: {
            "Content-Type": "application/json", //
            authorization: `Bearer ${token}`,
          },
          // withCredentials: true,
        }
      )
      .then((res) => {
        setTransaction(res.data.transaction);
        console.log("move 2");
      })
      .catch((err) => console.log(err));
  };

  //! API
  //* 수입, 지출 데이터 삭제
  const contentDeleter = (data) => {
    console.log(`http://localhost:4000/transaction/delete`);
    const category = data.category || null;
    const price = data.price;
    const isIncome = data.isIncome;
    // console.log('isIncome', data.category ? );
    const outcomeIsCash = data.isCash === undefined ? null : data.isCash;
    const userCardId = data.card ? data.card.id : null;

    const resData = {
      year: targetYear,
      month: targetMonth,
      day: targetDate,
      category,
      price,
      isIncome,
      outcomeIsCash,
      userCardId,
    };
    console.log(resData);
    axios
      .post(
        `http://localhost:4000/transaction/delete`, //
        resData,
        {
          headers: {
            "Content-Type": "application/json", //
            authorization: `Bearer ${token}`,
          },
          // withCredentials: true,
        }
      )
      .then((res) => {
        setTransaction(res.data.transaction);
        console.log("delet!", res.data.transaction);
      })
      .catch((err) => console.log(err));
  };

  //! API
  //* 데이터 수정!
  const contentModifiyer = () => {
    const resCorrectData = {
      year: targetYear,
      month: targetMonth,
      day: targetDate,
      // newYear: dataForModify.year,
      // newMonth: dataForModify.month,
      // newDay: dataForModify.day,
      category: dataForModify.category,
      newCategory: category,
      price: dataForModify.price,
      newPrice: Number(price),
      outcomeIsCash,
      userCardId,
    };

    console.log("수정요청데이터", resCorrectData);
    axios
      .post(
        `http://localhost:4000/transaction/correct`, //
        resCorrectData,
        {
          headers: {
            "Content-Type": "application/json", //
            authorization: `Bearer ${token}`,
          },
          // withCredentials: true,
        }
      )
      .then((res) => {
        setTransaction(res.data.transaction);
        console.log("correct!", res.data.transaction);
      })
      .catch((err) => console.log(err));
  };

  const mainStateHandler = (
    state,
    modifyState,
    category,
    price,
    card,
    cash
  ) => {
    setMainState(state);
    setModifyState(modifyState);
    inputResetHandler(category, price, card, cash);
  };
  const buttonStateHandler = (state) => {
    setButtonModifyState(state);
  };

  const modifyStateHandler = (state, category, price, card, cash) => {
    setModifyState(true);
    setDataForModify({
      year: targetYear,
      month: targetMonth,
      day: targetDate,
      category,
      price,
    });
    console.log(dataForModify);
    if (state) {
      setMainState(state);
    }
    inputResetHandler(category, price, card, cash);
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

    setCategory(category || "");
    setPrice(price || "");
    setCard(card ? card.name : "");
    if (cash === undefined) {
      setCash("");
    } else if (cash) {
      setCash("현금");
    } else {
      setCash("카드");
    }
  };

  //! mainpage
  // targetYear, target Month 해당 데이터의 income, outcome data를 모두 받아온다. 기준달 앞, 뒤 달의 데이터도 포함
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

  //? calendar로 전달할 정보

  const inOutDate = {};
  // console.log(cardsId);
  // console.log('확인', transaction);
  // console.log('확인', transaction[transaction.length - 1].userCardId);
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
    `Render! mainState:"${mainState}" modifyState:"${modifyState}" date:${getDate}`
  );
  // console.log('Year:', targetYear);
  // console.log('Mont:', targetMonth);
  // console.log('Day:', targetDate);
  // console.log('category:', category);
  // console.log('isOutcomeCash:', cash);
  // console.log('userCardId:', card);
  // console.log('price:', price);

  // console.log(inOutDataList.inComes);
  // console.log(inOutDataList.outComes);
  // console.log('detail', inOutDataList.detail);

  // [{category:"", Price:234325}]

  //@ 날짜별 지출 수입내역 수입만true 1, 지출만 2, 지출 수입 모두 3.
  // 그중, 지출이 있는 날짜, 수입이 있는 날짜 정보만 필요 => main page에서 가공해서 props로 전달  => 배열형식 데이터로 인자는 객체, {year, month, date, 수입지출 상태}

  // 달력 화살표 클릭 => 해당 월에 해당하는 transaction 받아오기
  // 날짜 클릭
  // 날짜 클릭시 디테일 리스트에서 목록 클릭
  // 날자 클릭시 수정버튼 클릭시
  // input, select 내용 수정
  //? 수입, 지출 버튼 => axios

  return (
    <>
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
            <SubTitle>잔여 금액</SubTitle>
            <Amount>{`${leftMoney.toLocaleString("ko-KR")} 원`}</Amount>
          </LeftMoney>
          <Calendar //
            dateHandler={dateHandler}
            targetYear={targetYear}
            targetMonth={targetMonth}
            pickDateHandler={pickDateHandler}
            inOutDate={inOutDate}
            mainStateHandler={mainStateHandler}
            setMainState={setModifyState}
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
        />
      </MainContainer>
    </>
  );
};

export default Main;
