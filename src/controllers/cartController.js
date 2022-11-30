const path = require('path');
const products = require('../database/productDataBase.json')

const mainController = {

    cart: (req, res) => {
        res.render('cart/cart', {products})
    }

}

module.exports = mainController
