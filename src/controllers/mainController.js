const path = require('path');

const mainController = {

    home: (req, res) => {
        res.render('home')
    }, 

    termsAndConditions: (req, res) =>{
        res.render("terms-and-conditions")
    },

    quienesSomos: (req, res) =>{
        res.render("quienes-somos-contacto")
    }
}

module.exports = mainController
