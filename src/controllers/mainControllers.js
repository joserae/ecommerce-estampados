const path = require('path');

const mainController = {

    home: (req, res) => {
        res.render('home')
    }, 

    iniciarSesion: (req, res) => {
        res.render('iniciar-sesion')
    },

    registro: (req, res) => {
        res.render('registro')
    },

    subirImagen: (req, res) => {
        res.render('subir-imagen')
    },

    estampaArticulo: (req, res) => {
        res.render('estampar-articulo')
    },

    carrito: (req, res) => {
        res.render('carrito-de-compras')
    },

    crearProducto: (req, res) => {
        res.render('create-product')
    },

    EditarProducto: (req, res) => {
        res.render('edit-product')
    },

    termsAndConditions: (req, res) =>{
        res.render("terms-and-conditions")
    },

    quienesSomos: (req, res) =>{
        res.render("quienes-somos-contacto")
    },

    productos: (req, res) =>{
        res.render("productos")
    },

    detalle: (req, res) =>{
        res.render("detalle")
    }
}

module.exports = mainController
