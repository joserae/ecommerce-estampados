const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require("express-validator");

const Sequelize = require('sequelize');
const db = require("../database/models/index.js");
const Op = Sequelize.Op
const dbUsers = db.User
const dbRole = db.Role

const userController = {

    login: (req, res) => {
        res.render('users/login')
    },

    //testing out the databases
    userList: (req, res) => {
        dbRole.findAll().then(function(data){
            res.json(data)
        })
    },
    
    loginProcess: async (req, res) => {

        //1. finding the existing user
        let loggedUser = await dbUsers.findOne({
            where: {
                email: { [Op.like]: `%${req.body.email}%` }
            }
        })

        //2. compare passwords from the existing user. If the password is fine, let me in. If it isn't, show me the errors.
        
            let errors = validationResult(req)
            if(loggedUser){
                let passwordVerification = bcrypt.compareSync(req.body.password, loggedUser.password)
                if (passwordVerification == true && errors.isEmpty()){

                    //session action and cookie action (for remembering the account and storing it into a cookie.)
                    delete loggedUser.dataValues.password;
                    req.session.loggedUser = loggedUser;
                    if (req.body.remindMe != undefined) {
                        res.cookie("remindMe", loggedUser.email,{
                            maxAge: 30000000
                        })
                    }
                    // res.json("console.log")
                    res.redirect("./profile")
                    // res.render('users/profile', { wholeUser })
                } else {
                    res.render("users/login", { errors })
                }
            }
           
    
    },

    register: (req, res) => {
        res.render('users/register')
    },

    create: (req, res) => {

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
            role_id: 2,
            is_active: 1
        })

        res.redirect('/users/login')

    },

    list: (req, res) => {

        dbUsers.findAll().then(function(Users){
            res.render('users/userList', { Users })
        })
        
    },

    profile: (req, res) => {
        dbUsers.findByPk(req.session.loggedUser.id).then(function(User){
            res.render('users/profile', { User })
        })

    },

    edit: (req,res) => {

        let roles = dbRole.findAll()
        let User = dbUsers.findByPk(req.params.id)

        Promise.all([roles,User])
        
        .then(function([roles,User]){
            res.render('users/edit', {roles,User})

        })
    },

    update: (req, res) => {

        let newImage;
        if(req.file){
            newImage = req.file.filename;
        } 
        
        dbUsers.update({
            first_name: req.body.name,
            last_name: req.body.lastName,
            email: req.body.email,
            avatar_img: newImage,
            role_id: 2,
            is_active: 1
        }, {
            where: {
                id: req.params.id
            }
        }).then(function(user){
            if(!req.file){
                newImage = user.img;
            }
            res.redirect("../userList")
        })
    },

    destroy: (req, res) => {
        dbUsers.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(){
            res.redirect("../userList")
        })
    },

    logout: (req, res) => {
        res.clearCookie('remindMe');
        req.session.destroy();
        return res.redirect('/');
    }

}
module.exports = userController

