// Alumno : Juan Vidal - Comisión 31030

debug = require('debug');
const express = require('express');
//.env config
require('dotenv').config();
const path = require('path');
const toolBox = require('../helpers/hToolbox');

//main debug flag
let zDebug = (process.env.ZDEBUG === 'true');
toolBox.sayDebug (" ", path.win32.basename(__filename), " | debug=", zDebug);

//Controller base
const baseController = require('../controllers/base.controller');


const routerBase = express.Router();

// Retrieve all Products
routerBase.get("/", baseController.defaultGreeting);


module.exports = routerBase;


