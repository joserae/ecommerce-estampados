const path = require('path');
const products = require('../database/productDataBase.json')

const mainController = {

    shoppingCart: (req, res) => {
        res.render('cart/shopping-cart', {products})
    }

}

module.exports = mainController
