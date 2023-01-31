// const fs = require('fs');

// function remindMeCookie(req, res, next) {
//   const rememberUser = req.body["recordarme"] == 'on';
//   if (rememberUser && req.session.userToLogin == undefined);
//   const userDataJson = fs.readFileSync("src/database/userData.json", { encoding: "utf-8" });
//   if (userDataJson) {
//     let users = JSON.parse(userDataJson);
//     let sessionUser = users.find(user => user.email == req.body.email);

//     if (sessionUser) {
//       req.session.userToLogin = sessionUser;
//     }
//   }

//   next();
// }

const Sequelize = require('sequelize');
const db = require("../database/models/index.js");
const Op = Sequelize.Op
const dbUsers = db.User



function remindMeCookie(req, res, next){
  //si hay cookie, pero no hay nada en sesión, poner los datos del usuario guardado en la cookie en esa sesión.
  if(req.cookies.remindMe != undefined && req.session.loggedUser == undefined){
    dbUsers.findOne({
      where: {
        email: { [Op.like]: `%${req.cookies.remindMe}%` }
    }
    }).then(function(result){
      req.session.loggedUser = result.email
      next();
    })
  }else{
    next();
  }
}



module.exports = remindMeCookie;