const { transactions } = require('./../../models');
const { isAuthorized } = require('./../tokenFunctions');

module.exports = async (req, res) => {
  // accessToken 확인
  console.log(`res 1`);
  const accessTokenData = isAuthorized(req, res);
  if (!accessTokenData) {
    console.log(`res 2`);
    return res.status(401).json({ data: null, message: 'Invalid access token!' });
  } else {
    console.log(`res 2`);
    const { id } = accessTokenData;
    const { year, month } = req.body;
    console.log('---------', month);
    const dataOfDate = await transactions.findAll({
      where: {
        year,
        month,
        userId: id,
      },
    });
    console.log(`res 3`);
    console.log(dataOfDate.length);
    res.status(200).json({ transaction: dataOfDate });
  }
};
