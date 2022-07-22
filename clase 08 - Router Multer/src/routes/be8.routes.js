// Alumno : Juan Vidal - Comisión 31030
// Desafio Clase 8 - Router Multer

const express = require('express');
const mainRouter = express.Router();
const routerProductos = require('./rProductos');

mainRouter.use('/productos', routerProductos);

module.exports = mainRouter;