const { users, cards } = require('../../models');
const { userCards } = require('../../models');
const { transactions } = require('../../models');
const { Op } = require('sequelize');
const { generateAccessToken, sendAccessToken } = require('../tokenFunctions');

module.exports = async (req, res) => {
  let { email, password, year, month } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'bad Request!' });
  } else {
    const userInfo = await users.findOne({
      where: {
        email,
        password,
      },
    });
    if (!userInfo) {
      return res.status(404).json({ message: 'account not exist' });
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
      if (month === 1) {
        (year -= 1), (month = 13);
      }
      const cardPrice = await transactions.findAll({
        where: {
          year,
          month: month - 1,
          userId: userInfo.id,
          outcomeIsCash: false,
        },
      });

      delete userInfo.dataValues.password;
      const accessToken = generateAccessToken(userInfo.dataValues);
      sendAccessToken(res, accessToken);
      const userCreateYear = userInfo.createdAt.getFullYear();
      const userCreateMonth = userInfo.createdAt.getMonth() + 1;
      let userRepaymentDay = 0;
      userCardInfos.filter((user) => {
        if (userRepaymentDay !== user.dataValues.repaymentDay) {
          userRepaymentDay = user.dataValues.repaymentDay;
        }
      });
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
            [Op.gte]: new Date(
              `${userCreateYear}/${userCreateMonth}/${userRepaymentDay + 1}`,
            ),
          },
        },
      });
      if (!cardInfos) {
        return res.status(200).json({
          userInfo: userInfo,
          cards: userCardInfos,
          transaction: transactionInfos,
          accessToken: accessToken,
          cardPrice: cardPrice,
        });
      } else {
        return res.status(200).json({
          userInfo: userInfo,
          cards: userCardInfos,
          transaction: transactionInfos,
          accessToken: accessToken,
          modal: cardInfos,
          cardPrice: cardPrice,
        });
      }
    }
  }
};
