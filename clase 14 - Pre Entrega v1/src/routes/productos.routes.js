// Alumno : Juan Vidal - Comisión 31030

debug = require('debug');
//.env config
require('dotenv').config();
const path = require('path');
const toolBox = require('../helpers/hToolbox');

//main debug flag
let zDebug = (process.env.ZDEBUG === 'true');
toolBox.sayDebug(" ", path.win32.basename(__filename), " | debug=", zDebug);

//main router file
const express = require('express');
const routerProductos = require('./rProductos');

const prodRouter = express.Router();

prodRouter.use('/', routerProductos);

module.exports = prodRouter;
