const express = require("express");
const app = express();
const port = 3000;
const path = require('path')
const publicPath = path.resolve(__dirname, "./public")

app.use(express.static(publicPath))

app.listen(port, () => {
	console.log("server running ok in port " + port)
});

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname,"/views/home.html"))
});

app.get('/home', (req, res) => {
	res.sendFile(path.join(__dirname,"/views/home.html"))
});

app.get('/iniciar-sesion', (req, res) => {
	res.sendFile(path.join(__dirname,"/views/iniciar-sesion.html"))
});

app.get('/registro', (req, res) => {
	res.sendFile(path.join(__dirname,"/views/registro.html"))
});

app.get('/subirImagen', (req, res) => {
	res.sendFile(path.join(__dirname,"/views/subir-imagen.html"))
});

app.get('/estamparArticulo', (req, res) => {
	res.sendFile(path.join(__dirname,"/views/estampar-articulo.html"))
});

app.get('/carrito', (req, res) => {
	res.sendFile(path.join(__dirname,"/views/carrito-de-compras.html"))
});

