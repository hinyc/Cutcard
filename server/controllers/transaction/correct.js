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
    // 수정 필요 항목
    const {
      year,
      month,
      day,
      category,
      newCategory,
      price,
      newPrice,
      outcomeIsCash,
      userCardId,
    } = req.body;
    // 수정 필요 항목
    let userCard;

    if (!outcomeIsCash) {
      userCard = await userCards.findOne({
        where: {
          cardId: userCardId,
          userId: id,
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
            userId: id,
          },
        }
      );
      await transactions.update(
        {
          year,
          month,
          day,
          category: newCategory,
          price: newPrice,
        },
        {
          where: {
            year,
            month,
            day,
            category,
            price,
            userId: id,
            userCardId,
          },
        }
      );
      const correctDate = await transactions.findAll({
        where: {
          year,
          month,
          userId: id,
        },
      });
      res.status(200).json({ transaction: correctDate });
    } else {
      await transactions.update(
        {
          year,
          month,
          day,
          category: newCategory,
          price: newPrice,
        },
        {
          where: {
            year,
            month,
            day,
            category,
            price,
            userId: id,
          },
        }
      );
      const correctDate = await transactions.findAll({
        where: {
          year,
          month,
          userId: id,
        },
      });
      res.status(200).json({ transaction: correctDate });
    }
  }
};
