const { users } = require('../../models')
const { userCards } = require('../../models')
const { transactions } = require('../../models')
const { isAuthorized } = require('../tokenFunctions')

module.exports  = {
  get: async (req, res) => {
    const accessToken = isAuthorized(req, res)

    const userInfo = await users.findOne({
      where: {
        email: accessToken.email
      }
    })

    const userCardInfos = await userCards.findAll({
      where: {
        userId: userInfo.id
      }
    })

    if (!userInfo) {
      return res.status(401).json({ "message": "invalid access token!" })
    } else {
      delete userInfo.dataValues.password
      
      return res.status(200).json({ "userInfo": userInfo, "cards": userCardInfos });
    }
  },
  patch: async (req, res) => {
    const { nickname, password, cards } = req.body
    const accessToken = isAuthorized(req, res)
    // 유저가 현재 보유한 카드 id 목록
    const remainingCards = cards.map(data => data.id)

    const userInfo = await users.findOne({
      where: {
        email: accessToken.email
      }
    })
    //회원가입시 기록했던 유저카드 목록
    const userCardInfos = await userCards.findAll({
      where: {
        userId: userInfo.id
      }
    })
    // 회원가입시 기록했던 유저 카드 목록에서 id만 추출
    const userCardList = userCardInfos.map(data => data.dataValues.cardId)
    // 회원가입시 기록했던 유저 카드 목록에서 보유한 카드 목록과 겹치는 부분을 filter = 남은 id는 지울 목록
    const deleteCardList = userCardList.filter(data => !remainingCards.includes(data))
    // 보유한 카드 목록에서 회원가입시 기록했던 유저 카드 목록과 겹치는 부분을 filter = 남은 id는 추가할 목록
    const addedCardList = remainingCards.filter(data => !userCardList.includes(data))

    if (!userInfo) {
      return res.status(401).json({ "message": "invalid access token!" })
    } else {
      // 수정할 nickname 존재할 때 수정
      if (nickname) {
        await users.update({ nickname: nickname }, {
          where: {
            id: userInfo.id,
            nickname: userInfo.nickname
          }
        })
      }
      // 수정할 password가 존재할 때 수정
      if (password) {
        await users.update({ password: password}, {
          where: {
            id: userInfo.id,
            password: userInfo.password
          }
        })
      }
      // 지울 카드 목록 삭제
      if (deleteCardList.length !== 0) {
        deleteCardList.forEach(async(data) => {
          await userCards.destroy({
            where: {
              userId: userInfo.id,
              cardId: data
            }
          })
        })
      }
      // 추가할 카드 목록 삭제
      if (addedCardList.length !== 0) {
        addedCardList.forEach(async(data) => {
          await userCards.create({
            userId: userInfo.id,
            cardId: data,
          })
        })
      }
    }

    res.status(200).json( {"message": "successfully changed"} )
  },
  delete: async (req, res) => {
    const accessToken = isAuthorized(req, res)

    const userInfo = await users.findOne({
      where: {
        email: accessToken.email
      }
    })

    if (!userInfo) {
      return res.status(401).json({ "message": "invalid access token!" })
    } else {

      await userCards.destroy({
        where: {
          userId: userInfo.id
        }
      })

      await transactions.destroy({
        where: {
          userId: userInfo.id
        }
      })

      await users.destroy({
        where: {
          id: userInfo.id
        }
      })

      res.status(200).json({ "message": "userinfo deleted" })
    }
  }
}
