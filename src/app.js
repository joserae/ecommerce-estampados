const express = require("express");
const app = express();
const port = 3000;
const path = require('path');
const publicPath = path.resolve(__dirname, "../public");
const mainRouter = require('./routers/mainRouter');
const methodOverride = require("method-override");
const session = require("express-session");
const cookieParser = require('cookie-parser');
const recordarmeUser = require ("./middlewares/recordarme.js");
//Middleware
app.use(express.static(publicPath))
//Middleware para capturar la información por POST y convertirlo a JSON
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
//Middleware para editar información existente
app.use(methodOverride("_method"));
//Middleware para implementar session globalmente
app.use(session({
	secret: "la clave es secreta",
	resave: true,
    saveUninitialized: true
}));
app.use(recordarmeUser);
//Middleware para implementar cookie
app.use(cookieParser());
//Template EJS
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

app.listen(port, () => {
	console.log("Servidor corriendo en http://localhost:" + port)
});

//Rutas
app.use('/', mainRouter)