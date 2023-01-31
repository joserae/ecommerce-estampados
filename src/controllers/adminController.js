const path = require('path');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require("express-validator");

const Sequelize = require('sequelize');
const db = require("../database/models/index.js");
const Op = Sequelize.Op
const dbUsers = db.User
const dbRole = db.Role

const adminController = {

    admin: (req, res) =>{
        res.render('admin/admin')
    },

    createAdminUser: (req, res) => {

        dbRole.findAll()
        .then(function(roles){
            res.render('admin/createUser',{roles})
        })        
    },

    store: (req, res) => {

        //image setup
        let newImage
        if (req.file == undefined) {
            newImage = "user.png"
        } else {
            newImage = req.file.filename
        }

        let encryptedPassword = bcrypt.hashSync(req.body.password, 10);

        dbUsers.create({
            first_name: req.body.name,
            last_name: req.body.lastName,
            email: req.body.email,
            password: encryptedPassword,
            avatar_img: newImage,
            role_id: req.body.role,
            is_active: 1
        })
        .then(() => res.redirect('/users/userList'))

    }

}
module.exports = adminController

