const { users } = require("../../models");
const { userCards } = require("../../models");
const { transactions } = require("../../models");
const { isAuthorized } = require("../tokenFunctions");

module.exports = {
  get: async (req, res) => {
    const accessToken = isAuthorized(req, res);

    const userInfo = await users.findOne({
      where: {
        email: accessToken.email,
      },
    });

    const userCardInfos = await userCards.findAll({
      where: {
        userId: userInfo.id,
      },
    });

    if (!userInfo) {
      return res.status(401).json({ message: "invalid access token!" });
    } else {
      delete userInfo.dataValues.password;

      return res.status(200).json({ userInfo: userInfo, cards: userCardInfos });
    }
  },
  patch: async (req, res) => {
    const { nickname, password, cards, repaymentday } = req.body;
    const accessToken = isAuthorized(req, res);

    const userInfo = await users.findOne({
      where: {
        email: accessToken.email,
      },
    });
    //회원가입시 기록했던 유저카드 목록
    const userCardInfos = await userCards.findAll({
      where: {
        userId: userInfo.id,
      },
    });

    // 유저가 현재 보유한 카드 id와 제거 여부
    const remainingCards = cards.map((data) => [data.id, data.isCut]);
    // 유저가 현재 보유한 카드 id
    const remainingCardId = cards.map((data) => data.id);
    // 회원가입시 기록했던 유저 카드 목록에서 id와 제거 여부 추출
    const userCardList = userCardInfos.map((data) => [
      data.dataValues.cardId,
      data.dataValues.isCut,
    ]);
    // 회원가입시 기록했던 유저 카드 목록에서 id만 추출
    const userCardId = userCardInfos.map((data) => data.cardId);
    // 회원가입시 기록했던 유저 카드 목록과 보유한 카드 목록에 중복으로 존재하는 카드의 정보
    const notChangingCard = userCardList.filter((data) =>
      remainingCardId.includes(data[0])
    );
    // 회원가입시 기록했던 유저 카드 목록에서 보유한 카드 목록과 겹치는 부분을 filter = 할당되는 배열은 제거할 카드의 정보
    const deleteCardList = userCardList.filter(
      (data) => !remainingCardId.includes(data[0])
    );
    // 보유한 카드 목록에서 회원가입시 기록했던 유저 카드 목록과 겹치는 부분을 filter = 할당되는 배열은 추가할 카드의 정보
    const addedCardList = remainingCards.filter(
      (data) => !userCardId.includes(data[0])
    );

    console.log(remainingCardId);
    console.log(userCardId);
    console.log(notChangingCard);
    console.log(deleteCardList);
    console.log(addedCardList);

    if (!userInfo) {
      return res.status(401).json({ message: "invalid access token!" });
    } else {
      // 수정할 nickname 존재할 때 수정
      if (nickname) {
        await users.update(
          { nickname: nickname },
          {
            where: {
              id: userInfo.id,
              nickname: userInfo.nickname,
            },
          }
        );
      }
      // 수정할 password가 존재할 때 수정
      if (password) {
        await users.update(
          { password: password },
          {
            where: {
              id: userInfo.id,
              password: userInfo.password,
            },
          }
        );
      }
      // 지울 카드 목록 삭제
      if (deleteCardList.length !== 0) {
        deleteCardList.forEach(async (data) => {
          await userCards.destroy({
            where: {
              userId: userInfo.id,
              cardId: data[0],
            },
          });
        });
      }
      // 추가할 카드 목록 추가
      if (addedCardList.length !== 0) {
        addedCardList.forEach(async (data) => {
          await userCards.create({
            userId: userInfo.id,
            cardId: data[0],
            isCut: data[1],
            repaymentday: repaymentday,
          });
        });
      }
      // 아직 가지고 있는 카드의 제거 여부 update
      if (notChangingCard.length !== 0) {
        notChangingCard.forEach(async (data) => {
          await userCards.update(
            { isCut: data[1] },
            {
              where: {
                id: userInfo.id,
                cardId: data[0],
                repaymentday: repaymentday,
              },
            }
          );
        });
      }
    }

    res.status(200).json({ message: "successfully changed" });
  },
  delete: async (req, res) => {
    const accessToken = isAuthorized(req, res);

    const userInfo = await users.findOne({
      where: {
        email: accessToken.email,
      },
    });

    if (!userInfo) {
      return res.status(401).json({ message: "invalid access token!" });
    } else {
      await userCards.destroy({
        where: {
          userId: userInfo.id,
        },
      });

      await transactions.destroy({
        where: {
          userId: userInfo.id,
        },
      });

      await users.destroy({
        where: {
          id: userInfo.id,
        },
      });

      res.status(200).json({ message: "userinfo deleted" });
    }
  },
};
