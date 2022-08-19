// Alumno : Juan Vidal - Comisión 31030

//.env config
require('dotenv').config("/.env");
debug = require('debug');
const path = require('path');
const toolBox = require('./hToolbox');
const NL = require('os').EOL;

//main debug flag
let zDebug = (process.env.ZDEBUG === 'true');

const fs = require('fs');

class Product {
    constructor(id, timestamp, title, description, code, thumbnail, price, stock) {
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

class Contenedor {
    constructor(fileName) {
        this.fileName = fileName;
        this.newId = 0;

        toolBox.sayDebug (" ", path.win32.basename(__filename), "Contenedor :: constructor () ",`checking for ${this.fileName} ...`);
        let fileExists =  toolBox.fileExists(this.fileName);
        toolBox.sayDebug (" ", path.win32.basename(__filename), "Contenedor :: constructor () ",`result= ${fileExists} ...`);
        if (!fileExists) {
            toolBox.sayDebug (" ", path.win32.basename(__filename), "Contenedor :: constructor () ", `${this.fileName} does not exist. Creating...`);
            toolBox.ensureFile(this.fileName);
        }

    }
    //save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
    async save(paramProduct) {
        toolBox.sayDebug("begin save(); ");

        try {
            let oProduct = new Product;
            oProduct.timestamp = Date.now();
            oProduct.title = paramProduct.title;
            oProduct.description = paramProduct.description;
            oProduct.code = toolBox.getCoderCode();
            oProduct.thumbnail = paramProduct.thumbnail;
            oProduct.price = paramProduct.price;
            oProduct.stock = paramProduct.stock;

            const fileData = await fs.promises.readFile(this.fileName, 'utf-8');


            if (fileData.length === 0) {
                let objectInfo = [];
                this.newId = oProduct.id = 1;
                objectInfo.push(oProduct);
                await fs.promises.writeFile(
                    this.fileName,
                    JSON.stringify(objectInfo, null, '\t')
                );
                toolBox.sayDebug("File is empty. Inserted ID=", this.newId);
                return this.newId;
            } else {
                let max = 0;
                let objectInfo = JSON.parse(fileData);

                if (objectInfo.length === 0) {
                    this.newId = oProduct.id = 1;
                    objectInfo.push(oProduct);
                    await fs.promises.writeFile(
                        this.fileName,
                        JSON.stringify(objectInfo, null, '\t')
                    );
                    toolBox.sayDebug("File is empty. Inserted ID=", this.newId);
                    return this.newId;
                } else {
                    max = objectInfo.reduce((a, b) => a.id > b.id ? a : b).id;
                    toolBox.sayDebug('maxId: ', max)
                    this.newId = oProduct.id = max + 1;
                }
                toolBox.sayDebug('this.newId = oProduct.id = max + 1= ', this.newId, oProduct.id, max + 1)
                objectInfo.push(oProduct);

                await fs.promises.writeFile(
                    this.fileName,
                    JSON.stringify(objectInfo, null, '\t')
                );
                toolBox.sayDebug("Inserted ID=", this.newId);
            }
            toolBox.sayDebug("exit save(); retval=", this.newId)
            return (this.newId);
        } catch (error) {
            toolBox.sayError(error);
        }
    } 

    //update
    async update(paramProduct) {
        toolBox.sayDebug("begin update(); ");

        try {
            let oProduct = new Product;
            oProduct.timestamp = Date.now();
            oProduct.title = paramProduct.title;
            oProduct.description = paramProduct.description;
            oProduct.code = paramProduct.code;
            oProduct.thumbnail = paramProduct.thumbnail;
            oProduct.price = paramProduct.price;
            oProduct.stock = paramProduct.stock;
            oProduct.id = paramProduct.id;

            const fileData = await fs.promises.readFile(this.fileName, 'utf-8');
            if (fileData.length === 0) {
                let objectInfo = [];
                this.newId = oProduct.id;
                objectInfo.push(oProduct);
                await fs.promises.writeFile(
                    this.fileName,
                    JSON.stringify(objectInfo, null, '\t')
                );
                toolBox.sayDebug("File is empty. Created data and inserted new product with ID=", this.newId);
                return this.newId;
            } else {
                let objectInfo = JSON.parse(fileData);
                if (objectInfo.length === 0) {
                    this.newId = oProduct.id; 
                    objectInfo.push(oProduct);
                    await fs.promises.writeFile(
                        this.fileName,
                        JSON.stringify(objectInfo, null, '\t')
                    );
                    toolBox.sayDebug("File has no JSON data. Created data and inserted new product with ID=", this.newId);
                    return this.newId;
                } else {
                    this.newId = oProduct.id;
                }
                toolBox.sayDebug('this.newId = oProduct.id ', this.newId, oProduct.id)
                objectInfo.push(oProduct);
                await fs.promises.writeFile(
                    this.fileName,
                    JSON.stringify(objectInfo, null, '\t')
                );
                toolBox.sayDebug("Inserted ID=", this.newId);
            }
            toolBox.sayDebug("exit save(); retval=", this.newId)
            return (this.newId); 
        } catch (error) {
            toolBox.sayError(error);
        }
    } 

    // getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
    async getById(paramId) {
        try {
            const fileData = await fs.promises.readFile(this.fileName, 'utf-8');
            if (fileData.length === 0) {
                toolBox.sayDebug("::getById() - File is empty. ");
                return null;
            } else {
                const objectInfo = JSON.parse(fileData);
                toolBox.sayDebug("::getById() - ID ", paramId, "objectInfo", objectInfo);
                const objSearch = objectInfo.find(element => String(element.id) === String(paramId));
                if (objSearch && Object.keys(objSearch).length === 0 &&
                    Object.getPrototypeOf(objSearch) === Object.prototype) {
                    toolBox.sayDebug("::getById() - ID ", paramId, "not found, returning null");
                    return null;
                }
                if (!objSearch || objSearch === 'undefined') {
                    toolBox.sayDebug("::getById() - ID ", paramId, "not found, returning null");
                    return null;
                }
                toolBox.sayDebug("objSearch=", objSearch);
                toolBox.sayDebug("objectInfo=", objectInfo);
                return objSearch;
            }
        } catch (error) {
            toolBox.sayError(error);
        }
    } 

    // getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.
    async getAll() {
        try {
            const fileData = await fs.promises.readFile(this.fileName, 'utf-8');
            if (fileData.length === 0) {
                if (zDebug == true) {
                    console.log("::getAll() - File is empty. ");
                }
                return null;
            } else {
                let objectInfo = JSON.parse(fileData);
                if (objectInfo && Object.keys(objectInfo).length === 0 &&
                    Object.getPrototypeOf(objectInfo) === Object.prototype) {
                    toolBox.sayDebug("::getAll() - no objects found, returning null");
                    return null;
                }
                toolBox.sayDebug("::getAll() - objects found, returning ...", objectInfo);
                return objectInfo;
            }
        } catch (err) {
            toolBox.sayError(err);
        }
    } 
    
    //deleteById(Number): boolean - Elimina del archivo el objeto con el id buscado.
    async deleteById(paramId) {
        try {
            const fileData = await fs.promises.readFile(this.fileName, 'utf-8');
            if (fileData.length === 0) {
                toolBox.sayDebug("::getAll() - File is empty. ");
                return null;

            } else {
                const objectInfo = JSON.parse(fileData);
                if (objectInfo && Object.keys(objectInfo).length === 0 &&
                    Object.getPrototypeOf(objectInfo) === Object.prototype) {
                    toolBox.sayDebug("::deleteById() - no objects found, returning null");
                    return null;
                }
                const objSearch = objectInfo.filter(objSearch => String(objSearch.id) !== String(paramId));
                await fs.promises.writeFile(
                    this.fileName,
                    JSON.stringify(objSearch, null, '\t')
                );
                return true;
            }

        } catch (err) {
            toolBox.sayError(err);
        }
    } 

    // deleteAll(): void - Elimina todos los objetos presentes en el archivo.
    async deleteAll() {

        try {
            await fs.promises.writeFile(this.fileName, '[]');
        } catch (err) {
            toolBox.sayError(err);
        }
    } 
} 

async function createDefaultData(fileName) {
    const oContenedor = new Contenedor(fileName);
    const oNewProduct1 = new Product(0, 0, "Escuadra", "", toolBox.getCoderCode(), "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png", 123.45, 13);
    const oNewProduct2 = new Product(0, 0, "Calculadora", "", toolBox.getCoderCode(), "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png", 234.56, 13);
    const oNewProduct3 = new Product(0, 0, "Globo Terráqueo", "", toolBox.getCoderCode(), "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png", 345.67, 13);
    const oNewProduct4 = new Product(0, 0, "iPhone 13 Pro Max", "", toolBox.getCoderCode(), "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pro-max-graphite-select?wid=470&hei=556&fmt=png-alpha&.v=1645552346288", 1590, 13);
    let retVal = await oContenedor.deleteAll();
    retVal = await oContenedor.save(oNewProduct1);
    retVal = await oContenedor.save(oNewProduct2);
    retVal = await oContenedor.save(oNewProduct3);
    retVal = await oContenedor.save(oNewProduct4);

    return true;
};


async function getProductsAll(fileName) {
    toolBox.sayDebug (" ", path.win32.basename(__filename), "::getProductsAll() - fileName = ", fileName);
    const oContenedor = new Contenedor(fileName);
    toolBox.sayDebug (" ", path.win32.basename(__filename), "> Invocacion a método ::getAll()");
    const retVal = await oContenedor.getAll();
    toolBox.sayDebug (" ", path.win32.basename(__filename), "  Objeto Devuelto=", retVal, NL);
    return (retVal);
};

async function getProductsRandom(fileName) {
    toolBox.sayDebug (" ", path.win32.basename(__filename), "::getProductsRandom() - fileName = ", fileName);
    const oContenedor = new Contenedor(fileName);
    toolBox.sayDebug (" ", path.win32.basename(__filename), "> Invocacion a método ::getAll()");
    const retVal = await oContenedor.getAll();
    toolBox.sayDebug (" ", path.win32.basename(__filename), "  Objeto Devuelto=", retVal, NL);
    const maxLimit = retVal.length;
    let rand = Math.random() * maxLimit;
    console.log(rand); // double
    rand = Math.floor(rand); // int
    toolBox.sayDebug (" ", path.win32.basename(__filename), "  Número aleatorio=", rand, " / Límite = ", maxLimit, NL);
    toolBox.sayDebug (" ", path.win32.basename(__filename), "> Invocacion a método ::getById()", NL, "Búsqueda por ID=", rand);
    const oSearch = retVal[rand];
    toolBox.sayDebug (" ", path.win32.basename(__filename), "  Objeto Devuelto=", oSearch, NL);
    return (oSearch);
};

async function getProductById(fileName, strId) {
    toolBox.sayDebug (" ", path.win32.basename(__filename), "::getProductById() - fileName = ", fileName);
    const oContenedor = new Contenedor(fileName);
    toolBox.sayDebug (" ", path.win32.basename(__filename), `> Invocacion a método ::getProductById(${fileName}, ${strId} ) `);
    const retVal = await oContenedor.getById(strId);
    toolBox.sayDebug (" ", path.win32.basename(__filename), "  Objeto Devuelto=", retVal, NL);
    return (retVal);
};

async function createProduct(fileName, oProduct) {
    toolBox.sayDebug (" ", path.win32.basename(__filename), "::createProduct() - fileName = ", fileName);
    const oContenedor = new Contenedor(fileName);
    const oNewProduct1 = oProduct;
    toolBox.sayDebug (" ", path.win32.basename(__filename), `> Invocacion a método ::createProduct(${fileName},  `, oProduct);
    let newProdId = await oContenedor.save(oNewProduct1);
    const retVal = await oContenedor.getById(newProdId);
    toolBox.sayDebug (" ", path.win32.basename(__filename), "  Objeto Devuelto=", retVal, NL);
    toolBox.sendSocketUpdate(retVal);
    return (retVal);
};

async function deleteProductById(fileName, strId) {
    toolBox.sayDebug (" ", path.win32.basename(__filename), "::deleteProductById() - fileName = ", fileName);
    const oContenedor = new Contenedor(fileName);
    const found = await oContenedor.getById(strId);
    let retVal = null;
    if (found) {
        toolBox.sayDebug (" ", path.win32.basename(__filename), `> Invocacion a método ::deleteById(${fileName}, ${strId} ) `);
        retVal = await oContenedor.deleteById(strId);
        toolBox.sayDebug (" ", path.win32.basename(__filename), "  Valor Devuelto=", retVal, NL);
    }
    toolBox.sendSocketUpdate(retVal);
    return (retVal);
};

async function updateProductById(fileName, oProduct) {
    toolBox.sayDebug (" ", path.win32.basename(__filename), "::updateProductById() - fileName = ", fileName);
    const oContenedor = new Contenedor(fileName);
    const found = await oContenedor.getById(oProduct.id);
    let retVal = null;
    if (found) {
        //delete old obj
        toolBox.sayDebug (" ", path.win32.basename(__filename), `> Invocacion a método ::deleteById( ${oProduct.id} ) `);
        retVal = await oContenedor.deleteById(String(oProduct.id));
        toolBox.sayDebug (" ", path.win32.basename(__filename), "  Valor Devuelto=", retVal, NL);
        //save with same id
        toolBox.sayDebug (" ", path.win32.basename(__filename), `> Invocacion a método ::update( ${oProduct} ) `);
        retVal = await oContenedor.update(oProduct);
        toolBox.sayDebug (" ", path.win32.basename(__filename), "  Valor Devuelto=", retVal, NL);
        //retrieve last updated product
        retVal = await oContenedor.getById(oProduct.id);
    }

    toolBox.sendSocketUpdate(retVal);
    return (retVal);
};


//exports
module.exports = {
    createDefaultData,
    getProductsAll,
    getProductsRandom,
    getProductById,
    createProduct,
    deleteProductById,
    updateProductById,
};