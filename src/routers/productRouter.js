const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController')

router.get('/carrito', productController.carrito);
router.get('/crearProducto', productController.crearProducto);
router.get('/editarProducto', productController.EditarProducto);
router.get('/productos', productController.productos);
router.get('/detalle', productController.detalle);

module.exports = router;