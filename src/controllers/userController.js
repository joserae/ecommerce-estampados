const path = require('path');
const fs = require('fs');
const users = require('../database/userData.json');
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
    
    loginProcess: (req, res) => {

        //1. finding the existing user
        let loggedUser = dbUsers.findOne({
            where: {
                email: { [Op.like]: `%${req.body.email}%` }
            }
        })

        //2. compare passwords from the existing user. If the password is fine, let me in. If it isn't, show me the errors.
        loggedUser.then(function(wholeUser){
            let errors = validationResult(req)
            if (wholeUser){
                let passwordVerification = bcrypt.compareSync(req.body.password, wholeUser.password)
                if (passwordVerification == true && errors.isEmpty()){

                    //session action and cookie action (for remembering the account and storing it into a cookie.)
                    req.session.loggedUser = wholeUser;
                    if (req.body.remindMe != undefined) {
                        res.cookie("remindMe", wholeUser.email,{
                            maxAge: 30000000
                        })
                    }

                    res.render('users/profile', { wholeUser })
                } else {
                    res.render("users/login", { errors })
                }
            } 
        })
        
        loggedUser.then(function(result){

        })
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
        dbUsers.findAll().then(function(Users){
            res.render('users/profile', { Users })
        })

    },

    edit: (req,res) => {
        dbUsers.findByPk(req.params.id).then(function(User){
            res.render('users/edit', {User})
        })
    },

    update: (req, res) => {
        //image setup
        let newImage
        if (req.file == undefined) {
            newImage = "user.png"
        } else {
            newImage = req.file.filename
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
        }).then(function(){
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
    }

}
module.exports = userController

