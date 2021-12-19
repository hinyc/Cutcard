// dummy data
export const dummy = {
  inComes: [
    {
      date: "2021-12-14",
      category: "월급",
      money: 5000000,
    },
    {
      date: "2021-12-14",
      category: "보너스",
      money: 1000000,
    },
  ],
  outComes: [
    {
      date: "2021-12-3",
      category: "식비",
      isCash: false,
      card: "shinhan",
      money: 50000,
    },
    {
      date: "2021-12-14",
      category: "공과금",
      isCash: true,
      card: null,
      money: 400000,
    },
    {
      date: "2021-12-26",
      category: "식비",
      isCash: false,
      card: "samsung",
      money: 53000,
    },
  ],
  cards: [
    { id: 1, name: "비씨카드" },
    { id: 2, name: "국민카드" },
    { id: 3, name: "삼성카드" },
    { id: 4, name: "신한카드" },
    { id: 5, name: "우리카드" },
    { id: 6, name: "하나카드" },
    { id: 7, name: "롯데카드" },
    { id: 8, name: "현대카드" },
    { id: 9, name: "농협카드" },
  ],
};

export const newDummy = {
  userInfo: {
    id: 1,
    email: "kimcoding@gmail.com",
    nickname: "김코딩",
    created_at: "2021-12-16T09:42:40.000Z",
    updated_at: "2021-12-16T09:42:40.000Z",
  },

  userCards: [
    {
      id: 1,
      name: "신한",
      number: "1544-7000",
      address: "https://www.shinhancard.com/mob/MOBFM12101N/MOBFM12101R01.shc",
      isCut: true,
      remainValue: 1000000,
      repaymentday: 15,
      created_at: "2021-12-16T09:42:40.000Z",
      updated_at: "2021-12-16T09:42:40.000Z",
    },
    {
      id: 2,
      name: "농협",
      number: "1544-230067",
      address: "https://www.농협.com/mob/MOBFM12101N/MOBFM12101R01.shc",
      isCut: true,
      remainValue: 20000,
      repaymentday: 24,
      created_at: "2021-12-16T09:42:40.000Z",
      updated_at: "2021-12-16T09:42:40.000Z",
    },
    {
      id: 2,
      name: "국민",
      number: "1544-0112300",
      address: "https://www.국민.com/mob/MOBFM12101N/MOBFM12101R01.shc",
      isCut: true,
      remainValue: 300000,
      repaymentday: 24,
      created_at: "2021-12-16T09:42:40.000Z",
      updated_at: "2021-12-16T09:42:40.000Z",
    },
  ],
  transaction: [
    {
      id: 1,
      year: 2021,
      month: 12,
      day: 25,
      category: "월급",
      price: 5000000,
      isIncome: true,
      outcomeaIsCash: false,
      created_at: "2021-12-16T09:42:40.000Z",
      updated_at: "2021-12-16T09:42:40.000Z",
    },
    {
      id: 1,
      year: 2021,
      month: 11,
      day: 30,
      category: "기타",
      price: 50000,
      isIncome: true,
      outcomeaIsCash: false,
      created_at: "2021-12-16T09:42:40.000Z",
      updated_at: "2021-12-16T09:42:40.000Z",
    },
    {
      id: 1,
      year: 2021,
      month: 11,
      day: 30,
      category: "식비",
      price: 50000,
      isIncome: false,
      outcomeaIsCash: false,
      created_at: "2021-12-16T09:42:40.000Z",
      updated_at: "2021-12-16T09:42:40.000Z",
    },
    {
      id: 1,
      year: 2021,
      month: 12,
      day: 13,
      category: "식비",
      price: 17000,
      isIncome: false,
      outcomeaIsCash: false,
      created_at: "2021-12-16T09:42:40.000Z",
      updated_at: "2021-12-16T09:42:40.000Z",
    },
    {
      id: 1,
      year: 2021,
      month: 12,
      day: 25,
      category: "공과금/보험",
      price: 100000,
      isIncome: false,
      outcomeaIsCash: false,
      created_at: "2021-12-16T09:42:40.000Z",
      updated_at: "2021-12-16T09:42:40.000Z",
    },
    {
      id: 1,
      year: 2021,
      month: 12,
      day: 3,
      category: "식비",
      price: 25000,
      isIncome: false,
      outcomeaIsCash: true,
      created_at: "2021-12-16T09:42:40.000Z",
      updated_at: "2021-12-16T09:42:40.000Z",
    },
    {
      id: 1,
      year: 2022,
      month: 1,
      day: 1,
      category: "건강/문화",
      price: 50000,
      isIncome: false,
      outcomeaIsCash: false,
      created_at: "2021-12-16T09:42:40.000Z",
      updated_at: "2021-12-16T09:42:40.000Z",
    },
    {
      id: 1,
      year: 2021,
      month: 12,
      day: 16,
      category: "기타",
      price: 3333,
      isIncome: false,
      outcomeaIsCash: false,
      created_at: "2021-12-16T09:42:40.000Z",
      updated_at: "2021-12-16T09:42:40.000Z",
    },
  ],
};
