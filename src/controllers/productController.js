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

    editProduct: (req, res) => {
        res.render('products/editProduct')
    }
}

module.exports = productController
