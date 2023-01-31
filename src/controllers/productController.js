const { join } = require('path');
const sequelize = require('sequelize');
const path = require('path');
// const products = require('../database/productDataBase.json')
// const productsFilePath = path.join(__dirname, '../database/productDataBase.json')
const fs = require('fs');

//declarando la base de datos
const db = require('../database/models/index.js')
const dbBrands = db.Brand;
const dbCategories = db.Category;
const dbGenres = db.Genre;
const dbProducts = db.Product;
const dbSizes = db.Size;
const dbStock = db.Stock;

const productController = {

    list: (req, res) =>{
        
        let promesaProductos = dbProducts.findAll({
            include: [
                {model: dbCategories,
                    required: true,
                    attributes: ['name'],
                    where: {is_active: 1}
                },
                {model: dbGenres,
                    required: true,
                    attributes: ['name']
                },
                {model: dbBrands,
                    required: true,
                    attributes: ['name']
                }
            ]
        });

        let promesaStock = dbStock.findAll({
            attributes: ['available_quantity'],
            include: [
                {model: dbProducts,
                    required: true,
                    attributes: ['name', 'description','img','price'],
                    where: {is_active: 1}
                },
                {model: dbSizes,
                    required: true,
                    attributes: ['size']
                }
            ]
        });

        //para los filtros (en un futuro)
        let promesaGeneros = dbGenres.findAll();
        let promesaCategorias = dbCategories.findAll();
        let promesaMarca = dbBrands.findAll();
        let promesaTallas = dbSizes.findAll();

        Promise.all([promesaProductos,promesaStock, promesaGeneros, promesaCategorias, promesaMarca,promesaTallas]).then(function([products,stock,genres,categories,brands,sizes]){
                res.render('products/list', {products,stock,genres,categories,brands,sizes})
            })
    },

    productDetails: (req, res) =>{

        let detail = dbProducts.findByPk(req.params.id,{
            include: [
                {model: dbCategories,
                    required: true,
                    attributes: ['name'],
                    where: {is_active: 1}
                },
                {model: dbGenres,
                    required: true,
                    attributes: ['name']
                },
                {model: dbBrands,
                    required: true,
                    attributes: ['name']
                }
            ]
        });

        let stock = dbStock.findAll({
            attributes: ['available_quantity'],
            include: [
                {model: dbProducts,
                    required: true,
                    attributes: ['name', 'description','img','price'],
                    where: {
                        id: req.params.id
                    }
                },
                {model: dbSizes,
                    required: true,
                    attributes: ['size']
                }
            ]
        });

        Promise.all([detail, stock]).then(function([product,stock]){
            res.render('products/productDetails', {product,stock})

        })
    },
    
    createProduct: (req, res) => {

        let categories = dbCategories.findAll({
            where: {is_active: 1}
        });
        let brands = dbBrands.findAll({
            where: {is_active: 1}
        });
        let genres = dbGenres.findAll();
        let sizes = dbSizes.findAll();

        Promise.all([categories,brands,genres,sizes]).then(function([categories,brands,genres,sizes]){
            res.render('products/createProduct', {categories,brands,genres,sizes})

        })
    },

    storeProduct: (req, res) =>{
        //proceso de multer
        let newImage
        if(req.file == undefined){
            newImage="default-shoes.jpg"
        }else{
            newImage=req.file.filename
        }
        //finaliza proceso de multer
        // console.log(JSON.stringify(req.body))

        //revisar lo que proviene del formulario
        let formBody = req.body

        //[idSize,cantDisp]
        let arrSizes = []

        //buscar checked checkbox
        let arrChecked = Object.keys(formBody).filter((key) => key.startsWith('size') && !key.endsWith('quantity'))
        
        arrChecked.forEach(key => {
            let idSize = key.split('_')[1]
            let property = 'size_'
            property = property.concat(idSize,'_quantity')
            //validar que la cantidad disponible no esté vacía
            if(formBody[property] != ''){
                //armar el array de tallas
                arrSizes.push([idSize,formBody[property]])
            }
        })

        //crear el producto
        dbProducts.create({
			name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            img: newImage,
            is_active: 1,
            brand_id: parseInt(req.body.brand),
            category_id: parseInt(req.body.category),
            genre_id: parseInt(req.body.genre)
		})
        //obtener el id del nuevo producto
        .then(function(producto){
            // console.log(producto)
            return producto.id
        })
        .then(function(idProducto){
            // console.log(idProducto)
            let arrObjSizes = []

            //armar el array para bulkCreate
            arrSizes.forEach(element => {
                let size_id = element[0]
                let available_quantity = element[1]
                arrObjSizes.push({'product_id':idProducto,'size_id':size_id,'available_quantity':available_quantity})
            })

            dbStock.bulkCreate(arrObjSizes)
        })
        .then(() => res.redirect('./list'))
        .catch(error => console.log(error))

    },

    editProduct: (req, res) => {

        let id = parseInt(req.params.id)

        let product =  dbProducts.findByPk(id)
        let categories = dbCategories.findAll({
            where: {is_active: 1}
        });
        let brands = dbBrands.findAll({
            where: {is_active: 1}
        });
        let genres = dbGenres.findAll();
        let sizes = dbSizes.findAll();
        let stock = dbStock.findAll({
            where: {product_id:id}
        })

        Promise.all([product,categories,brands,genres,sizes,stock]).then(function([product,categories,brands,genres,sizes,stock]){
            res.render('products/editProduct', {product,categories,brands,genres,sizes,stock})

        })

    },

    update: (req, res)=>{

        let id = req.params.id

        let product =  dbProducts.findByPk(id)

        let newImage;
        //validate if the user change the product image
        if(req.file){
            newImage = req.file.filename;
        } else{
            newImage = product.img;
        }

        // console.log(JSON.stringify(req.body))

        //EDICIÓN DEL STOCK
        // //revisar lo que proviene del formulario
        // let formBody = req.body

        // //[idSize,cantDisp]
        // let arrSizes = []

        // //buscar checked checkbox
        // let arrChecked = Object.keys(formBody).filter((key) => key.startsWith('size') && !key.endsWith('quantity'))
        
        // arrChecked.forEach(key => {
        //     let idSize = key.split('_')[1]
        //     let property = 'size_'
        //     property = property.concat(idSize,'_quantity')
        //     //validar que la cantidad disponible no esté vacía
        //     if(formBody[property] != ''){
        //         //armar el array de tallas
        //         arrSizes.push([idSize,formBody[property]])
        //     }
        // })

        // let arrObjSizes = []

        // //armar el array para bulkCreate
        // arrSizes.forEach(element => {
        //     let size_id = element[0]
        //     let available_quantity = element[1]
        //     arrObjSizes.push({'product_id':id,'size_id':size_id,'available_quantity':available_quantity})
        // })

        let updateProduct = dbProducts.update
            ({
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                img: newImage,
                is_active: 1,
                brand_id: parseInt(req.body.brand),
                category_id: parseInt(req.body.category),
                genre_id: parseInt(req.body.genre),
                modified_date: sequelize.fn('NOW')
            },
            {where: 
                {id:id}
            })
        
        // let createStock = dbStock.bulkCreate(arrObjSizes,
        //     {
        //         fields:['product_id', 'size_id', 'available_quantity'],
        //         updateOnDuplicate: ['available_quantity']
        //     })

        // Promise.all([updateProduct,createStock])
        .then(() => res.redirect('../list'))
        
        .catch(error => console.log(error))

    },

    //Delete one product from DB
    destroy : (req, res) => {

        let id = parseInt(req.params.id)

        dbProducts.destroy({
            where: {id:id}
        })	
        .then(() => res.redirect('../list'))

        .catch(error => console.log(error))
    }
}


module.exports = productController
