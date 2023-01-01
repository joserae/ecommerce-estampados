const path = require('path');
const fs = require('fs');
const users = require('../database/userData.json');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require("express-validator");

const userController = {

    login: (req, res) => {
        res.render('users/login')
    },

    loginProcess: (req, res) => {
        let users = [];
        
        if (req.cookies.recordarme != undefined && req.session.userToLogin == undefined);
        const userDataJson = fs.readFileSync("src/database/userData.json", { encoding: "utf-8" });
        
        console.log("userDataJson: ", userDataJson);
        
        if (userDataJson) {
            users = JSON.parse(userDataJson);
           
        } 

        let loggedUser = users.find( user => user['email'] == req.body.email)
        
        if (loggedUser == undefined) {//usuario logueado//

           
        }
        
        req.session.loggedUser = loggedUser;
        if (req.body.recordarme != undefined) {//recordar usuario
            res.cookie("recordarme", loggedUser.email,
                { expires: new Date("2023-12-31") })
                
        }
        if (loggedUser) {
            let errors = validationResult(req)
           let isOkPassword = bcrypt.compareSync(req.body.password, loggedUser.password)
           if (isOkPassword && errors.isEmpty()) {
               console.log("El usuario logueado es " + req.session.loggedUser.email);
                return res.render('users/userList', { users })
            } else {
                return res.render("users/login", { errors: errors.errors })

            }
        }
       return res.render('users/login')



        /*return res.render('users/login', {
            errors:{
                email: {
                    msg: 'Email o contraseña incorrecta'
                }
            }
        })*/


    },

    register: (req, res) => {
        res.render('users/register')
    },

    create: (req, res) => {

        let newImage
        if (req.file == undefined) {
            newImage = "user.png"
        } else {
            newImage = req.file.filename
        }

        //save the new user
        let usersDataFile = fs.readFileSync(path.join(__dirname, '../database/userData.json'), { encoding: 'utf-8' });
        let oldUsersJSON, id;
        let passEncriptada = bcrypt.hashSync(req.body.password, 10);

        if (usersDataFile == "" || usersDataFile == "[]") {
            oldUsersJSON = [];
            id = 1;
        } else {
            oldUsersJSON = JSON.parse(usersDataFile);
            id = oldUsersJSON[oldUsersJSON.length - 1].id + 1
        }

        let newUser = {
            id: id,
            name: req.body.name,
            lastName: req.body.lastName,
            email: req.body.email,
            password: passEncriptada,
            image: newImage
        }

        oldUsersJSON.push(newUser);
        usersJSON = JSON.stringify(oldUsersJSON);
        fs.writeFileSync(path.join(__dirname, '../database/userData.json'), usersJSON);

        res.redirect('/users/register')

    },

    list: (req, res) => {
        res.render('users/userList', { users })
    }

}
module.exports = userController

