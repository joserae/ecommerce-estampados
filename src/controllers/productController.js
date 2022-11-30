const path = require('path');
const products = require('../database/productDataBase.json')

const productController = {

    products: (req, res) =>{
        res.render('products/products', {products})
    },

    productDetails: (req, res) =>{
        id = req.params['id'] - 1
        res.render('products/productDetails', {products,id})
    },
    
    createProduct: (req, res) => {
        res.render('products/createProduct')
    },

    storeProduct: (req, res) =>{
        let newProduct = {
			name: req.body.name,
            size: req.body.size,
            price: req.body.price,
			category: req.body.category,
            description: req.body.description,
            image: "adidas-superstar.jpg",
            stock: true
		}

        //proceso de escritura a productDataBase.json:
        const fs = require("fs");
        let productDataBaseJSONImport = fs.readFileSync(path.join(__dirname, '../database/productDataBase.json'), {encoding: "utf-8"});

        let oldProductsJSON;
        if(productDataBaseJSONImport == ""){
	        oldProductsJSON = []
        }else{
	        oldProductsJSON = JSON.parse(productDataBaseJSONImport);
        }

        let productDataUpdated = oldProductsJSON.push(newProduct);

        let productDataUpdatedJSON = JSON.stringify(productDataUpdated);

        fs.writeFileSync("productDataBase.json", productDataUpdatedJSON);
        //fin del proceso de escritura

        res.redirect("/products/createProduct")
    },

    editProduct: (req, res) => {
        res.render('products/editProduct')
    }
}

module.exports = productController
