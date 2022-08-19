// Alumno : Juan Vidal - Comisión 31030

debug = require('debug');

//.env config
require('dotenv').config();
const path = require('path');
const chalk = require("chalk");
const warning = chalk.hex('#FFA500'); // Orange color


//main debug flag
let zDebug = !Boolean(process.env.ZDEBUG);
toolBox.sayDebug (" ", path.win32.basename(__filename), " | debug=", zDebug);

const PRODUCTFILE = process.env.DATA_DIR + "/" + process.env.FILE_PROD;
const db = require("../helpers/hProductos");

//get all prods
module.exports.getAllProducts = async (req, res) => {
    
    let products;
    products = await db.getProductsAll(PRODUCTFILE);

    const data = products;
    if (data && data === 'undefined') {
        if (zDebug == true) {
            console.log(" ", path.win32.basename(__filename),"::getAllProducts() no data found.");
        }
        data = "Error, producto no encontrado";
        return null;
    }

    res.header("Access-Control-Allow-Origin", "*");
  
    return res.status(200).json(data);
};

//get prod by ID
module.exports.getProductById = async (req, res) => {
    
    let products;
    const id = req.params.id;

    //console.log(" getProductById",req.params, "params.id=",id);
    
    products = await db.getProductById(PRODUCTFILE, String(id));

    let data = products;
    if (!data || data === 'undefined') {
        if (zDebug == true) {
            console.log(" ", path.win32.basename(__filename),"::getProductById() no data found.");
        }
        data = "Error, producto no encontrado";
    }

    res.header("Access-Control-Allow-Origin", "*");
  
    return res.status(200).json(data);
};

//create product from JSON in request
module.exports.createProduct = async (req, res) => {
    
    let products;
    const body = req.body;
    class Product {
        constructor(id, timestamp, title, description, code,  thumbnail, price, stock) {
            if (!(this instanceof Product)) return new Product(id, timestamp, title, description, code,  thumbnail, price, stock);
            this.id = id;
            this.timestamp = timestamp;
            this.title = title;
            this.description = description;
            this.code = code;
            this.thumbnail = thumbnail;
            this.price = price;
            this.stock = stock;
        }
    };
    
    toolBox.sayDebug (" ", path.win32.basename(__filename),"::createProduct params", body);
    toolBox.sayDebug (" ", path.win32.basename(__filename),"params = ", body.id,body.timestamp,body.title, body.description,body.code,body.thumbnail,body.price,body.stock);
    
    const oNewProduct1 = new Product(body.id, body.timestamp, body.title, body.description, body.code, body.thumbnail, body.price, body.stock);

    products = await db.createProduct(PRODUCTFILE, oNewProduct1);

    const data = products;

    res.header("Access-Control-Allow-Origin", "*");
  
    return res.status(201).json(data);
}

//delete prod by ID
module.exports.deleteProductById = async (req, res) => {
    
    let products;
    const id = req.params.id;

    zDebug ?console.log(" ", path.win32.basename(__filename),"::deleteProductById",req.params, "params.id=",id):true;
    
    products = await db.deleteProductById(PRODUCTFILE, String(id));

    let data = products;
    if ( data === null ) {
        if (zDebug == true) {
            console.log(" ", path.win32.basename(__filename),"::getProductById() no data found.");
        }
        data = "Error, producto no encontrado";
    }

    res.header("Access-Control-Allow-Origin", "*");
  
    return res.status(200).json(data);
};

//update prod by ID
module.exports.updateProductById = async (req, res) => {
    
    let products;
    const body = req.body;
    class Product {
        constructor(id, timestamp, title, description, code,  thumbnail, price, stock) {
            if (!(this instanceof Product)) return new Product(id, timestamp, title, description, code,  thumbnail, price, stock);
            this.id = id;
            this.timestamp = timestamp;
            this.title = title;
            this.description = description;
            this.code = code;
            this.thumbnail = thumbnail;
            this.price = price;
            this.stock = stock;
        }
    };
    
    toolBox.sayDebug("path.win32.basename(__filename),::updateProductById params", body);
    toolBox.sayDebug("path.win32.basename(__filename),params = ", req.params.id, body.timestamp, body.title, body.description, body.code, body.thumbnail, body.price, body.stock);
    
    const oNewProduct1 = new Product(req.params.id, body.timestamp, body.title, body.description, body.code, body.thumbnail, body.price, body.stock);

    products = await db.updateProductById(PRODUCTFILE, oNewProduct1);

    if (products === null) {
        products = `Error: Producto con ID=${req.params.id} no encontrado, está intentando actualizar un producto inexistente.`;
    }

    const data = products;


    res.header("Access-Control-Allow-Origin", "*");
  
    return res.status(200).json(data);
};

//error: no product
module.exports.errorNoProduct = async (req, res) => {
    
    let products;
    const id = req.params.id;

    toolBox.sayDebug (" ", path.win32.basename(__filename),"::errorNoProduct",req.params, "params.id=",id);
    
    let data = "Error, debe especificar un producto.";

    res.header("Access-Control-Allow-Origin", "*");
  
    return res.status(200).json(data);
};

//error: opp not supp
module.exports.errorOperationNotSupported = async (req, res) => {
    
    let products;
    const id = req.params.id;

    toolBox.sayDebug (" ", path.win32.basename(__filename),"::errorOperationNotSupported",req.params, "params.id=",id);
    
    let data = "Error, operación no soportada.";

    res.header("Access-Control-Allow-Origin", "*");
  
    return res.status(405).json(data);
};

