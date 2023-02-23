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

const usersApiController = {

    list: async (req, res) =>{
        
        let allUsers = await dbUsers.findAll({
            attributes: ['id','first_name','last_name','email']
        });

        let users = allUsers.map( element => {
            return {...element['dataValues'], detail : urlApi + '/' + element['dataValues']['id']}
        })

        res.json({
                count: users.length,
                users: users
            })

    },

    detail: async (req, res) =>{

        let oneUser = await dbUsers.findByPk(req.params.id,{
            attributes: ['id','first_name','last_name','email','avatar_img']
        })

        let user = {...oneUser['dataValues'],avatar_img : urlAvatars + '/' + oneUser['dataValues']['avatar_img']}
        
        res.json({
            user: user
        })

    }
    
}

module.exports = usersApiController
