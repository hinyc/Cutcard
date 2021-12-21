const router = require("express").Router();
const usersRouter = require("./users");
const transactionRouter = require("./transaction");
const cron = require("node-cron");
const { transactions, userCards } = require("./../models");

const cardValuePayment = (req, res, next) => {
  cron.schedule("0 0 1,5,10,15,20,25 * *", async () => {
    const year = new Date().getFullYear();
    const day = new Date().getDate();
    const month = new Date().getMonth();
    if (month === 1) {
      month = 12;
      year -= 1;
    } else {
      month -= 1;
    }
    const cardId = await userCards.findAll({
      where: {
        repaymentDay: day,
      },
    });
    await cardId.map(async (userCards) => {
      const transaction = await transactions.findAll({
        where: {
          userId: userCards.dataValues.userId,
          userCardId: userCards.dataValues.cardId,
          year,
          month,
        },
      });
      transaction.map((ele) => {
        userCards.update(
          {
            remainValue:
              userCards.dataValues.remainValue - ele.dataValues.price,
          },
          {
            where: {
              userId: userCards.dataValues.userId,
              cardId: userCards.dataValues.cardId,
            },
          }
        );
      });
    });
  });
  next();
};

router.use(cardValuePayment);
router.use("/users", usersRouter);
router.use("/transaction", transactionRouter);

module.exports = router;
