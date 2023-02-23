const { join } = require('path');
const sequelize = require('sequelize');
const path = require('path');
const urlApi = 'http://localhost:3000/api/products'
const urlImg = 'http://localhost:3000/img'

//declarando la base de datos
const db = require('../../database/models/index.js');
const { count } = require('console');
const dbBrands = db.Brand;
const dbCategories = db.Category;
const dbGenres = db.Genre;
const dbProducts = db.Product;
const dbSizes = db.Size;
const dbStock = db.Stock;

const producstApiController = {

    list: async (req, res) =>{
        
        let allProducts = await dbProducts.findAll({
            attributes: ['id','name','description']
        });

        let products =  allProducts.map( element => {
            return {...element['dataValues'],
                detail : urlApi + '/' + element['dataValues']['id']}
        })

        let countByCategoryAllProducts = await dbProducts.findAll({
            attributes: [
                [sequelize.fn('COUNT', sequelize.col('Category.id')),'total']
            ],
            include: [
                {model: dbCategories,
                    required: true,
                    attributes: ['name']
                }               
            ],
            group: `Category.id`
        })

        let countByCategory = Object.fromEntries(
            Object.values(countByCategoryAllProducts).map(element => {
                return  [element['dataValues']['Category']['name'],element['dataValues']['total']]
            })
        )

        res.json({
                count: products.length,
                countByCategory: countByCategory,
                products: products
            })

    },

    detail: async (req, res) =>{

        let oneProduct = await dbProducts.findByPk(req.params.id,{
            attributes: ['id','name','description','price','img','brand_id','category_id','genre_id']
        })

        let productSizes = await dbStock.findAll({
            where: {product_id: req.params.id}
        })

        let product = {...oneProduct['dataValues'],img : urlImg + '/' + oneProduct['dataValues']['img']}
        
        res.json({
            product: product,
            sizes: productSizes
        })

    }
    
}

module.exports = producstApiController
