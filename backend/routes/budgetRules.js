const express = require('express');
const { 
  createBudgetRule, 
  readbudgetRules, 
  updatebudgetRule, 
  deletebudgetRule } = require('../controllers/budgetRules');

const router = express.Router();

router.route('/:userId/budgetrules')
  .post(createBudgetRule)
  .get(readbudgetRules);
router.route('/:userId/budgetrules/:budgetRuleId')
  .put(updatebudgetRule)
  .delete(deletebudgetRule);

module.exports = router;
