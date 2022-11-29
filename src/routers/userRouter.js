const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

router.get('/iniciar-sesion', userController.iniciarSesion);
router.get('/registro', userController.registro);

module.exports = router;