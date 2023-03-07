const express = require('express');
const router = express.Router();

const{getAllCategoryData} = require('../Controllers/controllers')

router.route('/').get(getAllCategoryData);

module.exports = router;