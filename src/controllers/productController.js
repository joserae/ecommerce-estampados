const { join } = require('path');
const path = require('path');
const products = require('../database/productDataBase.json')
const productsFilePath = path.join(__dirname, '../database/productDataBase.json')
const fs = require('fs');

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
        //proceso de multer
        let newImage
        if(req.file == undefined){
            newImage="default-shoes.jpg"
        }else{
            newImage=req.file.filename
        }
        //finaliza proceso de multer

        const fs = require("fs");

        let productDataBaseJSONImport = fs.readFileSync(productsFilePath, {encoding: "utf-8"});

        let oldProductsJSON;
        if(productDataBaseJSONImport == ""){
	        oldProductsJSON = []
        }else{
	        oldProductsJSON = JSON.parse(productDataBaseJSONImport);
        }

        let newProduct = {
            id: oldProductsJSON[oldProductsJSON.length - 1].id + 1,
			name: req.body.name,
            size: req.body.size,
            price: req.body.price,
			category: req.body.category,
            description: req.body.description,
            image: newImage,
            stock: "available-stock"
		}

        //proceso de escritura a productDataBase.json:

        oldProductsJSON.push(newProduct);

        let productDataUpdatedJSON = JSON.stringify(oldProductsJSON);

        fs.writeFileSync(productsFilePath, productDataUpdatedJSON);
        //fin del proceso de escritura

        res.redirect("/products/createProduct")
    },

    editProduct: (req, res) => {
        id = req.params['id'] - 1
        res.render('products/editProduct', {products, id})
    },

    // Delete - Delete one product from DB
	destroy : (req, res) => {
        let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        let id = req.params.id;
        let productDelete = products.filter(product => product.id != id);

        fs.writeFileSync(productsFilePath, JSON.stringify(productDelete, null, '\t'));
	
		res.redirect('/products/products')
    },

    update: (req, res)=>{
        let product= products.find(product=>product.id == req.params.id);
        let newImage,newCategory,newStock;

        //validate if the user change the product image
        if(req.file){
            newImage = req.file.filename;
        } else{
            newImage = product.image;
        }

        //validate if the user change the category
        if(req.body.category != "select"){
            newCategory = req.body.category;
        } else{
            newCategory = product.category;
        }

        //validate if the user change the stock condition
        if(req.body.stock != "select"){
            newStock = req.body.stock;
        } else{
            newStock = product.stock;
        }

        let updatedProduct ={
            id: product.id,
            name: req.body.name,
            size: req.body.size,
            price: req.body.price,
            category: newCategory,
            description: req.body.description,
            image: newImage,
            stock: newStock
        };

        let updatedJSON = products.map(product =>{
            if(updatedProduct.id == product.id){
                return product = updatedProduct;
            }
            return product;
        })

        fs.writeFileSync(productsFilePath, JSON.stringify(updatedJSON, null, '\t'));

        res.redirect('/products/products')
    }
}


module.exports = productController
