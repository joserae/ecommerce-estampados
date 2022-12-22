const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const userController = require('../controllers/userController')
const { check, validationResult } = require("express-validator");

let guestMiddleware = require("../middlewares/guestMiddleware");

const storage = multer.diskStorage({
	destination: (req, file, callback) =>{
		let folder = path.join(__dirname, "../../public/img/usersAvatars");

		callback(null, folder)
	},
    filename: (req, file, callback) =>{
        let imageName = Date.now() + path.extname(file.originalname);

		callback(null, imageName);
    }
});

const fileUpload = multer({ storage: storage });

//proceso de validación con express validator
const validations = [
	check("email")
		.notEmpty().withMessage("Ingresa tu correo electrónico").bail()
		.isEmail().withMessage("Email inválido"),
	check("password")
		.notEmpty().withMessage("Debes completar la contraseña").bail()
];
//finaliza proceso de validación. se pone como middleware en el .post de login

router.get('/login', userController.login);
router.post('/login',validations, userController.loginProcess);
//formulario de registro
router.get('/register', guestMiddleware, userController.register);
//guardar el nuevo usuario
router.post('/register', fileUpload.single('userAvatar'), userController.create);
//interfaz del CRUD de usuarios
router.get('/userList', userController.list);

module.exports = router;