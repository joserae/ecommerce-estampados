const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const userController = require('../controllers/userController')

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

router.get('/login', userController.login);

//formulario de registro
router.get('/register', userController.register);
//guardar el nuevo usuario
router.post('/register', fileUpload.single('userAvatar'), userController.create);
//interfaz del CRUD de usuarios
router.get('/userList', userController.list);

module.exports = router;