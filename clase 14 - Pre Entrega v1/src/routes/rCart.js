// Alumno : Juan Vidal - Comisión 31030

debug = require('debug');
const express = require('express');

require('dotenv').config();
const path = require('path');
const toolBox = require('../helpers/hToolbox');

//main debug flag
let zDebug = (process.env.ZDEBUG === 'true');
toolBox.sayDebug (" ", path.win32.basename(__filename), " | debug=", zDebug);

//Controller routerProductos
const cartController = require('../controllers/cart.controller');

const routerCart = express.Router();

// create new cart 
// `POST: '/' `             - Crea un carrito y devuelve su id.
routerCart.post("/", cartController.createCart);

//delete cart by ID
//`DELETE: '/:id' `        - Vacía un carrito y lo elimina.
routerCart.delete("/:id", cartController.deleteCartById);

// Retrieve all Products from cart
//`GET: '/:id/productos' ` - Me permite listar todos los productos guardados en el carrito
routerCart.get("/:id/productos", cartController.getCartProductsAll);

//`POST: '/:id/productos/:id_prod'` - Para incorporar productos al carrito por su id de producto
routerCart.post("/:id/productos/:id_prod", cartController.addCartProductById);

//`DELETE: '/:id/productos/:id_prod'` - Eliminar un producto del carrito por su id de carrito y de producto
routerCart.delete("/:id/productos/:id_prod", cartController.deleteCartProductById);

module.exports = routerCart;