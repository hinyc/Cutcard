// dummy data
const dummy = {
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

// {
//   "userInfo": {
//     "id": 1,
//     "email": "kimcoding@gmail.com",
//     "nickname": "김코딩",
//     "created_at": "2021-12-16T09:42:40.000Z",
//     "updated_at": "2021-12-16T09:42:40.000Z"
//   }
//   "cards": [
//     {
//       "id": 1,
//       "name": "신한",
//       "number": "1544-7000",
//       "address": "https://www.shinhancard.com/mob/MOBFM12101N/MOBFM12101R01.shc"
//       "isCut": true,
//       "created_at": "2021-12-16T09:42:40.000Z",
//       "updated_at": "2021-12-16T09:42:40.000Z"
//     },
//   ]
//   "transaction": [
//     {
//       "id": 1,
//       "incomeCategory": "월급",
//       "incomePrice": 2000000,
//       "outcomeCategory": "식비",
//       "outcomePrice": 10000,
//       "outcomeCash": false,
//       "created_at": "2021-12-16T09:42:40.000Z",
//       "updated_at": "2021-12-16T09:42:40.000Z"
//     },
//   ]
// }
export default dummy;
