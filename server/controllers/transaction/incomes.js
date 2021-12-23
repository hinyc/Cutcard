const { transactions, userCards } = require('./../../models');
const { isAuthorized } = require('./../tokenFunctions');

module.exports = async (req, res) => {
  const accessTokenData = await isAuthorized(req, res);
  if (!accessTokenData) {
    return res
      .status(401)
      .json({ data: null, message: 'invalid access token!' });
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
      updatedAt: new Date(),
    });

    const incomeData = await transactions.findAll({
      include: [
        {
          model: userCards,
          attributes: ['repaymentDay'],
        },
      ],
      where: {
        year,
        month,
        userId: id,
      },
    });

    if (month === 1) {
      (year -= 1), (month = 13);
    }
    const cardPrice = await transactions.findAll({
      where: {
        year,
        month: month - 1,
        userId: id,
        outcomeIsCash: false,
      },
    });
    res.status(201).json({ transaction: incomeData, cardPrice });
  }
};
