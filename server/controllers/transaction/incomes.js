const { transactions } = require('./../../models');
const { isAuthorized } = require('./../tokenFunctions')

module.exports = async (req, res) => {
  // accessToken 확인
  const accessTokenData = await isAuthorized(req, res);
  if(!accessTokenData) {
    return res.status(401).json({ data: null, message: "invalid access token!" })
  } else {
    const { id } = accessTokenData;
    const { year, month, day, category, price, isIncome } = req.body;
    await transactions.create({
      year,
      month,
      day,
      category,
      price,
      isIncome,
      outcomeIsCash: null,
      userId: id,
      userCardId: null,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    const incomeData = await transactions.findAll({
      where: {
        year,
        month,
        userId: id,
        isIncome
      }
    })
    res.status(201).json({ transaction: incomeData })
  }
}