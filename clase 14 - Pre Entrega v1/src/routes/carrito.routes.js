// Alumno : Juan Vidal - Comisión 31030

debug = require('debug');

require('dotenv').config();
const path = require('path');
const toolBox = require('../helpers/hToolbox');

//main debug flag
let zDebug = (process.env.ZDEBUG === 'true');
toolBox.sayDebug (" ", path.win32.basename(__filename), " | debug=", zDebug);


//main router file
const express = require('express');
const routerCart = require('./rCart');

const cartRouter = express.Router();

cartRouter.use('/', routerCart);

module.exports = cartRouter;