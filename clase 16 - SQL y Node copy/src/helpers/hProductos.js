// Alumno : Juan Vidal - Comisión 31030

//.env config
require('dotenv').config("/.env");
debug = require('debug');
const path = require('path');

const toolBox = require('./hToolbox');
const NL = "\n\r";

//main debug flag
let zDebug = (process.env.ZDEBUG === 'true');

const fs = require('fs');

class Product {
    constructor(id, timestamp, title, description, code, thumbnail, price, stock) {
        if (!(this instanceof Product)) return new Product(id, timestamp, title, description, code, thumbnail, price, stock);
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
        if (!(this instanceof Contenedor)) return new Contenedor(fileName);
        this.fileName = fileName;
        this.newId = 0;

        zDebug ? console.log(path.win32.basename(__filename), "Contenedor :: constructor () ",`checking for ${this.fileName} ...`):true;
        let fileExists =  toolBox.fileExists(this.fileName);
        zDebug ? console.log(path.win32.basename(__filename), "Contenedor :: constructor () ",`result= ${fileExists} ...`):true;
        if (!fileExists) {
            zDebug ? console.log(path.win32.basename(__filename), "Contenedor :: constructor () ", `${this.fileName} does not exist. Creating...`): true;
            toolBox.ensureFile(this.fileName);
        }

    }

    async save(paramProduct) {
        if (zDebug == true) {
            console.log("begin save(); ");
        }

        try {
            let oProduct = new Product;
            //id, timestamp, title, description, code,  thumbnail, price, stock
            oProduct.timestamp = Date.now();
            oProduct.title = paramProduct.title;
            oProduct.description = paramProduct.description;
            oProduct.code = toolBox.getCoderCode();
            oProduct.thumbnail = paramProduct.thumbnail;
            oProduct.price = paramProduct.price;
            oProduct.stock = paramProduct.stock;

            //Parse data file
            const fileData = await fs.promises.readFile(this.fileName, 'utf-8');

            //file is empty
            if (fileData.length === 0) {
                let objectInfo = [];
                this.newId = oProduct.id = 1;
                objectInfo.push(oProduct);
                //write file increasing LastID
                await fs.promises.writeFile(
                    this.fileName,
                    JSON.stringify(objectInfo, null, '\t')
                );
                if (zDebug == true) {
                    console.log("File is empty. Inserted ID=", this.newId);

                    //toolBox.sendSocketUpdate();
                    return this.newId;
                }
            }
            //file has contents, try to parse JSON data
            else {
                let max = 0;
                let objectInfo = JSON.parse(fileData);

                //test for empty results
                if (objectInfo.length === 0) {
                    this.newId = oProduct.id = 1;
                    objectInfo.push(oProduct);
                    //write file increasing LastID
                    await fs.promises.writeFile(
                        this.fileName,
                        JSON.stringify(objectInfo, null, '\t')
                    );
                    if (zDebug == true) {
                        console.log("File is empty. Inserted ID=", this.newId);
                    }
                    //toolBox.sendSocketUpdate();
                    return this.newId;

                } else {
                    // Optional - Sort by ID:
                    // objectInfo.sort((a, b) => (a.id > b.id) ? 1 : -1)
                    // console.log('Sorted by ID')
                    // console.log('Type: ', typeof objectInfo);
                    // console.log('Contents: ', objectInfo)

                    //get MAX ID
                    max = objectInfo.reduce((a, b) => a.id > b.id ? a : b).id;
                    if (zDebug == true) {
                        console.log('maxId: ', max)
                    }
                    //inc MAX ID
                    this.newId = oProduct.id = max + 1;
                }
                if (zDebug == true) {
                    console.log('this.newId = oProduct.id = max + 1= ', this.newId, oProduct.id, max + 1)
                }
                objectInfo.push(oProduct);

                //write file increasing LastID
                await fs.promises.writeFile(
                    this.fileName,
                    JSON.stringify(objectInfo, null, '\t')
                );
                if (zDebug == true) {
                    console.log("Inserted ID=", this.newId);
                }
            }

            if (zDebug == true) {
                console.log("exit save(); retval=", this.newId)
            }
            //toolBox.sendSocketUpdate();
            return (this.newId); //new ID
        } catch (error) {
            toolBox.sayError(error);
        }
    } //end function save()

