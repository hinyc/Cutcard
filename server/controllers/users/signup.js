const { users }  = require('../../models/')
const { userCards } = require('../../models')
//회원가입
module.exports = async (req, res) => {
  const { email, password, nickname, cards } = req.body; // cards: [{"id": 1}, {"id": 2}, {"id": 3}]
  
  if (!email || !password || !nickname || !cards) {
    return res.status(400).json({ "message": "bad request!" }) // 유저 정보가 전달되지 않았을 때
  } else {
    const userInfo = await users.findOne({
      where: {
        email: email,
      },
    })

    if (userInfo) {
      return res.status(409).json({ "message": "user already exist" }) // 유저가 존재할 때
    } else {
      const card = cards.map((data) => data.id);

      const createUser = await users.create({
        email: email,
        password: password,
        nickname: nickname,
      }) // 유저 생성

      card.forEach(async(data) => {
        await userCards.create({
          userId: createUser.id,
          cardId: data,
        })
      })// 생성된 유저의 데이터베이스 id와 전달된 cardid로 usercards 생성
      return res.status(201).json({ "message": "user created" })
    }
  }
}