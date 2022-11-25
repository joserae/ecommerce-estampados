const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainControllers')

router.get('/', mainController.home);

router.get('/iniciar-sesion', mainController.iniciarSesion);

router.get('/registro', mainController.registro);

router.get('/carrito', mainController.carrito);

router.get('/crearProducto', mainController.crearProducto);

router.get('/editarProducto', mainController.EditarProducto);

router.get('/termsAndConditions', mainController.termsAndConditions);

router.get('/quienesSomos', mainController.quienesSomos);

module.exports = router;