    //update
    async update(paramProduct) {
        if (zDebug == true) {
            console.log("begin update(); ");
        }

        try {
            let oProduct = new Product;


            //id, timestamp, title, description, code,  thumbnail, price, stock
            oProduct.timestamp = Date.now();
            oProduct.title = paramProduct.title;
            oProduct.description = paramProduct.description;
            oProduct.code = paramProduct.code;
            oProduct.thumbnail = paramProduct.thumbnail;
            oProduct.price = paramProduct.price;
            oProduct.stock = paramProduct.stock;
            oProduct.id = paramProduct.id;

            //Parse data file
            const fileData = await fs.promises.readFile(this.fileName, 'utf-8');

            //file is empty
            if (fileData.length === 0) {
                let objectInfo = [];
                this.newId = oProduct.id; //create product with supplied id
                objectInfo.push(oProduct);
                //write file increasing LastID
                await fs.promises.writeFile(
                    this.fileName,
                    JSON.stringify(objectInfo, null, '\t')
                );
                if (zDebug == true) {
                    console.log("File is empty. Created data and inserted new product with ID=", this.newId);
                    return this.newId;
                }
            }
            //file has contents, try to parse JSON data
            else {
                let objectInfo = JSON.parse(fileData);

                //test for empty results
                if (objectInfo.length === 0) {
                    this.newId = oProduct.id; //save product with supplied id
                    objectInfo.push(oProduct);
                    //write file increasing LastID
                    await fs.promises.writeFile(
                        this.fileName,
                        JSON.stringify(objectInfo, null, '\t')
                    );
                    if (zDebug == true) {
                        console.log("File has no JSON data. Created data and inserted new product with ID=", this.newId);
                    }
                    return this.newId;

                } else {
                    // Optional - Sort by ID:
                    // objectInfo.sort((a, b) => (a.id > b.id) ? 1 : -1)
                    // console.log('Sorted by ID')
                    // console.log('Type: ', typeof objectInfo);
                    // console.log('Contents: ', objectInfo)

                    //get MAX ID
                    // let max = objectInfo.reduce((a, b) => a.id > b.id ? a : b).id;
                    // if (zDebug == true) {
                    //     console.log('maxId: ', max)
                    // }
                    // //inc MAX ID
                    //work with current ID
                    this.newId = oProduct.id;
                }
                if (zDebug == true) {
                    console.log('this.newId = oProduct.id ', this.newId, oProduct.id)
                }
                objectInfo.push(oProduct);

                //write file increasing LastID
                await fs.promises.writeFile(
                    this.fileName,
                    JSON.stringify(objectInfo, null, '\t')
                );
                if (zDebug == true) {
                    console.log("Inserted ID=", this.newId);
                }
            }

            if (zDebug == true) {
                console.log("exit update(); retval=", this.newId)
            }
            return (this.newId); //new ID
        } catch (error) {
            toolBox.sayError(error);
        }
    } //end function update()

    // getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
    async getById(paramId) {
        //console.log("::getById() - Begin. filename, id = ", this.fileName,",", paramId);
        //debug = true;
        try {
            //Parse data file
            const fileData = await fs.promises.readFile(this.fileName, 'utf-8');

            //file has contents, try to parse JSON data
            if (fileData.length === 0) {
                if (zDebug == true) {
                    console.log("::getById() - File is empty. ");
                }
                return null;
            }
            //file has contents, try to parse JSON
            else {
                const objectInfo = JSON.parse(fileData);

                const objSearch = objectInfo.find(objectInfo => String(objectInfo.id) === String(paramId));
                //test for empty results
                if (objSearch && Object.keys(objSearch).length === 0 &&
                    Object.getPrototypeOf(objSearch) === Object.prototype) {
                    if (zDebug == true) {
                        console.log("::getById() - ID ", paramId, "not found, returning null");
                    }
                    return null;
                }
                if (!objSearch || objSearch === 'undefined') {
                    if (zDebug == true) {
                        console.log("::getById() - ID ", paramId, "not found, returning null");
                    }
                    return null;
                }
                if (zDebug == true) {
                    console.log("objSearch=", objSearch);
                    console.log("objectInfo=", objectInfo);
                }
                return objSearch;
            }
        } catch (error) {
            toolBox.sayError(error);
        }
    } //end function getById()

    // getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.
    async getAll() {
        try {
            //Parse data file
            const fileData = await fs.promises.readFile(this.fileName, 'utf-8');
            //file has contents, try to parse JSON data
            if (fileData.length === 0) {
                if (zDebug == true) {
                    console.log("::getAll() - File is empty. ");
                }
                return null;
            }
            //file has contents, try to parse JSON
            else {
                let objectInfo = JSON.parse(fileData);
                //test for empty results
                if (objectInfo && Object.keys(objectInfo).length === 0 &&
                    Object.getPrototypeOf(objectInfo) === Object.prototype) {
                    if (zDebug == true) {
                        console.log("::getAll() - no objects found, returning null");
                    }
                    return null;
                }
                //console.log('Type: ', typeof objectInfo);
                //console.log('Contents: ', objectInfo)
                if (zDebug == true) {
                    console.log("::getAll() - objects found, returning ...", objectInfo);
                }
                return objectInfo;
            }
        } catch (err) {
            toolBox.sayError(err);
        }
    } //end function getAll()

    async deleteById(paramId) {
        try {
            //Parse data file
            const fileData = await fs.promises.readFile(this.fileName, 'utf-8');
            //file has contents, try to parse JSON data
            if (fileData.length === 0) {
                if (zDebug == true) {
                    console.log("::getAll() - File is empty. ");
                }
                return null;
            }
            //file has contents, try to parse JSON
            else {
                const objectInfo = JSON.parse(fileData);
                //test for empty results
                if (objectInfo && Object.keys(objectInfo).length === 0 &&
                    Object.getPrototypeOf(objectInfo) === Object.prototype) {
                    if (zDebug == true) {
                        console.log("::deleteById() - no objects found, returning null");
                    }
                    return null;
                }
                //console.log('Type: ', typeof objectInfo);
                //console.log('Contents: ', objectInfo)
                const objSearch = objectInfo.filter(objSearch => String(objSearch.id) !== String(paramId));
                //save file
                await fs.promises.writeFile(
                    this.fileName,
                    JSON.stringify(objSearch, null, '\t')
                );
                return true;
            }

        } catch (err) {
            toolBox.sayError(err);
        }
    } //end function deleteById(Number)

    // deleteAll(): void - Elimina todos los objetos presentes en el archivo.
    async deleteAll() {

        try {
            await fs.promises.writeFile(this.fileName, '[]');
        } catch (err) {
            toolBox.sayError(err);
        }
    } //end function deleteAll()
} //end class Contenedor

const main = async () => {
    //entry point
    beginProgram();



    const oContenedor = new Contenedor("test.txt");

    console.log("> Crear archivo default con 4 elementos", NL);
    //id, timestamp, title, description, code,  thumbnail, price, stock

    const oNewProduct = new Product("iPhone 13 Pro Max", 1590, "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pro-max-graphite-select?wid=470&hei=556&fmt=png-alpha&.v=1645552346288");
    const oNewProduct1 = new Product("Escuadra", 123.45, "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png");
    const oNewProduct2 = new Product("Calculadora", 234.56, "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png");
    const oNewProduct3 = new Product("Globo Terráqueo", 345.67, "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png");

    let newestProduct = await oContenedor.save(oNewProduct1);
    newestProduct = await oContenedor.save(oNewProduct2);
    newestProduct = await oContenedor.save(oNewProduct3);



    //save()
    console.log("> Invocacion a método ::save()", NL, "Datos del objeto a insertar:");
    console.log(oNewProduct);
    newestProduct = await oContenedor.save(oNewProduct);
    console.log("  Se insertó nuevo objeto con ID=", newestProduct, NL);

    //getByID()
    console.log("> Invocacion a método ::getById()", NL, "Búsqueda por ID=", newestProduct);
    const oSearch = await oContenedor.getById(newestProduct);
    console.log("  Objeto Devuelto=", oSearch, NL);

    //getAll()
    console.log("> Invocacion a método ::getAll()");
    const oAll = await oContenedor.getAll();
    console.log("  Objeto Devuelto=", oAll, NL);

    //deleteById(number)
    console.log(`> Invocacion a método ::deleteById( ${newestProduct}`, ")", NL);
    let retVal = await oContenedor.deleteById(newestProduct);
    console.log("  Resultado =", await oContenedor.getAll(), NL);

    //deleteAll()
    console.log("> Invocacion a método ::deleteAll()", NL);
    await oContenedor.deleteAll();
    console.log("  Eliminados", NL);

    //exit point
    endProgram();
}

