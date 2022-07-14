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
    //console.log("  Objeto Devuelto=", retVal, NL);

    return (retVal);
};

async function getProductsRandom(fileName) {

    console.clear();
    toolBox.sayHi();
    console.log(" ::getProductsRandom() - fileName = ", fileName);

    const oContenedor = new coderDataFile.Contenedor(fileName);

    console.log(" > Invocacion a método ::getAll()");
    const retVal = await oContenedor.getAll();
    //console.log("  Objeto Devuelto=", retVal, NL);

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


//exports
module.exports = {
    createDefaultData,
    getProductsAll,
    getProductsRandom
};