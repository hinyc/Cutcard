const { transactions } = require('./../../models');
const { isAuthorized } = require('./../tokenFunctions');

module.exports = async (req, res) => {
  const accessTokenData = isAuthorized(req, res);
  if (!accessTokenData) {
    return res
      .status(401)
      .json({ data: null, message: 'Invalid access token!' });
  } else {
    const { id } = accessTokenData;
    let { year, month } = req.body;
    const dataOfDate = await transactions.findAll({
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
    res.status(200).json({ transaction: dataOfDate, cardPrice: cardPrice });
  }
};
