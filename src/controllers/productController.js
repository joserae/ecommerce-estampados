const { join } = require('path');
const path = require('path');
const products = require('../database/productDataBase.json')
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

        let productDataBaseJSONImport = fs.readFileSync(path.join(__dirname, '../database/productDataBase.json'), {encoding: "utf-8"});

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
            stock: true
		}

        //newProduct está llegando bien

        //proceso de escritura a productDataBase.json:

        //oldProductsJSON está llegando bien

        oldProductsJSON.push(newProduct);

        //oldProductsJSON está añadiendo a newProduct correctamente

        let productDataUpdatedJSON = JSON.stringify(oldProductsJSON);

        fs.writeFileSync(path.join(__dirname, '../database/productDataBase.json'), productDataUpdatedJSON);
        //fin del proceso de escritura

        res.redirect("/products/createProduct")
    },

    editProduct: (req, res) => {
        id = req.params['id'] - 1
        res.render('products/editProduct', {products, id})
    },

    // Delete - Delete one product from DB
	destroy : (req, res) => {
        let productsFilePath = path.join(__dirname, '../database/productDataBase.json');
        let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        let id = req.params.id;
        let productDelete = products.filter(product => product.id != id);

        fs.writeFileSync(productsFilePath, JSON.stringify(productDelete, null, '\t'));
	
		res.redirect('/')
        },

        update: (req, res)=>{
            let product= products.find(product=>product.id == req.params.id);
        
            let newProduct ={
                "id": productEdit.id,
                "name": req.body.name,
                "size": req.body.size,
                "price": req.body.price,
                "category": req.body.category,
                "description": req.body.description,
                "image": req.body.image,
            };

  let productEdit= products.map(product =>{
    if(newProduct.id == product.id){
        return product = newProduct
    }
    return product
  })
  fs.writeFileSync(productsFilePath, JSON.stringify(productEdit, null, '\t'));

  res.redirect("/")
        }
	}


module.exports = productController
