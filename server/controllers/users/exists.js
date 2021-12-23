const { users } = require('../../models');
// 유저 이메일 중복확인하여 가입 여부 확인
module.exports = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'bad request' });
  } else {
    const exist = await users.findOne({
      where: {
        email: email,
      },
    });

    if (exist) {
      return res.status(409).json({ message: 'user already exist' });
    } else {
      return res.status(200).json({ message: 'available email' });
    }
  }
};
