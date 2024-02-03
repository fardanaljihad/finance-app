const express = require('express');
const { 
  createOutcome, 
  readOutcomes, 
  updateOutcome, 
  deleteOutcome } = require('../controllers/outcomes');

const router = express.Router();

router.route('/:userId/outcomes')
  .post(createOutcome)
  .get(readOutcomes);
router.route('/:userId/outcomes/:outcomeId')
  .put(updateOutcome)
  .delete(deleteOutcome);

module.exports = router;
