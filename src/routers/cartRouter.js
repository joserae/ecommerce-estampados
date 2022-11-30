const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController')

router.get('/shoppingCart', cartController.shoppingCart);

module.exports = router;