const { users, cards } = require("../../models");
const { userCards } = require("../../models");
const { transactions } = require("../../models");
const { Op } = require("sequelize");
const { generateAccessToken, sendAccessToken } = require("../tokenFunctions");

module.exports = async (req, res) => {
  const { email, password, year, month } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "bad Request!" });
  } else {
    const userInfo = await users.findOne({
      where: {
        email,
        password,
      },
    });
    if (!userInfo) {
      return res.status(404).json({ message: "account not exist" });
    } else {
      const userCardInfos = await userCards.findAll({
        where: {
          userId: userInfo.id,
        },
      });

      const transactionInfos = await transactions.findAll({
        where: {
          userId: userInfo.id,
          year: year,
          month: month,
        },
      });

      delete userInfo.dataValues.password;
      const accessToken = generateAccessToken(userInfo.dataValues);
      sendAccessToken(res, accessToken);
      // return res
      //   .status(200)
      //   .json({
      //     userInfo: userInfo,
      //     cards: userCardInfos,
      //     transaction: transactionInfos,
      //   });

      const cardInfos = await userCards.findAll({
        include: cards,
        where: {
          userId: userInfo.id,
          remainValue: {
            [Op.eq]: 0,
          },
          isCut: {
            [Op.is]: true,
          },
          createdAt: {
            [Op.gte]: new Date("2021/12/20"),
          },
        },
      });
      console.log(cardInfos);

      const cardIds = userCardInfos.filter((userCard) => {
        const isCut = userCard.dataValues.isCut;
        const remainValue = userCard.dataValues.remainValue;
        const repaymentDay = userCard.dataValues.repaymentDay;
        const createdMonth = new Date(userCard.dataValues.createdAt).getMonth();
        const createdYear = new Date(
          userCard.dataValues.createdAt
        ).getFullYear();
        const date = new Date();
        const test = new Date("2021/12/20");
        // 다음 달 상환일이 됐을 때부터
        if (isCut && remainValue === 0 && test <= date) {
          return userCard.dataValues;
        }
      });
      if (!cardInfos) {
        return res.status(200).json({
          userInfo: userInfo,
          cards: userCardInfos,
          transaction: transactionInfos,
        });
      } else {
        return res.status(200).json({
          userInfo: userInfo,
          cards: userCardInfos,
          transaction: transactionInfos,
          modal: cardInfos,
        });
      }
    }
  }
};
