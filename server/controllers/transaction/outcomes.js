const { transactions, userCards } = require('./../../models');
const { isAuthorized } = require('./../tokenFunctions');

module.exports = async (req, res) => {
  // accessToken 확인
  console.log('sever outcomes----------');
  const accessTokenData = isAuthorized(req, res);
  if (!accessTokenData) {
    return res.status(401).json({ data: null, message: 'invalid access token!' });
  } else {
    const { id } = accessTokenData;
    const { year, month, day, category, outcomeIsCash, userCardId, price, isIncome } = req.body;
    let userCard;
    console.log('이거', outcomeIsCash);
    console.log('조건문안에', !outcomeIsCash);

    if (!outcomeIsCash) {
      userCard = await userCards.findOne({
        where: {
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
            cardId: userCardId,
          },
        }
      );
      if (month === 12) {
        await transactions.create({
          year: year + 1,
          month: 1,
          day: userCard.dataValues.repaymentDay,
          category,
          price,
          isIncome,
          outcomeIsCash: outcomeIsCash,
          userId: id,
          userCardId: userCard.dataValues.cardId,
        });

        const outcomeData = await transactions.findAll({
          where: {
            year,
            month,
            userId: id,
            // isIncome,
          },
        });
        res.status(201).json({ transaction: outcomeData });
      } else {
        console.log('sever outcomes----------!!!');

        await transactions.create({
          year,
          month: month + 1,
          day: userCard.dataValues.repaymentDay,
          category,
          price,
          isIncome,
          outcomeIsCash: outcomeIsCash,
          userId: id,
          userCardId: userCard.dataValues.cardId,
        });
        const outcomeData = await transactions.findAll({
          where: {
            year,
            month,
            userId: id,
            // isIncome,
          },
        });
        res.status(201).json({ transaction: outcomeData });
      }
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
        where: {
          year,
          month,
          userId: id,
          // isIncome,
        },
      });
      res.status(201).json({ transaction: outcomeData });
    }
  }
};
