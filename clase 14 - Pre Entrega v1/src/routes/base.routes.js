// Alumno : Juan Vidal - Comisión 31030


require('dotenv').config();
const path = require('path');
const toolBox = require('../helpers/hToolbox');

//main debug flag
let zDebug = (process.env.ZDEBUG === 'true');
toolBox.sayDebug (" ", path.win32.basename(__filename), " | debug=", zDebug);

//main router file
const express = require('express');
const routerBase = require('./rbase');

const baseRouter = express.Router();

baseRouter.use('/', routerBase);

module.exports = baseRouter;