/// BEGIN PROGRAM

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

    zDebug ? console.log(path.win32.basename(__filename), "::getProductsAll() - fileName = ", fileName) : true;

    const oContenedor = new Contenedor(fileName);

    zDebug ? console.log(path.win32.basename(__filename), "> Invocacion a método ::getAll()") : true;
    const retVal = await oContenedor.getAll();
    zDebug ? console.log(path.win32.basename(__filename), "  Objeto Devuelto=", retVal, NL) : true;
    ////toolBox.sendSocketUpdate();
    return (retVal);
};

async function getProductsRandom(fileName) {

    zDebug ? console.log(path.win32.basename(__filename), "::getProductsRandom() - fileName = ", fileName) : true;

    const oContenedor = new Contenedor(fileName);

    zDebug ? console.log(path.win32.basename(__filename), "> Invocacion a método ::getAll()") : true;
    const retVal = await oContenedor.getAll();
    zDebug ? console.log(path.win32.basename(__filename), "  Objeto Devuelto=", retVal, NL) : true;

    const maxLimit = retVal.length;
    //generate randon int
    let rand = Math.random() * maxLimit;
    console.log(rand); // double
    rand = Math.floor(rand); // int

    zDebug ? console.log(path.win32.basename(__filename), "  Número aleatorio=", rand, " / Límite = ", maxLimit, NL) : true;

    zDebug ? console.log(path.win32.basename(__filename), "> Invocacion a método ::getById()", NL, "Búsqueda por ID=", rand) : true;
    const oSearch = retVal[rand];
    zDebug ? console.log(path.win32.basename(__filename), "  Objeto Devuelto=", oSearch, NL) : true;

    //toolBox.sendSocketUpdate();
    return (oSearch);
};

async function getProductById(fileName, strId) {

    zDebug ? console.log(path.win32.basename(__filename), "::getProductById() - fileName = ", fileName) : true;

    const oContenedor = new Contenedor(fileName);

    zDebug ? console.log(path.win32.basename(__filename), `> Invocacion a método ::getProductById(${fileName}, ${strId} ) `) : true;
    const retVal = await oContenedor.getById(strId);
    zDebug ? console.log(path.win32.basename(__filename), "  Objeto Devuelto=", retVal, NL) : true;

    //toolBox.sendSocketUpdate();
    return (retVal);
};

async function createProduct(fileName, oProduct) {

    zDebug ? console.log(path.win32.basename(__filename), "::createProduct() - fileName = ", fileName) : true;

    const oContenedor = new Contenedor(fileName);
    const oNewProduct1 = oProduct;


    zDebug ? console.log(path.win32.basename(__filename), `> Invocacion a método ::createProduct(${fileName},  `, oProduct) : true;

    let newProdId = await oContenedor.save(oNewProduct1);
    const retVal = await oContenedor.getById(newProdId);

    zDebug ? console.log(path.win32.basename(__filename), "  Objeto Devuelto=", retVal, NL) : true;


    toolBox.sendSocketUpdate(retVal);
    return (retVal);
};

async function deleteProductById(fileName, strId) {

    zDebug ? console.log(path.win32.basename(__filename), "::deleteProductById() - fileName = ", fileName) : true;

    const oContenedor = new Contenedor(fileName);

    //find
    const found = await oContenedor.getById(strId);
    let retVal = null;
    if (found) {
        zDebug ? console.log(path.win32.basename(__filename), `> Invocacion a método ::deleteById(${fileName}, ${strId} ) `) : true;
        retVal = await oContenedor.deleteById(strId);
        zDebug ? console.log(path.win32.basename(__filename), "  Valor Devuelto=", retVal, NL) : true;
    }

    toolBox.sendSocketUpdate(retVal);
    return (retVal);
};

async function updateProductById(fileName, oProduct) {

    zDebug ? console.log(path.win32.basename(__filename), "::updateProductById() - fileName = ", fileName) : true;

    const oContenedor = new Contenedor(fileName);

    //find
    const found = await oContenedor.getById(oProduct.id);
    let retVal = null;
    //update
    if (found) {
        //delete old obj
        zDebug ? console.log(path.win32.basename(__filename), `> Invocacion a método ::deleteById( ${oProduct.id} ) `) : true;
        retVal = await oContenedor.deleteById(String(oProduct.id));
        zDebug ? console.log(path.win32.basename(__filename), "  Valor Devuelto=", retVal, NL) : true;
        //save with same id
        zDebug ? console.log(path.win32.basename(__filename), `> Invocacion a método ::update( ${oProduct} ) `) : true;
        retVal = await oContenedor.update(oProduct);
        zDebug ? console.log(path.win32.basename(__filename), "  Valor Devuelto=", retVal, NL) : true;
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