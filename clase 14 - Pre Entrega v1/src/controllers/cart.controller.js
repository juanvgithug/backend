// Alumno : Juan Vidal - Comisión 31030

debug = require('debug');

//.env config
require('dotenv').config();
const path = require('path');
const chalk = require("chalk");
const warning = chalk.hex('#FFA500'); // Orange color

const NL = require('os').EOL;

//main debug flag
let zDebug = (process.env.ZDEBUG === 'true');
toolBox.sayDebug (" ", path.win32.basename(__filename), " | debug=", zDebug);

const CARTFILE = process.env.DATA_DIR + "/" + process.env.FILE_CART;
const PRODFILE = process.env.DATA_DIR + "/" + process.env.FILE_PROD;
const db = require("../helpers/hCart");


//create cart from JSON in request
module.exports.createCart = async (req, res) => {

    let products;
    const body = req.body;

    class Cart {
        constructor(id, timestamp, products) {
            if (!(this instanceof Cart)) return new Cart(id, timestamp, products);
            this.id = id;
            this.timestamp = timestamp;
            this.products = products;
        }
    }


    toolBox.sayDebug (" ", path.win32.basename(__filename), "::createCart params", body);

    const oNewCart = new Cart(body.id, body.timestamp, body.products);

    toolBox.sayDebug (" ", path.win32.basename(__filename), "::createCart oNewCart=", oNewCart);

    products = await db.createCart(CARTFILE, oNewCart);

    const data = products;

    res.header("Access-Control-Allow-Origin", "*");

    return res.status(201).json(data);
}

//delete prod by ID
module.exports.deleteCartById = async (req, res) => {

    let products, data, status;
    const id = req.params.id;

    toolBox.sayDebug (" ", path.win32.basename(__filename), "::deleteCartById", req.params, "params.id=", id);

    products = await db.deleteCartById(CARTFILE, String(id));
    if (products !== null) {
        data = `Carrito con ID =[${id}] eliminado.`;;
        status = 200;
    }

    if (products === null) {
        if (zDebug == true) {
            console.log(" ", path.win32.basename(__filename), "::deleteCartById() no data found.");
        }
        data = `Error, carrito con ID =[${id}] no encontrado`;
        status = 404;
    }

    res.header("Access-Control-Allow-Origin", "*");

    return res.status(status).json(data);
};

//create cart from JSON in request
module.exports.getCartProductsAll = async (req, res) => {

    let products;
    const searchId = req.params.id;

    class Cart {
        constructor(id, timestamp, products) {
            if (!(this instanceof Cart)) return new Cart(id, timestamp, products);
            this.id = id;
            this.timestamp = timestamp;
            this.products = products;
        }
    }


    toolBox.sayDebug (" ", path.win32.basename(__filename), "::createCart params", searchId);

    products = await db.getCartProductsAll(CARTFILE, searchId);

    let data = products;
    let status = 201;
    if (data === null) {
        if (zDebug == true) {
            console.log(" ", path.win32.basename(__filename), "::createCart() no data found.");
        }
        data = `Error, carrito con ID =[${searchId}] no encontrado`;
        status = 404;
    }

    res.header("Access-Control-Allow-Origin", "*");

    return res.status(status).json(data);
}

//`POST: '/:id/productos/:id_prod'` - Para incorporar productos al carrito por su id de producto
module.exports.addCartProductById = async (req, res) => {

    let products, data, status;
    const id = String(req.params.id);
    const idProd = String(req.params.id_prod);

    toolBox.sayDebug (" ", path.win32.basename(__filename), "::addCartProductById", req.params, "params.id=", id, "params.id_prod=", idProd);

    products = await db.getCartProductsAll(CARTFILE, id);
    if (products !== null) {
        //agregar prod por su id prod
        data = `Carrito con ID =[${id}] encontrado. `;
        status = 200;
        products = await db.addCartProductById(CARTFILE, id, PRODFILE, idProd);
        if (products === null) {
            if (zDebug == true) {
                console.log(" ", path.win32.basename(__filename), "::addCartProductById() cart found, product not found.");
            }
            status = 404;
            data += ` ERROR: Producto inexitente ID =[${idProd}].`;
            res.header("Access-Control-Allow-Origin", "*");
            return res.status(status).json(data);

        } else {
            data += `Producto con ID =[${idProd}] agregado.`;
            products = await db.getCartProductsAll(CARTFILE, id);
        }
    }
    if (products === null) {
        if (zDebug == true) {
            console.log(" ", path.win32.basename(__filename), "::addCartProductById() no data found.");
        }
        data = `Error, carrito con ID =[${id}] no encontrado`;
        status = 404;
    }

    res.header("Access-Control-Allow-Origin", "*");
    return res.status(status).json(data);

}

