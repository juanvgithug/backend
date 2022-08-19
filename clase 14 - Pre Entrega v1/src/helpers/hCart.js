// Alumno : Juan Vidal - Comisión 31030

//.env config
require('dotenv').config("/.env");
debug = require('debug');
const path = require('path');
const chalk = require("chalk");
const warning = chalk.hex('#FFA500'); // Orange color


const toolBox = require('./hToolbox');
const NL = require('os').EOL;

const prodHelper = require('./hProductos');

//main debug flag
let zDebug = (process.env.ZDEBUG === 'true');

const fs = require('fs');

class Cart {
    constructor(id, timestamp, products) {
        this.id = id;
        this.timestamp = timestamp;
        this.products = products;
    }
};

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

        toolBox.sayDebug (" ", path.win32.basename(__filename), "Contenedor :: constructor () ", `checking for ${this.fileName} ...`);
        let fileExists = toolBox.fileExists(this.fileName);
        toolBox.sayDebug (" ", path.win32.basename(__filename), "Contenedor :: constructor () ", `result= ${fileExists} ...`);
        if (!fileExists) {
            toolBox.sayDebug (" ", path.win32.basename(__filename), "Contenedor :: constructor () ", `${this.fileName} does not exist. Creating...`);
            toolBox.ensureFile(this.fileName);
        }
    }

    async save(paramCart) {
        if (zDebug == true) {
            console.log(" ", path.win32.basename(__filename), "::save() - begin save(); ");
        }

        try {
            let oCart = new Cart;
            //id, timestamp, products
            oCart.timestamp = Date.now();
            oCart.products = [...paramCart.products];

            //Parse data file
            const fileData = await fs.promises.readFile(this.fileName, 'utf-8');

            //file is empty
            if (fileData.length === 0) {
                let objectInfo = [];
                this.newId = oCart.id = 1;
                objectInfo.push(oCart);
                //write file increasing LastID
                await fs.promises.writeFile(
                    this.fileName,
                    JSON.stringify(objectInfo, null, '\t')
                );
                if (zDebug == true) {
                    console.log(" ", path.win32.basename(__filename), "::save() - File is empty. Inserted ID=", this.newId);
                }
                //toolBox.sendSocketUpdate();
                return this.newId;
            }
            //file has contents, try to parse JSON data
            else {
                let max = 0;
                let objectInfo = JSON.parse(fileData);

                //test for empty results
                if (objectInfo.length === 0) {
                    this.newId = oCart.id = 1;
                    objectInfo.push(oCart);
                    //write file increasing LastID
                    await fs.promises.writeFile(
                        this.fileName,
                        JSON.stringify(objectInfo, null, '\t')
                    );
                    if (zDebug == true) {
                        console.log(" ", path.win32.basename(__filename), "::save() - File is empty. Inserted ID=", this.newId);
                    }
                    //toolBox.sendSocketUpdate();
                    return this.newId;

                } else {
                    // Optional - Sort by ID:
                    toolBox.sayDebug (" ", path.win32.basename(__filename), "::save() - ", `sorted ${this.fileName} ...OK.`);
                    objectInfo.sort((a, b) => (a.id > b.id) ? 1 : -1)
                    //  console.log('Sorted by ID')
                    //  console.log('Type: ', typeof objectInfo);
                    //  console.log('Contents: ', objectInfo)

                    //get MAX ID
                    max = objectInfo.reduce((a, b) => a.id > b.id ? a : b).id;
                    if (zDebug == true) {
                        console.log(" ", path.win32.basename(__filename), '::save() - maxId: ', max)
                    }
                    //inc MAX ID
                    this.newId = oCart.id = max + 1;
                }
                if (zDebug == true) {
                    console.log(" ", path.win32.basename(__filename), '::save() - this.newId = oProduct.id = max + 1= ', this.newId, oCart.id, max + 1)
                }
                objectInfo.push(oCart);

                //write file increasing LastID
                await fs.promises.writeFile(
                    this.fileName,
                    JSON.stringify(objectInfo, null, '\t')
                );
                if (zDebug == true) {
                    console.log(" ", path.win32.basename(__filename), "::save() - Inserted ID=", this.newId);
                }
            }

            if (zDebug == true) {
                console.log(" ", path.win32.basename(__filename), "::save() - exit save(); retval=", this.newId)
            }
            //toolBox.sendSocketUpdate();
            return (this.newId); //new ID
        } catch (error) {
            toolBox.sayError(error);
        }
    } //end function save()

    //update
    async update(paramCart) {
        if (zDebug == true) {
            console.log(" ", path.win32.basename(__filename), "::update() - begin update(); ");
        }

        try {
            let oCart = new Cart;

            oCart.id = paramCart.id;
            oCart.timestamp = paramCart.timestamp;
            oCart.products = [...paramCart.products];

            //Parse data file
            const fileData = await fs.promises.readFile(this.fileName, 'utf-8');

            //file is empty
            if (fileData.length === 0) {
                let objectInfo = [];
                this.newId = oCart.id; //create product with supplied id
                objectInfo.push(oCart);
                //write file increasing LastID
                await fs.promises.writeFile(
                    this.fileName,
                    JSON.stringify(objectInfo, null, '\t')
                );
                if (zDebug == true) {
                    console.log(" ", path.win32.basename(__filename), "::update() - File is empty. Created data and inserted new product with ID=", this.newId);
                }
                return this.newId;
            }
            //file has contents, try to parse JSON data
            else {
                let objectInfo = JSON.parse(fileData);

                //test for empty results
                if (objectInfo.length === 0) {
                    this.newId = oCart.id; //save product with supplied id
                    objectInfo.push(oCart);
                    //write file 
                    await fs.promises.writeFile(
                        this.fileName,
                        JSON.stringify(objectInfo, null, '\t')
                    );
                    if (zDebug == true) {
                        console.log(" ", path.win32.basename(__filename), "::update() - File has no JSON data. Created data and inserted new product with ID=", this.newId);
                    }
                    return this.newId;

                } else {
                    // Optional - Sort by ID:
                    toolBox.sayDebug (" ", path.win32.basename(__filename), "::update() - ", `sorted ${this.fileName} ...OK.`);
                    objectInfo.sort((a, b) => (a.id > b.id) ? 1 : -1)
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
                    this.newId = oCart.id;
                }
                if (zDebug == true) {
                    console.log(" ", path.win32.basename(__filename), '::update() - this.newId = oProduct.id ', this.newId, oCart.id)
                }
                objectInfo.push(oCart);

                //write file increasing LastID
                await fs.promises.writeFile(
                    this.fileName,
                    JSON.stringify(objectInfo, null, '\t')
                );
                if (zDebug == true) {
                    console.log(" ", path.win32.basename(__filename), "::update() - Inserted ID=", this.newId);
                }
            }

            if (zDebug == true) {
                console.log(" ", path.win32.basename(__filename), "::update() - exit update(); retval=", this.newId)
            }
            return (this.newId); //new ID
        } catch (error) {
            toolBox.sayError(error);
        }
    } //end function update()

    // getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
    async getById(paramId) {
        //console.log("::getById() - Begin. filename, id = ", this.fileName, ",", paramId);
        //debug = true;
        try {
            //Parse data file
            const fileData = await fs.promises.readFile(this.fileName, 'utf-8');

            //file has contents, try to parse JSON data
            if (fileData.length === 0) {
                if (zDebug == true) {
                    console.log(" ", path.win32.basename(__filename), "::getById() - File is empty. ");
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
                        console.log(" ", path.win32.basename(__filename), "::getById() - ID ", paramId, "not found, returning null");
                    }
                    return null;
                }
                if (!objSearch || objSearch === 'undefined') {
                    if (zDebug == true) {
                        console.log(" ", path.win32.basename(__filename), "::getById() - ID ", paramId, "not found, returning null");
                    }
                    return null;
                }
                if (zDebug == true) {
                    // console.log("::getById() / objSearch=", objSearch);
                    // console.log("::getById() / objectInfo=", objectInfo);
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
                    console.log(" ", path.win32.basename(__filename), "::getAll() - File is empty. ");
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
                        console.log(" ", path.win32.basename(__filename), "::getAll() - no objects found, returning null");
                    }
                    return null;
                }
                //console.log('Type: ', typeof objectInfo);
                //console.log('Contents: ', objectInfo)
                if (zDebug == true) {
                    console.log(" ", path.win32.basename(__filename), "::getAll() - objects found, returning ...", objectInfo);
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
                    console.log(" ", path.win32.basename(__filename), "::getAll() - File is empty. ");
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
                        console.log(" ", path.win32.basename(__filename), "::deleteById() - no objects found, returning null");
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










async function cartHasProduct(fileName, strIdCart, strIdProd) {
    let isInArray = false;
    toolBox.sayDebug (" ", path.win32.basename(__filename), "::cartHasProduct() - fileName = ", fileName);

    const oContenedor = new Contenedor(fileName);

    toolBox.sayDebug (" ", path.win32.basename(__filename), `::cartHasProduct() -> Invocacion a método ::getById( carrito=${strIdCart}) `);
    const retVal = await oContenedor.getById(strIdCart);

    if (retVal !== null) {
        toolBox.sayDebug (" ", path.win32.basename(__filename), `::cartHasProduct() - Carrito encontrado, buscando producto = ${strIdProd} ...`, NL);


        const foundProds = retVal.products;

        toolBox.sayDebug (" ", path.win32.basename(__filename), "::cartHasProduct() - array del carrito ", foundProds, NL);

        for (let i = 0; i < foundProds.length; i++) {
            keys = Object.keys(foundProds[i]);
            toolBox.sayDebug (" ", path.win32.basename(__filename), "::cartHasProduct() - keys del carrito ", keys, NL);
            toolBox.sayDebug (" ", path.win32.basename(__filename), "::cartHasProduct() - keys.some(arrVal => 'id' === arrVal) == ", keys.some(arrVal => 'id' === arrVal), NL);
            if (keys.some(arrVal => 'id' === arrVal)) {
                toolBox.sayDebug (" ", path.win32.basename(__filename), "::cartHasProduct() - clave 'ID' encontrada. Valor = ", foundProds[i].id, NL);
                if (foundProds[i].id.toString() === strIdProd) {
                    isInArray = true;
                    toolBox.sayDebug (" ", path.win32.basename(__filename), `::cartHasProduct() - producto (${strIdProd}) - isInArray = ${isInArray}`, NL);
                    return (isInArray);
                }
            }
        }
    }
    return (isInArray);
}

async function getCartsAll(fileName) {
    toolBox.sayDebug (" ", path.win32.basename(__filename), "::getProductsAll() - fileName = ", fileName);

    const oContenedor = new Contenedor(fileName);

    toolBox.sayDebug (" ", path.win32.basename(__filename), "> Invocacion a método ::getAll()");
    const retVal = await oContenedor.getAll();
    toolBox.sayDebug (" ", path.win32.basename(__filename), "  Objeto Devuelto=", retVal, NL);
    ////toolBox.sendSocketUpdate();
    return (retVal);
};

async function getCartProductsAll(fileName, strId) {
    toolBox.sayDebug (" ", path.win32.basename(__filename), "::getCartProductsAll() - fileName = ", fileName);

    const oContenedor = new Contenedor(fileName);

    toolBox.sayDebug (" ", path.win32.basename(__filename), `::getCartProductsAll() -> Invocacion a método ::getById(${strId}) `);
    const retVal = await oContenedor.getById(strId);

    if (retVal !== null) {
        toolBox.sayDebug (" ", path.win32.basename(__filename), "::getCartProductsAll() -  Se encontraron productos.", NL);

        //toolBox.sendSocketUpdate();
        return (retVal.products);

    }
    return (retVal);
};


async function createCart(fileName, oCart) {
    toolBox.sayDebug (" ", path.win32.basename(__filename), "::createCart() - fileName = ", fileName);

    const oContenedor = new Contenedor(fileName);
    const oNewCart = oCart;

    toolBox.sayDebug (" ", path.win32.basename(__filename), `> Invocacion a método ::createCart(${fileName},  `, oCart);

    let newCartId = await oContenedor.save(oNewCart);
    const retVal = await oContenedor.getById(newCartId);

    toolBox.sayDebug (" ", path.win32.basename(__filename), "  Objeto Devuelto=", retVal, NL);

    toolBox.sendSocketUpdate(retVal);
    return (retVal);
};

async function deleteCartById(fileName, strId) {
    toolBox.sayDebug (" ", path.win32.basename(__filename), "::deleteCartById() - fileName = ", fileName);

    const oContenedor = new Contenedor(fileName);

    //find
    const found = await oContenedor.getById(strId);
    let retVal = null;
    if (found) {
        toolBox.sayDebug (" ", path.win32.basename(__filename), `::deleteCartById() - > Invocacion a método ::deleteById(${strId} ) `);
        retVal = await oContenedor.deleteById(strId);
        toolBox.sayDebug (" ", path.win32.basename(__filename), "::deleteCartById() -  Valor Devuelto=", retVal, NL);
    }

    toolBox.sendSocketUpdate(retVal);
    return (retVal);
};

async function addCartProductById(fileName, strIdCart, fileNameProd, strIdProd) {
    toolBox.sayDebug (" ", path.win32.basename(__filename), "::addCartProductById() - fileName = ", fileName);

    const oContenedor = new Contenedor(fileName);

    toolBox.sayDebug (" ", path.win32.basename(__filename), `> Invocacion a método ::getById( idCart = ${strIdCart} `);

    const oCart = await oContenedor.getById(strIdCart);
    if (oCart === null) {
        toolBox.sayDebug (" ", path.win32.basename(__filename), `::addCartProductById() - ERROR: carrito inexistente [idCart = ${strIdCart}]. Objeto Devuelto=`, retVal, NL);
        return (null);
    } else // cart found, add prod by idProd
    {
        toolBox.sayDebug (" ", path.win32.basename(__filename), `> Carrito encontrado [idCart = ${strIdCart}]. Invocacion a método ::getProductById( idProd = ${strIdProd} `);
        let oProd = await prodHelper.getProductById(fileNameProd, strIdProd);
        if (oProd === null) {
            toolBox.sayDebug (" ", path.win32.basename(__filename), `::addCartProductById() - ERROR: producto inexistente [idProd = ${strIdProd}].`, NL);
            return (null);
        } else {
            toolBox.sayDebug (" ", path.win32.basename(__filename), `::addCartProductById() - producto encontrado [idProd = ${strIdProd}]. `, NL);
            //add found product to cart
            oCart.products.push(oProd);

            toolBox.sayDebug (" ", path.win32.basename(__filename), `::addCartProductById() - nuevos datos de carrito [idCart = ${strIdCart}]. `, NL);

            retVal = await deleteCartById(fileName, strIdCart);
            retVal = await oContenedor.update(oCart);
        }
    }

    toolBox.sayDebug (" ", path.win32.basename(__filename), "  Objeto Devuelto=", retVal, NL);

    toolBox.sendSocketUpdate(retVal);
    return (retVal);
};



async function deleteCartProductByProdId(fileName, strIdCart, fileNameProd, strIdProd) {
    toolBox.sayDebug (" ", path.win32.basename(__filename), "::deleteCartProductByProdId() - fileName = ", fileName);

    const oContenedor = new Contenedor(fileName);

    toolBox.sayDebug (" ", path.win32.basename(__filename), `> Invocacion a método ::deleteCartProductByProdId(${fileName}, idCart = ${strIdCart}, idProd = ${strIdProd} `);

    const oCart = await oContenedor.getById(strIdCart);
    if (oCart === null) {
        toolBox.sayDebug (" ", path.win32.basename(__filename), `::deleteCartProductByProdId() - ERROR: carrito inexistente [idCart = ${strIdCart}]. `, NL);
        return (null);
    } else // cart found, delete prod by idProd
    {

        let oProd = await prodHelper.getProductById(fileNameProd, strIdProd);

        if (oCart === null) {
            toolBox.sayDebug (" ", path.win32.basename(__filename), `::deleteCartProductByProdId() - ERROR: producto inexistente [idProd = ${strIdProd}].`, NL);
            return (null);
        } else {
            //delete found product from cart
            toolBox.sayDebug (" ", path.win32.basename(__filename), `::deleteCartProductByProdId() - producto encontrado [idProd = ${strIdProd}]. `, NL);

            toolBox.sayDebug (" ", path.win32.basename(__filename), `::deleteCartProductByProdId() - LLAMADA A getCartProductById [idProd = ${strIdProd}], [idCart = ${strIdCart}].`, NL);
            let cartHasProduct = await getCartProductById(fileName, strIdCart, fileNameProd, strIdProd);

            if (cartHasProduct === true) {
                toolBox.sayDebug (" ", path.win32.basename(__filename), `::deleteCartProductByProdId() - producto [idProd = ${strIdProd}] encontrado en carrito [${strIdCart}].`, NL);

                toolBox.sayDebug (" ", path.win32.basename(__filename), `::deleteCartProductByProdId() - producto  [strIdProd = ${strIdProd}].`, NL);
                const newProds = oCart.products.filter(objSearch => String(objSearch.id) !== String(strIdProd));
                oCart.products.length = 0;
                oCart.products = [...newProds];

                toolBox.sayDebug (" ", path.win32.basename(__filename), `::deleteCartProductByProdId() - nuevos datos de carrito [idCart = ${strIdCart}]. `, NL);
                //update cart
                retVal = await deleteCartById(fileName, strIdCart);
                retVal = await oContenedor.update(oCart);

            } else {
                toolBox.sayDebug (" ", path.win32.basename(__filename), `::deleteCartProductById() - carrito [idCart = ${strIdCart}] no contiene producto [idProd = ${strIdProd}].`, NL);
                return (null);
            }

        }
    }

    toolBox.sendSocketUpdate(retVal);
    return (retVal);
};

async function getCartProductById(fileName, strIdCart, fileNameProd, strIdProd) {
    toolBox.sayDebug (" ", path.win32.basename(__filename), "::getCartProductById() - fileName = ", fileName);

    const oContenedor = new Contenedor(fileName);

    toolBox.sayDebug (" ", path.win32.basename(__filename), `> Invocacion a método ::getById(idCart = ${strIdCart}`);

    const oCart = await oContenedor.getById(strIdCart);
    if (oCart === null) {
        toolBox.sayDebug (" ", path.win32.basename(__filename), `::getCartProductById() - ERROR: carrito inexistente [idCart = ${strIdCart}]. `, NL);
        return (false);
    } else // cart found, delete prod by idProd
    {
        toolBox.sayDebug (" ", path.win32.basename(__filename), `::getCartProductById() - carrito EXISTE [idCart = ${strIdCart}]. Buscando productos...`, NL);
        let oProd = await prodHelper.getProductById(fileNameProd, strIdProd);
        if (oProd === null) {
            toolBox.sayDebug (" ", path.win32.basename(__filename), `::getCartProductById() - ERROR: producto inexistente en BBDD [idProd = ${strIdProd}].`, NL);
            return (false);
        } else {
            toolBox.sayDebug (" ", path.win32.basename(__filename), `::getCartProductById() - producto existente en BBDD [idProd = ${strIdProd}]. `, NL);

            let objSearch = await cartHasProduct(fileName, strIdCart, strIdProd);

            toolBox.sayDebug (" ", path.win32.basename(__filename), "::getCartProductById() - cartHasProduct(...) = objSearch=", objSearch);

            toolBox.sayDebug (" ", path.win32.basename(__filename), `::getCartProductById() - after SEARCH - variables : [idProd = ${strIdProd}], [idCart = ${strIdCart}], [objSearch = ${objSearch}]. `, NL);

            if (objSearch === true) {
                toolBox.sayDebug (" ", path.win32.basename(__filename), `::getCartProductById() - producto [idProd = ${strIdProd}] encontrado en carrito  [idCart = ${strIdCart}] [objSearch.id = ${objSearch}].`, NL);
                return true;

            } else {
                toolBox.sayDebug (" ", path.win32.basename(__filename), `::getCartProductById() - ERROR: producto [idProd = ${strIdProd}] NO encontrado en carrito  [idCart = ${strIdCart}]. `, NL);
                return false;
            }

        }
    }
};











async function deleteProductById(fileName, strId) {

    toolBox.sayDebug (" ", path.win32.basename(__filename), "::deleteProductById() - fileName = ", fileName);

    const oContenedor = new Contenedor(fileName);

    //find
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

    //find
    const found = await oContenedor.getById(oProduct.id);
    let retVal = null;
    //update
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
    getCartsAll,
    createCart,
    deleteCartById,
    getCartProductsAll,
    deleteProductById,
    updateProductById,
    addCartProductById,
    deleteCartProductByProdId
};