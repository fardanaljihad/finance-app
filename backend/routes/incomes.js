const express = require('express');
const { 
  createIncome, 
  readIncomes, 
  updateIncome, 
  deleteIncome } = require('../controllers/incomes');

const router = express.Router();

router.route('/:userId/incomes')
  .post(createIncome)
  .get(readIncomes);
router.route('/:userId/incomes/:incomeId')
  .put(updateIncome)
  .delete(deleteIncome);

module.exports = router;
