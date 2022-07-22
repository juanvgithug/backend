// Alumno : Juan Vidal - Comisión 31030
// Desafio Clase 8 - Router Multer

const express = require('express');
const routerProductos = express.Router();
const prodController = require('../controllers/prod.controller');

routerProductos.get("/", prodController.getAllProducts);
routerProductos.get("/:id", prodController.getProductById);
routerProductos.post("/", prodController.createProduct);
routerProductos.post("/:id", prodController.errorOperationNotSupported);
routerProductos.delete("/:id", prodController.deleteProductById);
routerProductos.delete("/", prodController.errorNoProduct);
routerProductos.put("/", prodController.updateProductById);

module.exports = routerProductos