const path = require('path');
const fs = require('fs');
const users = require('../database/userData.json')

const userController = {

    login: (req, res) => {
        res.render('users/login')
    },

    register: (req, res) => {
        res.render('users/register')
    },

    create: (req, res) =>{

        let newImage
        if(req.file == undefined){
            newImage="user.png"
        }else{
            newImage=req.file.filename
        }

        //save the new user
        let usersDataFile = fs.readFileSync(path.join(__dirname,'../database/userData.json'), {encoding: 'utf-8'});
        let oldUsersJSON;
        let id;
        if (usersDataFile == ""){
            oldUsersJSON = [];
            id = oldUsersJSON[oldUsersJSON.length - 1].id
        } else{
            oldUsersJSON = JSON.parse(usersDataFile);
            id = 1;
        }

        let newUser = {
            id: id + 1,
            name: req.body.name,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            image: newImage
        }

        oldUsersJSON.push(newUser);
        usersJSON = JSON.stringify(oldUsersJSON);
        fs.writeFileSync(path.join(__dirname,'../database/userData.json'),usersJSON);

        res.redirect('/users/register')

    },

    list: (req,res) => {
        res.render('users/userList', {users})
    }

}
module.exports = userController

