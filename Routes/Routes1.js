const express = require('express');
const router = express.Router();

const{getAllReviewData} = require('../Controllers/controllers')

router.route('/').get(getAllReviewData);

module.exports = router;