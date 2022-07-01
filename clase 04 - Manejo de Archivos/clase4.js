// Alumno : Juan Vidal - Comisión 31030
// Desafio Clase 4 - Manejo de Archivos

// General 
const coderPropaganda = " Alumno : \x1b[1m\x1b[35mJuan Vidal\x1b[0m - Comisión: \x1b[1m\x1b[35m31030\x1b[0m"
const coderEntrega = " Desafio: \x1b[1m\x1b[35mClase 4 - Manejo de Archivos\x1b[0m"
const coderPoweredBy = "\x1b[1m\x1b[34mPowered by NodeJS / CoderHouse\x1b[0m"
const NL = require('os').EOL;
//main debug flag
let debug = true;

// Desafio
const readline = require('readline');
const keyMap = new Map();
keyMap.set('1', 'save(Object)');
keyMap.set('2', 'getById(Number)');
keyMap.set('3', 'getAll(): Object[]');
keyMap.set('4', 'deleteById(Number): void');
keyMap.set('5', 'deleteAll(): void');
keyMap.set('6', 'Crear \'productos.txt\'');

function sayHi() {
    console.clear();
    console.log(coderPropaganda);
    console.log(coderEntrega);
    console.log();
};

function sayBye() {
    console.clear();
    console.log(coderPropaganda, coderEntrega, NL, coderPoweredBy, NL);
};

function sayError(err) {
    console.error("\x1b[41m> ERROR! ", `[${err.name}] (${err.code}) - ${err.message}.`);
};

function fileExists(strFile) {
    const fs = require('fs');
    fs.open(strFile, fs.F_OK, (err) => {
        if (err) {
            return false;
        }
        //file exists
        return true;
    })
};

function createEmptyFile(strFile) {
    const fs = require('fs');
    // create an empty file
    try {
        fs.closeSync(fs.openSync(strFile, 'a'));
    } catch (error) {
        sayError("createEmptyFile() " + error);
    }
};

function listKeys() {
    let strMenu = "";
    keyMap.forEach((value, key) => {
        strMenu += (` \x1b[1m\x1b[35m${key}\x1b[0m ->\x1b[1m ${value}\x1b[0m  `);
    });
    console.log(`${strMenu}${NL} \x1b[1m\x1b[35mCTRL + Q\x1b[0m -> \x1b[1mterminar\x1b[0m`);
};

function sayMenu() {
    console.log('\x1b[0m Seleccione una opción del menu - Funciones disponibles: \x1b[0m');
    listKeys();
}

function doMenuStuff() {
    sayHi();
    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);
    process.stdin.on('keypress', (str, key) => {
        if (key.ctrl && key.name === 'q') {
            sayBye();
            process.exit(); // eslint-disable-line no-process-exit
        } else if (key && key.name === 'return') {
            console.clear();
            listKeys();
        } else {
            if (keyMap.has(str)) {
                runMenuOption(str, keyMap.get(str));
            } else {
                console.log(`Opción de menú para tecla [${key.ctrl ? " CTRL + " : ""} ${key.name} ] no asignada.`);
            }
        }
    });
    sayMenu();
};

async function runMenuOption(symbol, action) {
    console.log(`\x1b[0m\x1b[33m ${symbol} \x1b[31m>> ${action}`);

    let oContenedor = new Contenedor("test.txt");

    const oNewProduct = new Product("iPhone 13 Pro Max", 1590, "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pro-max-graphite-select?wid=470&hei=556&fmt=png-alpha&.v=1645552346288");
    const oNewProduct1 = new Product("Escuadra", 123.45, "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png");
    const oNewProduct2 = new Product("Calculadora", 234.56, "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png");
    const oNewProduct3 = new Product("Globo Terráqueo", 345.67, "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png");

    let newestProduct = 0;

    switch (Number(symbol)) {
        case 1: //save()
            strFileName = "test.txt";
            this.oContenedor = new Contenedor(strFileName);
            console.log(`\x1b[31m  > Crear archivo default \'${strFileName}\' con 4 elementos`);
            this.newestProduct = await oContenedor.save(oNewProduct1);
            this.newestProduct = await oContenedor.save(oNewProduct2);
            this.newestProduct = await oContenedor.save(oNewProduct3);
            console.log(`\x1b[32m  > OK. \x1b[0m`);
            console.log("\x1b[31m  > Invocacion a método ::save()", NL, "  Datos del objeto a insertar:\x1b[0m");
            console.log(oNewProduct);
            this.newestProduct = await oContenedor.save(oNewProduct);
            console.log("\x1b[31m  > Se insertó nuevo objeto con ID=\x1b[0m", this.newestProduct, NL);
            break;

        case 2: //getByID()
            console.log("\x1b[31m  > Invocacion a método ::getById()", NL, "   Búsqueda por ID=", this.newestProduct);
            const oSearch = await oContenedor.getById(this.newestProduct);
            console.log("\x1b[31m    Objeto Devuelto=\x1b[0m", oSearch, NL);
            break;

        case 3: //getAll()
            console.log("\x1b[31m  > Invocacion a método ::getAll()");
            const oAll = await oContenedor.getAll();
            console.log("\x1b[31m    Objeto Devuelto=\x1b[0m", oAll, NL);
            break;

        case 4: //deleteById(number)
            console.log(`\x1b[31m  > Invocacion a método ::deleteById( ${this.newestProduct}`, ")", NL);
            let retVal = await oContenedor.deleteById(this.newestProduct);
            console.log("\x1b[31m    Resultado =\x1b[0m", await oContenedor.getAll(), NL);
            break;

        case 5: //deleteAll()
            console.log("\x1b[31m  > Invocacion a método ::deleteAll()", NL);
            await oContenedor.deleteAll();
            break;

        case 6:
            oContenedor = new Contenedor("productos.txt");
            newestProduct = await oContenedor.save(oNewProduct1);
            newestProduct = await oContenedor.save(oNewProduct2);
            newestProduct = await oContenedor.save(oNewProduct3);
            const oAllProds = await oContenedor.getAll();
            console.log(" \x1b[31m   Objeto Devuelto=\x1b[0m", oAllProds, NL);
            break;

        default:
            break;
    }
    sayMenu();
};


