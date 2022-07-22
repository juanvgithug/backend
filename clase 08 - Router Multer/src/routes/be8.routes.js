// Alumno : Juan Vidal - Comisión 31030
// Desafio Clase 8 - Router Multer

//main debug flag
let debug = true;

//main router file

const express = require('express');
const routerProductos = require('./rProductos');

const mainRouter = express.Router();

mainRouter.use('/productos', routerProductos);

module.exports = mainRouter;