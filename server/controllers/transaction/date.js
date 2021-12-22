const { transactions } = require("./../../models");
const { isAuthorized } = require("./../tokenFunctions");

module.exports = async (req, res) => {
  // accessToken 확인
  console.log(req.cookies);
  const accessTokenData = isAuthorized(req, res);
  if (!accessTokenData) {
    return res
      .status(401)
      .json({ data: null, message: "Invalid access token!" });
  } else {
    const { id } = accessTokenData;
    const { year, month } = req.body;
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
