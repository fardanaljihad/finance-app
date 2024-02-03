const express = require('express');
const { 
  createCategory, 
  readCategories, 
  updateCategory, 
  deleteCategory } = require('../controllers/categories');

const router = express.Router();

router.route('/:userId/categories')
  .post(createCategory)
  .get(readCategories);
router.route('/:userId/categories/:categoryId')
  .put(updateCategory)
  .delete(deleteCategory);

module.exports = router;
