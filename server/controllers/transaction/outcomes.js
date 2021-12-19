const { transactions, cards, userCards } = require('./../../models');
const { isAuthorized } = require('./../tokenFunctions')

module.exports = async (req, res) => {
  // accessToken 확인
  const accessTokenData = isAuthorized(req, res);
  if(!accessTokenData) {
    return res.status(401).json({ data: null, message: "Invalid access token!" })
  } else {
    const { id } = accessTokenData;
    const { year, month, day, category, cash, card, price } = req.body; // 요청 API cash -> isCash로 수정
    let userCard
    if(cash && card !== undefined) {
      userCard = await cards.findOne({
        where: {
          name: card
        }
      })
    }
    // isCash 여부에 따라 나눠야 한다...
    // card를 썼을 때 다음 달에 반영할지 여부 확인.. 그냥 그 달에 적용하는게 좋을듯?
    await transactions.create({
      year,
      month,
      day,
      incomeCategory: null,
      incomePrice: null,
      outcomeCategory: category,
      outcomePrice: price,
      outcomeIsCash: cash, // 응답 API outcomeCash -> outcomeIsCash로 수정
      userId: id,
      userCardId: null,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    const outcomeData = await transactions.findAll({
      where: {
        year,
        month,
        userId: id
      }
    })
    res.status(201).json({ transaction: outcomeData })
  }
}