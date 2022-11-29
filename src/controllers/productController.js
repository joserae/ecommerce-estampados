const path = require('path');

const productController = {
    
    carrito: (req, res) => {
        res.render('carrito-de-compras')
    },

    crearProducto: (req, res) => {
        res.render('create-product')
    },

    EditarProducto: (req, res) => {
        res.render('edit-product')
    },

    productos: (req, res) =>{
        res.render('productos')
    },

    detalle: (req, res) =>{
        res.render('detalle')
    }
}

module.exports = productController
