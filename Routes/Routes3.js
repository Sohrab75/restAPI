const express = require('express');
const router = express.Router();

const {
  getAllCategoryData,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../Controllers/controllers');

// GET all categories
router.route('/').get(getAllCategoryData);

// POST to create a new category
router.route('/').post(createCategory);

// PUT to update an existing category by ID
router.route('/:category_id').put(updateCategory);

// DELETE to delete an existing category by ID
router.route('/:category_id').delete(deleteCategory);

module.exports = router;
