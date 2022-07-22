const db = require("../WrapperClase4");
const debug = true;

//get all prods
exports.getAllProducts = async (req, res) => {
    
    let products;
    products = await db.getProductsAll("productos.txt");

    const data = products;
    if (data && data === 'undefined') {
        if (debug == true) {
            console.log("::getAllProducts() no data found.");
        }
        data = "Error, producto no encontrado";
        return null;
    }

    res.header("Access-Control-Allow-Origin", "*");
  
    return res.status(200).json(data);
};

//get prod by ID
exports.getProductById = async (req, res) => {
    
    let products;
    const id = req.params.id;

    products = await db.getProductById("productos.txt", String(id));

    let data = products;
    if (!data || data === 'undefined') {
        if (debug == true) {
            console.log("::getProductById() no data found.");
        }
        data = "Error, producto no encontrado";
    }

    res.header("Access-Control-Allow-Origin", "*");
  
    return res.status(200).json(data);
};

//create product from JSON in request
exports.createProduct = async (req, res) => {
    
    let products;
    const body = req.body;
    class Product {
        constructor(title, price, thumbnail, id) {
            this.title = title;
            this.price = price;
            this.thumbnail = thumbnail;
            this.id = id;
        }
    };
    
    console.log("::createProduct params", body);
    console.log("params = ", body.title, body.price, body.thumbnail);
    
    const oNewProduct1 = new Product(body.title, body.price, body.thumbnail);

    products = await db.createProduct("productos.txt", oNewProduct1);

    const data = products;

    res.header("Access-Control-Allow-Origin", "*");
  
    return res.status(200).json(data);
}

//delete prod by ID
exports.deleteProductById = async (req, res) => {
    
    let products;
    const id = req.params.id;

    console.log("::deleteProductById",req.params, "params.id=",id);
    
    products = await db.deleteProductById("productos.txt", String(id));

    let data = products;
    if ( data === null ) {
        if (debug == true) {
            console.log("::getProductById() no data found.");
        }
        data = "Error, producto no encontrado";
    }

    res.header("Access-Control-Allow-Origin", "*");
  
    return res.status(200).json(data);
};

//update prod by ID
exports.updateProductById = async (req, res) => {
    
    let products;
    const body = req.body;
    class Product {
        constructor(title, price, thumbnail, id) {
            this.title = title;
            this.price = price;
            this.thumbnail = thumbnail;
            this.id = id;
        }
    };
    
    console.log("::updateProductById params", body);
    console.log("params = ", body.title, body.price, body.thumbnail);
    
    const oNewProduct1 = new Product(body.title, body.price, body.thumbnail, body.id);

    products = await db.updateProductById("productos.txt", oNewProduct1);

    if (products === null) {
        products = `Error: Producto con ID=${body.id} no encontrado, está intentando actualizar un producto inexistente.`;
    }

    const data = products;


    res.header("Access-Control-Allow-Origin", "*");
  
    return res.status(200).json(data);
};

//error: no product
exports.errorNoProduct = async (req, res) => {
    
    let products;
    const id = req.params.id;

    console.log("::errorNoProduct",req.params, "params.id=",id);
    
    let data = "Error, debe especificar un producto.";

    res.header("Access-Control-Allow-Origin", "*");
  
    return res.status(200).json(data);
};

//error: opp not supp
exports.errorOperationNotSupported = async (req, res) => {
    
    let products;
    const id = req.params.id;

    console.log("::errorOperationNotSupported",req.params, "params.id=",id);
    
    let data = "Error, operación no soportada.";

    res.header("Access-Control-Allow-Origin", "*");
  
    return res.status(200).json(data);
};

