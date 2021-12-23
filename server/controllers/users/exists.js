const { users } = require('../../models');
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