//`DELETE: '/:id/productos/:id_prod'` - Eliminar un producto del carrito por su id de carrito y de producto
module.exports.deleteCartProductById = async (req, res) => {

    let products, data, status;
    const id = String(req.params.id);
    const idProd = String(req.params.id_prod);

    toolBox.sayDebug (" ", path.win32.basename(__filename), "::deleteCartProductById", req.params, "params.id=", id, "params.id_prod=", idProd);

    products = await db.getCartProductsAll(CARTFILE, id);
    if (products !== null) {
        //borrar prod por su id prod
        data = `Carrito con ID =[${id}] encontrado. `;
        status = 200;
        products = await db.deleteCartProductByProdId(CARTFILE, id, PRODFILE, idProd);
        toolBox.sayDebug (" ", path.win32.basename(__filename), `::deleteCartProductById() :: AFTER DELETE:: ${products}.`);

        if (products === null) {
            if (zDebug == true) {
                console.log(" ", path.win32.basename(__filename), "::deleteCartProductById() no product data found.");
            }
            data += `Error, producto con ID =[${idProd}] no encontrado`;
            status = 404;
        } else {
            data += `Producto con ID =[${idProd}] eliminado.`;
        }
        products = await db.getCartProductsAll(CARTFILE, id);
        //data += JSON.stringify(products, null, '\t');
    }

    if (products === null) {
        if (zDebug == true) {
            console.log(" ", path.win32.basename(__filename), "::deleteCartProductById() no data found.");
        }
        data = `Error, carrito con ID =[${id}] no encontrado`;
        status = 404;
    }

    res.header("Access-Control-Allow-Origin", "*");

    return res.status(status).json(data);

}









//get prod by ID
module.exports.getProductById = async (req, res) => {

    let products;
    const id = req.params.id;

    //console.log(" getProductById",req.params, "params.id=",id);

    products = await db.getProductById(CARTFILE, String(id));

    let data = products;
    if (!data || data === 'undefined') {
        if (zDebug == true) {
            console.log(" ", path.win32.basename(__filename), "::getProductById() no data found.");
        }
        data = "Error, producto no encontrado";
    }

    res.header("Access-Control-Allow-Origin", "*");

    return res.status(200).json(data);
};

//delete prod by ID
module.exports.deleteProductById = async (req, res) => {

    let products;
    const id = req.params.id;

    toolBox.sayDebug (" ", path.win32.basename(__filename), "::deleteProductById", req.params, "params.id=", id);

    products = await db.deleteProductById(CARTFILE, String(id));

    let data = products;
    if (data === null) {
        if (zDebug == true) {
            console.log(" ", path.win32.basename(__filename), "::getProductById() no data found.");
        }
        data = "Error, producto no encontrado";
    }

    res.header("Access-Control-Allow-Origin", "*");

    return res.status(200).json(data);
};


//error: no product
module.exports.errorNoProduct = async (req, res) => {

    let products;
    const id = req.params.id;

    toolBox.sayDebug (" ", path.win32.basename(__filename), "::errorNoProduct", req.params, "params.id=", id);

    let data = "Error, debe especificar un producto.";

    res.header("Access-Control-Allow-Origin", "*");

    return res.status(200).json(data);
};

//error: opp not supp
module.exports.errorOperationNotSupported = async (req, res) => {

    let products;
    const id = req.params.id;

    toolBox.sayDebug (" ", path.win32.basename(__filename), "::errorOperationNotSupported", req.params, "params.id=", id);

    let data = "Error, operación no soportada.";

    res.header("Access-Control-Allow-Origin", "*");

    return res.status(405).json(data);
};