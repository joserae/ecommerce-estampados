const { join } = require('path');
const sequelize = require('sequelize');
const path = require('path');
const urlApi = 'http://localhost:3000/api/users'
const urlAvatars = 'http://localhost:3000/img/usersAvatars'

//declarando la base de datos
const db = require('../../database/models/index.js');
const { count } = require('console');
const dbUsers = db.User
const dbRole = db.Role
const limit = 10

const usersApiController = {

    list: async (req, res) =>{
        
        try{

            let page = req.query.page

            //si no se envía la página, por defecto es la 1
            if(!page){
                page = 1
            }

            let countUsers = await dbUsers.count()
            let cantPages = countUsers / limit
            cantPages = Number.isInteger(cantPages) ? cantPages : Math.floor(cantPages + 1) 

            //si la petición se realiza dentro de los rangos
            if (page > 0 && page <= cantPages){
            
                let offset = page * limit - limit

                let allUsers = await dbUsers.findAll({
                    attributes: ['id','first_name','last_name','email'],
                    limit: limit,
                    offset: offset
                });

                //añadir el detail a cada usuario
                let users = allUsers.map( element => {

                    let detail = urlApi + '/' + element['dataValues']['id']

                    return {
                        ...element['dataValues'],
                        detail : detail
                    }
                })

                let nextPage = parseInt(page) + 1
                let previousPage = parseInt(page) - 1
                let urlNextPage = urlApi + `/?page=${nextPage}`
                let urlPreviousPage = urlApi + `/?page=${previousPage}`

                let data = {
                    count: countUsers,
                    next : urlNextPage,
                    previous : urlPreviousPage,
                    users: users
                }

                //Primera y última página - No requiere previous ni next url
                if (page == 1 && page == cantPages){
                    data.next = null
                    data.previous = null
                }
                //Primera página - No requiere previous url
                else if (page == 1){
                    data.previous = null
                }
                //Última página - No requiere next url
                else if (page == cantPages){
                    data.next = null
                }
                
                res.json(data)

            } 
            //Responder con error
            else{
                res.status(404).json({
                    message: "404 Not Found",
                    status: 404})
            }
        }
        catch (e) {
            console.log({ name: e.name, message: e.message})
            res.status(404).json({
                message: "404 Not Found",
                status: 404})
        }

    },

    detail: async (req, res) =>{

        try {
            let oneUser = await dbUsers.findByPk(req.params.id,{
                attributes: ['id','first_name','last_name','email','avatar_img']
            })

            if (oneUser){
                let user = {...oneUser['dataValues'],avatar_img : urlAvatars + '/' + oneUser['dataValues']['avatar_img']}
            
                res.json(user)

            }else{
                res.status(404).json({
                    message: "404 Not Found",
                    status: 404})
            }

        }
        catch (e) {
            console.log({ name: e.name, message: e.message})
            res.status(404).json({
                message: "404 Not Found",
                status: 404})
        }


    }
    
}

module.exports = usersApiController
