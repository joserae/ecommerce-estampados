const path = require('path');
const products = require('../database/productDataBase.json')

const productController = {

    createProduct: (req, res) => {
        res.render('products/create-product')
    },

    editProduct: (req, res) => {
        res.render('products/edit-product')
    },

    products: (req, res) =>{
        res.render('products/products', {products})
    },

    productDetails: (req, res) =>{
        id = req.params['id'] - 1
        res.render('products/productDetails', {products,id})
    }
}

module.exports = productController
