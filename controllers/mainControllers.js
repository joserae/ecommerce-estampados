const path = require('path');

const mainController = {

    index: (req, res) => {
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
}

module.exports = mainController
