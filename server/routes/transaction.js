const router = require('express').Router();
const transactionIncomes = require('./../controllers/transaction/incomes');
const transactionOutcomes = require('./../controllers/transaction/outcomes');
const transactionDate = require('./../controllers/transaction/date');
const transactionCorrect = require('./../controllers/transaction/correct');
const transactionDelete = require('./../controllers/transaction/delete')

router.post('/incomes', transactionIncomes);
router.post('/outcomes', transactionOutcomes);
router.post('/date', transactionDate);

module.exports = router;