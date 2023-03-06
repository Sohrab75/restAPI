const express = require('express');
const router = express.Router();

const{getAllFeatureData} = require('../Controllers/controllers')

router.route('/').get(getAllFeatureData);

module.exports = router;