const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getAllProductsTesting,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../Controllers/controllers');

// Route to get all products
router.route('/').get(getAllProducts);

// Route for testing purposes (if needed)
router.route('/testing').get(getAllProductsTesting);

// Route to create a new product
router.route('/').post(createProduct);

// Route to update a product by ID
router.route('/:productId').put(updateProduct);

// Route to delete a product by ID
router.route('/:productId').delete(deleteProduct);

module.exports = router;
