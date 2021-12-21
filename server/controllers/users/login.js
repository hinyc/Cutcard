const { users } = require("../../models");
const { userCards } = require("../../models");
const { transactions } = require("../../models");
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
      return res
        .status(200)
        .json({
          userInfo: userInfo,
          cards: userCardInfos,
          transaction: transactionInfos,
        });
    }
  }
};
