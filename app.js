const express = require("express");
const app = express();
const port = 3000;
const path = require('path');
const publicPath = path.resolve(__dirname, "./public");
const mainRouter = require('./routers/mainRouter');

//Middlewire
app.use(express.static(publicPath))

app.listen(port, () => {
	console.log("server running ok in port " + port)
});

//Rutas
app.use('/', mainRouter)