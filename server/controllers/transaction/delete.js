const { transactions, userCards } = require("./../../models");
const { isAuthorized } = require("./../tokenFunctions");

module.exports = async (req, res) => {
  const accessTokenData = await isAuthorized(req, res);
  if (!accessTokenData) {
    return res
      .status(401)
      .json({ data: null, message: "invalid access token!" });
  } else {
    const { id } = accessTokenData;
    const {
      year,
      month,
      day,
      category,
      price,
      isIncome,
      outcomeIsCash,
      userCardId,
    } = req.body;
    let userCard;

    if (!outcomeIsCash && !isIncome) {
      userCard = await userCards.findOne({
        where: {
          cardId: userCardId,
          userId: id,
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
            userId: id,
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
          userCardId,
        },
      });
      const deleteData = await transactions.findAll({
        include: [
          {
            model: userCards,
            attributes: ["repaymentDay"],
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
      res.status(200).json({ transaction: deleteData, cardPrice: cardPrice });
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
            attributes: ["repaymentDay"],
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
      res.status(200).json({ transaction: deleteData, cardPrice: cardPrice });
    }
  }
};
