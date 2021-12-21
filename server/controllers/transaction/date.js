const { transactions } = require("./../../models");
const { isAuthorized } = require("./../tokenFunctions");

module.exports = async (req, res) => {
  // accessToken 확인
  const accessTokenData = isAuthorized(req, res);
  if (!accessTokenData) {
    return res
      .status(401)
      .json({ data: null, message: "Invalid access token!" });
  } else {
    const { year, month } = req.body; // 이후 수정
    const dataOfDate = await transactions.findAll({
      where: {
        year,
        month,
      },
    });
    res.status(200).json({ transaction: dataOfDate });
  }
};
