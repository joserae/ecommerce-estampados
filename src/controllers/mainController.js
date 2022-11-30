const path = require('path');
const products = require('../database/productDataBase.json')

const mainController = {

    home: (req, res) => {
        res.render('main/home')
    }, 

    termsAndConditions: (req, res) =>{
        res.render('main/terms-and-conditions')
    },

    aboutUs: (req, res) =>{
        res.render('main/about-us')
    }
}

module.exports = mainController
