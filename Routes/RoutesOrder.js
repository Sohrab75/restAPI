const express = require('express');
const router = express.Router();

const {getAllOrders} = require('../Controllers/controllers')

router.route('/').get(getAllOrders);

module.exports = router;