const { transactions } = require('./../../models');
const { isAuthorized } = require('./../tokenFunctions')

module.exports = async (req, res) => {
  // accessToken 확인
  const accessTokenData = await isAuthorized(req, res);
  if(!accessTokenData) {
    return res.status(401).json({ data: null, message: "Invalid access token!" })
  } else {
    const { id } = accessTokenData;
    const { year, month, day, category, price } = req.body;
    await transactions.create({
      year,
      month,
      day,
      incomeCategory: category,
      incomePrice: price,
      outcomeCategory: null,
      outcomePrice: null,
      outcomeIsCash: null,
      userId: id,
      userCardsId: null,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    const incomeData = await transactions.findAll({
      where: {
        year,
        month,
        userId: id
      }
    })
    res.status(201).json({ transaction: incomeData })
  }
}