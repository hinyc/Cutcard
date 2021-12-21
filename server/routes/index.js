const router = require("express").Router();
const usersRouter = require("./users");
const transactionRouter = require("./transaction");

router.use("/users", usersRouter);
router.use("/transaction", transactionRouter);

module.exports = router;
