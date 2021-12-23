const { transactions, userCards } = require('./../../models');
const { isAuthorized } = require('./../tokenFunctions');

module.exports = async (req, res) => {
  // accessToken 확인
  const accessTokenData = isAuthorized(req, res);
  if (!accessTokenData) {
    return res
      .status(401)
      .json({ data: null, message: 'invalid access token!' });
  } else {
    const { id } = accessTokenData;
    let {
      year,
      month,
      day,
      category,
      outcomeIsCash,
      userCardId,
      price,
      isIncome,
    } = req.body;
    let userCard;

    if (!outcomeIsCash) {
      userCard = await userCards.findOne({
        where: {
          userId: id,
          cardId: userCardId,
        },
      });
      userCard.dataValues.remainValue += price;
      await userCards.update(
        {
          remainValue: userCard.dataValues.remainValue,
        },
        {
          where: {
            userId: id,
            cardId: userCardId,
          },
        },
      );
      await transactions.create({
        year,
        month,
        day,
        category,
        price,
        isIncome,
        outcomeIsCash: outcomeIsCash,
        userId: id,
        userCardId: userCard.dataValues.cardId,
      });
      const outcomeData = await transactions.findAll({
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
      res.status(201).json({ transaction: outcomeData, cardPrice: cardPrice });
    } else {
      await transactions.create({
        year,
        month,
        day,
        category,
        price,
        isIncome,
        outcomeIsCash: outcomeIsCash,
        userId: id,
        userCardId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      const outcomeData = await transactions.findAll({
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
      const cardPrice = await transactions.findAll({
        where: {
          year,
          month: month - 1,
          userId: id,
          outcomeIsCash: false,
        },
      });
      res.status(201).json({ transaction: outcomeData, cardPrice: cardPrice });
    }
  }
};
