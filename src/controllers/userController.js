const path = require('path');

const userController = {

    login: (req, res) => {
        res.render('users/login')
    },

    register: (req, res) => {
        res.render('users/register')
    },

    detail:(req, res)=>{
     let detailProfile = req.query.detail;
     res.send(detailProfile);
    },

    create:(req, res) =>{
    res.render(createProfile)
    },

    edit: (req, res) =>{
         let user = req.params.id;
         res.render = (user);
    },

    store: (req, res) =>{
        let newUser = {
			id: req.body.id,
            firstname: req.body.firstname,
            lastName: req.body.lastName,
			email: req.body.email,
            password: req.body.pasword,
            category: req.body.category,
            image: "images/avatars/pletzale",
            stock: true,
}
    },
}
module.exports = userController

