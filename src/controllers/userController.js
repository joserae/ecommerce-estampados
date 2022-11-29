const path = require('path');

const userController = {

    iniciarSesion: (req, res) => {
        res.render('iniciar-sesion')
    },

    registro: (req, res) => {
        res.render('registro')
    }
}

module.exports = userController
