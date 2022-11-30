const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController')

router.get('/products', productController.products);
router.get('/productDetails/:id', productController.productDetails);
router.get('/createProduct', productController.createProduct);
router.get('/editProduct', productController.editProduct);

module.exports = router;