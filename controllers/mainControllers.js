const path = require('path');

const mainController = {

    index: (req, res) => {
        res.sendFile(path.join(__dirname,"../views/home.html"))
    }, 

    iniciarSesion: (req, res) => {
        res.sendFile(path.join(__dirname,"../views/iniciar-sesion.html"))
    },

    registro: (req, res) => {
        res.sendFile(path.join(__dirname,"../views/registro.html"))
    },

    subirImagen: (req, res) => {
        res.sendFile(path.join(__dirname,"../views/subir-imagen.html"))
    },

    estampaArticulo: (req, res) => {
        res.sendFile(path.join(__dirname,"../views/estampar-articulo.html"))
    },

    carrito: (req, res) => {
        res.sendFile(path.join(__dirname,"../views/carrito-de-compras.html"))
    }
}

module.exports = mainController
