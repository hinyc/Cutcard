const { users } = require('./../../models')
const { generateAccessToken, sendAccessToken } = require('./../tokenFunctions')

module.exports = async (req, res) => {
  const { email, password } = req.body;
  const user = await users.findOne({
    where: {
      email,
      password
    }
  })
  delete user.dataValues.password
  delete user.dataValues.createdAt
  delete user.dataValues.updatedAt
  const accessToken = generateAccessToken(user.dataValues)
  sendAccessToken(res, accessToken, user.dataValues)
}