//Desafio - C3
const fs = require('fs');

class Product {
    constructor(title, price, thumbnail, id) {
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
        this.id = id;
    }
};

class Contenedor {
    constructor(fileName) {
        this.fileName = fileName;
        this.newId = 0;
    }

    async save(paramProduct) {
        if (debug == true) {
            console.log("begin save(); ");
        }

        if (!fileExists(this.fileName)) {
            createEmptyFile(this.fileName);
        }

        try {
            let oProduct = new Product;

            oProduct.title = paramProduct.title;
            oProduct.price = paramProduct.price;
            oProduct.thumbnail = paramProduct.thumbnail;

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
                if (debug == true) {
                    console.log("File is empty. Inserted ID=", this.newId);
                    return this.newId;
                }
            }
            //file has contents, try to parse JSON data
            else {
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
                    if (debug == true) {
                        console.log("File is empty. Inserted ID=", this.newId);
                    }
                    return this.newId;

                } else {
                    //get MAX ID
                    let max = objectInfo.reduce((a, b) => a.id > b.id ? a : b).id;
                    if (debug == true) {
                        console.log('maxId: ', max)
                    }
                    //inc MAX ID
                    this.newId = oProduct.id = max + 1;
                }
                if (debug == true) {
                    console.log('this.newId = oProduct.id = max + 1= ', this.newId, oProduct.id, max + 1)
                }
                objectInfo.push(oProduct);

                //write file increasing LastID
                await fs.promises.writeFile(
                    this.fileName,
                    JSON.stringify(objectInfo, null, '\t')
                );
                if (debug == true) {
                    console.log("Inserted ID=", this.newId);
                }
            }

            if (debug == true) {
                console.log("exit save(); retval=", this.newId)
            }
            return (this.newId); //new ID
        } catch (error) {
            sayError(error);
        }
    } //end function save()

    // getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
    async getById(paramId) {
        try {
            //Parse data file
            const fileData = await fs.promises.readFile(this.fileName, 'utf-8');

            //file has contents, try to parse JSON data
            if (fileData.length === 0) {
                if (debug == true) {
                    console.log("::getById() - File is empty. ");
                }
                return null;
            }
            //file has contents, try to parse JSON
            else {
                const objectInfo = JSON.parse(fileData);

                const objSearch = objectInfo.find(objectInfo => objectInfo.id === paramId);
                //test for empty results
                if (objSearch && Object.keys(objSearch).length === 0 &&
                    Object.getPrototypeOf(objSearch) === Object.prototype) {
                    if (debug == true) {
                        console.log("::getById() - ID ", paramId, "not found, returning null");
                    }
                    return null;
                }
                if (debug == true) {
                    console.log("objSearch=", objSearch);
                }
                return objSearch;
            }
        } catch (error) {
            sayError(error);
        }
    } //end function getById()

    // getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.
    async getAll() {
        try {
            //Parse data file
            const fileData = await fs.promises.readFile(this.fileName, 'utf-8');
            //file has contents, try to parse JSON data
            if (fileData.length === 0) {
                if (debug == true) {
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
                    if (debug == true) {
                        console.log("::getAll() - no objects found, returning null");
                    }
                    return null;
                }
                if (debug == true) {
                    console.log("::getAll() - objects found, returning ...", objectInfo);
                }
                return objectInfo;
            }
        } catch (err) {
            sayError(err);
        }
    } //end function getAll()

    async deleteById(paramId) {
        try {
            //Parse data file
            const fileData = await fs.promises.readFile(this.fileName, 'utf-8');
            //file has contents, try to parse JSON data
            if (fileData.length === 0) {
                if (debug == true) {
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
                    if (debug == true) {
                        console.log("::deleteById() - no objects found, returning null");
                    }
                    return null;
                }
                const objSearch = objectInfo.filter(objSearch => objSearch.id !== paramId);
                //save file
                await fs.promises.writeFile(
                    this.fileName,
                    JSON.stringify(objSearch, null, '\t')
                );
                return true;
            }

        } catch (err) {
            sayError(err);
        }
    } //end function deleteById(Number)

    // deleteAll(): void - Elimina todos los objetos presentes en el archivo.
    async deleteAll() {

        try {
            await fs.promises.writeFile(this.fileName, '[]');
        } catch (err) {
            sayError(err);
        }
    } //end function deleteAll()
} //end class Contenedor

const main = async () => {
    doMenuStuff();
}

/// BEGIN PROGRAM
debug = false;
sayHi();
main();