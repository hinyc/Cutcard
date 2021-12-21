const { transactions, userCards } = require("./../../models");
const { isAuthorized } = require("./../tokenFunctions");

module.exports = async (req, res) => {
  // accessToken 확인
  const accessTokenData = isAuthorized(req, res);
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
      outcomeIsCash,
      userCardId,
      price,
      isIncome,
    } = req.body; // 요청 API cash -> isCash로 수정
    let userCard;
    if (!isCash && card !== undefined) {
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
          outcomeIsCash: isCash,
          userId: id,
          userCardId: userCard.dataValues.cardId,
        });
        const outcomeData = await transactions.findAll({
          where: {
            year,
            month,
            userId: id,
            isIncome,
          },
        });
        res.status(201).json({ transaction: outcomeData });
      } else {
        await transactions.create({
          year,
          month: month + 1,
          day: userCard.dataValues.repaymentDay,
          category,
          price,
          isIncome,
          outcomeIsCash: isCash,
          userId: id,
          userCardId: userCard.dataValues.cardId,
        });
        const outcomeData = await transactions.findAll({
          where: {
            year,
            month,
            userId: id,
            isIncome,
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
        outcomeIsCash: isCash, // 응답 API outcomeCash -> outcomeIsCash로 수정
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
          isIncome,
        },
      });
      res.status(201).json({ transaction: outcomeData });
    }
  }
};
