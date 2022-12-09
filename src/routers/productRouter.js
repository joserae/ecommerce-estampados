const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController')
const multer = require("multer");
const path = require("path");

/*Multer*/
const storage = multer.diskStorage({
	destination: (req, file, callback) =>{
		let folder = path.join(__dirname, "../../public/img");

		callback(null, folder)
	},
    filename: (req, file, callback) =>{
        let imageName = Date.now() + path.extname(file.originalname);

		callback(null, imageName);
    }
});

const fileUpload = multer({ storage: storage });
/*fin de proceso multer*/

router.get('/products', productController.products);
router.get('/productDetails/:id', productController.productDetails);

router.get('/createProduct', productController.createProduct);
router.post("/createProduct",fileUpload.single("productImage"), productController.storeProduct);

router.get('/editProduct/:id', productController.editProduct);
router.put('/editProduct/:id',fileUpload.single("productImage"), productController.update);

router.post('/delete/:id', productController.destroy); 

module.exports = router;