const express = require('express');
const router = express.Router();
const { requireAdmin } = require('../Middleware/authMiddleware');
const adminController = require('../Controllers/adminController');

// Middleware to ensure admin access
router.use(requireAdmin);

// Add product
router.post('/add-product', adminController.addProduct);

// Remove product
router.delete('/remove-product/:productId', adminController.removeProduct);

module.exports = router;
