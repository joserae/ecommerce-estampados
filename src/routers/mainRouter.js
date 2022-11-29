const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController')
const productRouter = require('./productRouter')
const userRouter = require('./userRouter')


router.get('/', mainController.home);
router.get('/termsAndConditions', mainController.termsAndConditions);
router.get('/quienesSomos', mainController.quienesSomos);

router.use('/',productRouter)
router.use('/',userRouter)

module.exports = router;