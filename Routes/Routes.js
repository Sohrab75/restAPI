const express = require('express');
const router = express.Router();

const { getAllProducts, getAllProductsTesting } = require('../Controllers/controllers');

router.route('/').get(getAllProducts);
router.route('/').get(getAllProductsTesting);




module.exports = router;
