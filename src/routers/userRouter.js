const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

router.get('/login', userController.login);

router.get('/register', userController.register);

router.get('/profile/:id/', userController.detail);

router.post('/profile', userController.create);

router.get('/profile/:id/edit', userController.edit);

router.put('/profile/:id/', userController.store);


module.exports = router;