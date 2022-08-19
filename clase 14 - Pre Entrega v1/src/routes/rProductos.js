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

//Controller routerProductos
const prodController = require('../controllers/prod.controller');
const routerProductos = express.Router();

// create new product
routerProductos.post("/", toolBox.ensureAuthenticated, prodController.createProduct);
routerProductos.post("/:id", toolBox.ensureAuthenticated, prodController.errorOperationNotSupported);

//update product
routerProductos.put("/:id", toolBox.ensureAuthenticated, prodController.updateProductById);

//delete product by ID
routerProductos.delete("/:id", toolBox.ensureAuthenticated, prodController.deleteProductById);

// Retrieve all Products
routerProductos.get("/", toolBox.ensureAuthenticated, prodController.getAllProducts);

// Retrieve product by ID
routerProductos.get("/:id", toolBox.ensureAuthenticated, prodController.getProductById);



module.exports = routerProductos;