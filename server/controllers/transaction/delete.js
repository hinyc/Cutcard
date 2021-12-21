const { transactions, userCards } = require('./../../models');
const { isAuthorized } = require('./../tokenFunctions');

module.exports = async (req, res) => {
  const accessTokenData = await isAuthorized(req, res);
  if (!accessTokenData) {
    return res.status(401).json({ data: null, message: 'invalid access token!' });
  } else {
    const { id } = accessTokenData;
    const { year, month, day, category, price, isIncome, outcomeIsCash, userCardId } = req.body;
    let userCard;
    if (!outcomeIsCash) {
      userCard = await userCards.findOne({
        where: {
          cardId: userCardId,
        },
      });
      userCard.dataValues.remainValue -= price;
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
      await transactions.destroy({
        where: {
          year,
          month,
          day,
          category,
          price,
          isIncome,
          userId: id,
          cardId: userCard.dataValues.id,
        },
      });
      // res.status(200).json({ message: "transaction data successfully delete" });
      const deleteData = await transactions.findAll({
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
      res.status(200).json({ transaction: deleteData });
    } else {
      await transactions.destroy({
        where: {
          year,
          month,
          day,
          category,
          price,
          isIncome,
          userId: id,
        },
      });
      const deleteData = await transactions.findAll({
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
      res.status(200).json({ transaction: deleteData });
    }
  }
};
