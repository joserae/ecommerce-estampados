const express = require("express");
const app = express();
const port = 3000;
const path = require('path');
const publicPath = path.resolve(__dirname, "../public");
const mainRouter = require('./routers/mainRouter');

//Middlewire
app.use(express.static(publicPath))

//Template EJS
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

app.listen(port, () => {
	console.log("Servidor corriendo en http://localhost:" + port)
});

//Rutas
app.use('/', mainRouter)