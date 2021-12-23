const { users } = require('../../models/');
const { userCards } = require('../../models');

module.exports = async (req, res) => {
  const { email, password, nickname, cards, repaymentDay } = req.body;

  if (!email || !password || !nickname || !cards || !repaymentDay) {
    return res.status(400).json({ message: 'bad request!' });
  } else {
    const userInfo = await users.findOne({
      where: {
        email: email,
      },
    });

    if (userInfo) {
      return res.status(409).json({ message: 'user already exist' });
    } else {
      const cardInfo = cards.map((data) => {
        return [data.id, data.isCut];
      });

      const createUser = await users.create({
        email: email,
        password: password,
        nickname: nickname,
      });

      cardInfo.forEach(async (data) => {
        await userCards.create({
          userId: createUser.id,
          cardId: data[0],
          isCut: data[1],
          repaymentDay: repaymentDay,
        });
      });
      return res.status(201).json({ message: 'user created' });
    }
  }
};
