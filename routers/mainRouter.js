const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainControllers')

router.get('/', mainController.index);

router.get('/home', mainController.index);

router.get('/iniciar-sesion', mainController.iniciarSesion);

router.get('/registro', mainController.registro);

router.get('/subirImagen', mainController.subirImagen);

router.get('/estamparArticulo', mainController.estampaArticulo);

router.get('/carrito', mainController.carrito);

router.get('/crearProducto', mainController.crearProducto);

module.exports = router;