// Alumno : Juan Vidal - Comisión 31030
// Desafio Clase 6 - Servidores Web

const coderDataFile = require('./coderDataFile.js');
const toolBox = require('./toolBox');
const NL = require('os').EOL;

async function createDefaultData(fileName) {
    const oContenedor = new coderDataFile.Contenedor(fileName);

    const oNewProduct1 = new coderDataFile.Product("Escuadra", 123.45, "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png");
    const oNewProduct2 = new coderDataFile.Product("Calculadora", 234.56, "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png");
    const oNewProduct3 = new coderDataFile.Product("Globo Terráqueo", 345.67, "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png");

    let retVal = await oContenedor.deleteAll();
    retVal = await oContenedor.save(oNewProduct1);
    retVal = await oContenedor.save(oNewProduct2);
    retVal = await oContenedor.save(oNewProduct3);

    return true;
};


async function getProductsAll(fileName) {
    console.clear();
    toolBox.sayHi();
    console.log(" ::getProductsAll() - fileName = ", fileName);

    const oContenedor = new coderDataFile.Contenedor(fileName);

    console.log(" > Invocacion a método ::getAll()");
    const retVal = await oContenedor.getAll();

    return (retVal);
};

async function getProductsRandom(fileName) {
    console.clear();
    toolBox.sayHi();
    console.log(" ::getProductsRandom() - fileName = ", fileName);

    const oContenedor = new coderDataFile.Contenedor(fileName);

    console.log(" > Invocacion a método ::getAll()");
    const retVal = await oContenedor.getAll();

    const maxLimit = retVal.length;
    let rand = Math.random() * maxLimit;
    console.log(rand); // double
    rand = Math.floor(rand); // int

    console.log("   Número aleatorio=", rand, " / Límite = ", maxLimit, NL);

    console.log(" > Invocacion a método ::getById()", NL, "Búsqueda por ID=", rand);
    const oSearch = retVal[rand];
    console.log("   Objeto Devuelto=", oSearch, NL);

    return (oSearch);
};

async function getProductById(fileName, strId) {
    console.clear();
    toolBox.sayHi();
    console.log(" ::getProductById() - fileName = ", fileName);

    const oContenedor = new coderDataFile.Contenedor(fileName);

    console.log(` > Invocacion a método ::getProductById(${fileName}, ${strId} ) `);
    const retVal = await oContenedor.getById(strId);
    console.log("   Objeto Devuelto=", retVal, NL);

    return (retVal);
};

async function createProduct(fileName, oProduct) {
    console.clear();
    toolBox.sayHi();
    console.log(" ::createProduct() - fileName = ", fileName);

    const oContenedor = new coderDataFile.Contenedor(fileName);
    const oNewProduct1 = oProduct;

    console.log(` > Invocacion a método ::createProduct(${fileName},  `, oProduct);

    let newProdId = await oContenedor.save(oNewProduct1);
    const retVal = await oContenedor.getById(newProdId);

    console.log("   Objeto Devuelto=", retVal, NL);

    return (retVal);
};

async function deleteProductById(fileName, strId) {
    console.clear();
    toolBox.sayHi();
    console.log(" ::deleteProductById() - fileName = ", fileName);

    const oContenedor = new coderDataFile.Contenedor(fileName);

    const found = await oContenedor.getById(strId);
    let retVal = null;
    if (found) {
        console.log(` > Invocacion a método ::deleteById(${fileName}, ${strId} ) `);
        retVal = await oContenedor.deleteById(strId);
        console.log("  Valor Devuelto=", retVal, NL);
    }

    return (retVal);
};

async function updateProductById(fileName, oProduct) {
    console.clear();
    toolBox.sayHi();
    console.log(" ::updateProductById() - fileName = ", fileName);

    const oContenedor = new coderDataFile.Contenedor(fileName);

    const found = await oContenedor.getById(oProduct.id);
    let retVal = null;

    if (found) {
        console.log(` > Invocacion a método ::deleteById( ${oProduct.id} ) `);
        retVal = await oContenedor.deleteById(String(oProduct.id));
        console.log("   Valor Devuelto=", retVal, NL);
        console.log(` > Invocacion a método ::update( ${oProduct} ) `);
        retVal = await oContenedor.update(oProduct);
        console.log("   Valor Devuelto=", retVal, NL);
        retVal = await oContenedor.getById(oProduct.id);
    }

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