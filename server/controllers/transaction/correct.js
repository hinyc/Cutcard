const { transactions, userCards } = require("./../../models");
const { isAuthorized } = require("./../tokenFunctions");

module.exports = async (req, res) => {
  const accessTokenData = await isAuthorized(req, res);
  if (!accessTokenData) {
    return res
      .status(401)
      .json({ data: null, message: "Invalid access token!" });
  } else {
    const { id } = accessTokenData;
    const {
      year,
      month,
      day,
      newYear,
      newMonth,
      newDay,
      category,
      newCategory,
      price,
      newPrice,
      isIncome,
      outcomeIsCash,
      userCardId,
    } = req.body;
    let userCard;
    if (!outcomeIsCash) {
      userCard = await userCards.findOne({
        where: {
          cardId: userCardId,
        },
      });
      userCard.dataValues.remainValue =
        userCard.dataValues.remainValue - price + newPrice;
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
      await transactions.update(
        {
          year: newYear,
          month: newMonth,
          day: newDay,
          category: newCategory,
          price: newPrice,
          isIncome,
        },
        {
          where: {
            year,
            month,
            day,
            category,
            price,
            isIncome,
            userId: id,
          },
        }
      );
      const correctDate = await transactions.findAll({
        where: {
          year,
          month,
          userId: id,
          isIncome,
        },
      });
      res.status(200).json({ transaction: correctDate });
    } else {
      await transactions.update(
        {
          year: newYear,
          month: newMonth,
          day: newDay,
          category: newCategory,
          price: newPrice,
          isIncome,
        },
        {
          where: {
            year,
            month,
            day,
            category,
            price,
            isIncome,
            userId: id,
          },
        }
      );
      const correctDate = await transactions.findAll({
        where: {
          year,
          month,
          userId: id,
          isIncome,
        },
      });
      res.status(200).json({ transaction: correctDate });
    }
  }
};
