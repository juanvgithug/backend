// Alumno : Juan Vidal - Comisión 31030
// Desafio Clase 4 - Manejo de Archivos

const ANSI_ESC = "\x1b";
const ANSI_Reset = ANSI_ESC + "[0m";
const ANSI_Bright = ANSI_ESC + "[1m";
const ANSI_Dim = ANSI_ESC + "[2m";
const ANSI_Underscore = ANSI_ESC + "[4m";
const ANSI_Blink = ANSI_ESC + "[5m";
const ANSI_Reverse = ANSI_ESC + "[7m";
const ANSI_Hidden = ANSI_ESC + "[8m";
const ANSI_FgBlack = ANSI_ESC + "[30m";
const ANSI_FgRed = ANSI_ESC + "[31m";
const ANSI_FgGreen = ANSI_ESC + "[32m";
const ANSI_FgYellow = ANSI_ESC + "[33m";
const ANSI_FgBlue = ANSI_ESC + "[34m";
const ANSI_FgMagenta = ANSI_ESC + "[35m";
const ANSI_FgCyan = ANSI_ESC + "[36m";
const ANSI_FgWhite = ANSI_ESC + "[37m";
const ANSI_BgBlack = ANSI_ESC + "[40m";
const ANSI_BgRed = ANSI_ESC + "[41m";
const ANSI_BgGreen = ANSI_ESC + "[42m";
const ANSI_BgYellow = ANSI_ESC + "[43m";
const ANSI_BgBlue = ANSI_ESC + "[44m";
const ANSI_BgMagenta = ANSI_ESC + "[45m";
const ANSI_BgCyan = ANSI_ESC + "[46m";
const ANSI_BgWhite = ANSI_ESC + "[47m";

const KEY_RETURN = 'return';
const EXIT_KEYPRESS = "c"

const coderPropaganda = ANSI_Reset + " Alumno : " + ANSI_Bright + ANSI_FgMagenta + "Juan Vidal" + ANSI_Reset + " - Comisión: " + ANSI_Bright + ANSI_FgMagenta + "31030" + ANSI_Reset;
const coderEntrega = ANSI_Reset + " Desafio: " + ANSI_Bright + ANSI_FgMagenta + "Clase 4 - Manejo de Archivos" + ANSI_Reset;
const coderPoweredBy = ANSI_Reset + ANSI_Bright + ANSI_FgBlue + "Powered by NodeJS / CoderHouse" + ANSI_Reset;
const NL = require('os').EOL;
//main debug flag
let debug = true;

const readline = require('readline');
const fs = require('fs');
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
    console.error(ANSI_Reset + ANSI_BgRed + " ERROR! ", `[${err.name}] (${err.code}) - ${err.message}.`);
};

const sayDebug = (message) => {
    if (debug)
        console.log("   >>> DEBUG:", message);
}

function fileExists(strFile) {
    return fs.existsSync(strFile);
};

function fileDelete(strFile) {
    let retVal = false;
    fs.unlinkSync(strFile, function (err) {
        if (err) {
            sayError(err);
        }
        retVal = true;
    });
    return retVal;
};

function createEmptyFile(strFile) {
    try {
        fs.closeSync(fs.openSync(strFile, 'a'));
    } catch (error) {
        sayError("createEmptyFile() " + error);
    }
};

function listKeys() {
    let strMenu = "";
    keyMap.forEach((value, key) => {
        strMenu += (` ${ANSI_Bright}${ANSI_FgMagenta}${key}${ANSI_Reset} ->${ANSI_Bright} ${value}${ANSI_Reset}  `);
    });
    const exitKey = String(EXIT_KEYPRESS).toUpperCase();
    console.log(`${strMenu}${NL} ${ANSI_Bright}${ANSI_FgMagenta}CTRL + ${exitKey}${ANSI_Reset} -> ${ANSI_Bright}terminar${ANSI_Reset}`);
};

function sayMenu() {
    console.log(ANSI_Reset + ' Seleccione una opción del menu - Funciones disponibles: ' + ANSI_Reset);
    listKeys();
}

function doMenuStuff() {
    sayHi();
    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);
    process.stdin.on('keypress', (str, key) => {
        if (key.ctrl && key.name === EXIT_KEYPRESS) {
            sayBye();
            process.exit();
        } else if (key && key.name === KEY_RETURN) {
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
    console.clear();
    sayHi();
    console.log(`${ANSI_Reset}${ANSI_FgYellow} SELECCIONADA OPCION ${symbol} -> ${action} ${ANSI_FgRed}`);


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
            console.log(`${ANSI_Reset}${ANSI_FgRed}  > Crear archivo default \'${strFileName}\' con 3 elementos default y un iPhone`);
            this.newestProduct = await oContenedor.save(oNewProduct1);
            this.newestProduct = await oContenedor.save(oNewProduct2);
            this.newestProduct = await oContenedor.save(oNewProduct3);
            console.log(`${ANSI_Reset}${ANSI_FgGreen}  > OK. ${ANSI_Reset}`);
            console.log(ANSI_Reset + ANSI_FgRed + "  > Invocacion a método ::save()", NL, "  Datos del objeto a insertar:" + ANSI_Reset);
            console.log(oNewProduct);
            this.newestProduct = await oContenedor.save(oNewProduct);
            console.log(ANSI_Reset + ANSI_FgRed + "  > Se insertó nuevo objeto con ID=" + ANSI_Reset, this.newestProduct, NL);
            break;

        case 2: //getByID()
            console.log(ANSI_Reset + ANSI_FgRed + "  > Invocacion a método ::getById()", NL, "   Búsqueda por ID=", this.newestProduct);
            const oSearch = await oContenedor.getById(this.newestProduct);
            console.log(ANSI_Reset + ANSI_FgRed + "    Objeto Devuelto=" + ANSI_Reset, oSearch, NL);
            break;

        case 3: //getAll()
            console.log(ANSI_Reset + ANSI_FgRed + "  > Invocacion a método ::getAll()");
            const oAll = await oContenedor.getAll();
            console.log(ANSI_Reset + ANSI_FgRed + "    Objeto Devuelto=" + ANSI_Reset, oAll, NL);
            break;

        case 4: //deleteById(number)
            console.log(`${ANSI_Reset}${ANSI_FgRed}  > Invocacion a método ::deleteById( ${this.newestProduct}`, ")", NL);
            let retVal = await oContenedor.deleteById(this.newestProduct);
            console.log(ANSI_Reset + ANSI_FgRed + "    Resultado =" + ANSI_Reset, await oContenedor.getAll(), NL);
            break;

        case 5: //deleteAll()
            console.log(ANSI_Reset + ANSI_FgRed + "  > Invocacion a método ::deleteAll()", NL);
            await oContenedor.deleteAll();
            break;

        case 6: //crear "productos.txt"
            const strFile = "productos.txt";
            if (fileExists(strFile)) {
                fileDelete(strFile);
            }
            oContenedor = new Contenedor(strFile);
            newestProduct = await oContenedor.save(oNewProduct1);
            newestProduct = await oContenedor.save(oNewProduct2);
            newestProduct = await oContenedor.save(oNewProduct3);
            const oAllProds = await oContenedor.getAll();
            console.log(ANSI_Reset + ANSI_FgRed + "   Objeto Devuelto=" + ANSI_Reset, oAllProds, NL);
            break;

        default:
            break;
    }
    sayMenu();
};


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
    //save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
    async save(paramProduct) {
        sayDebug("begin save(); ");

        if (!fileExists(this.fileName)) {
            sayDebug(`${this.fileName} not found. creating empty file.`);
            createEmptyFile(this.fileName);
        }

        try {
            let oProduct = new Product;

            oProduct.title = paramProduct.title;
            oProduct.price = paramProduct.price;
            oProduct.thumbnail = paramProduct.thumbnail;

            const fileData = await fs.promises.readFile(this.fileName, 'utf-8');

            if (fileData.length === 0) {
                let objectInfo = [];
                this.newId = oProduct.id = 1;
                objectInfo.push(oProduct);
                await fs.promises.writeFile(
                    this.fileName,
                    JSON.stringify(objectInfo, null, '\t')
                );
                sayDebug("File is empty. Inserted ID=", this.newId);
                return this.newId;
            } else {

                let objectInfo = JSON.parse(fileData);
                if (objectInfo.length === 0) {
                    this.newId = oProduct.id = 1;
                    objectInfo.push(oProduct);
                    await fs.promises.writeFile(
                        this.fileName,
                        JSON.stringify(objectInfo, null, '\t')
                    );
                    sayDebug("File is empty. Inserted ID=", this.newId);
                    return this.newId;
                } else {
                    let max = objectInfo.reduce((a, b) => a.id > b.id ? a : b).id;
                    sayDebug('maxId: ', max)
                    this.newId = oProduct.id = max + 1;
                }
                objectInfo.push(oProduct);

                await fs.promises.writeFile(
                    this.fileName,
                    JSON.stringify(objectInfo, null, '\t')
                );
                sayDebug("Inserted ID=", this.newId);
            }
            sayDebug("exit save(); retval=", this.newId)
            return (this.newId);
        } catch (error) {
            sayError(error);
        }
    }
    // getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
    async getById(paramId) {
        try {
            if (!fileExists(this.fileName)) {
                console.log(`    El archivo ${this.fileName} no existe.`);
                return null;
            }

            const fileData = await fs.promises.readFile(this.fileName, 'utf-8');
            if (fileData.length === 0) {
                sayDebug("::getById() - File is empty. ");
                return null;
            } else {
                const objectInfo = JSON.parse(fileData);
                const objSearch = objectInfo.find(objectInfo => objectInfo.id === paramId);
                if (objSearch && Object.keys(objSearch).length === 0 &&
                    Object.getPrototypeOf(objSearch) === Object.prototype) {
                    sayDebug("::getById() - ID ", paramId, "not found, returning null");
                    return null;
                }
                sayDebug("objSearch=", objSearch);
                return objSearch;
            }
        } catch (error) {
            sayError(error);
        }
    }

    // getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.
    async getAll() {
        try {
            if (!fileExists(this.fileName)) {
                console.log(`    El archivo ${this.fileName} no existe.`);
                return null;
            }

            const fileData = await fs.promises.readFile(this.fileName, 'utf-8');
            if (fileData.length === 0) {
                sayDebug("::getAll() - File is empty. ");
                return null;
            } else {
                let objectInfo = JSON.parse(fileData);
                if (objectInfo && Object.keys(objectInfo).length === 0 &&
                    Object.getPrototypeOf(objectInfo) === Object.prototype) {
                    sayDebug("::getAll() - no objects found, returning null");
                    return null;
                }
                sayDebug("::getAll() - objects found, returning ...", objectInfo);
                return objectInfo;
            }
        } catch (err) {
            sayError(err);
        }
    }
    //deleteById(Number): boolean - Elimina del archivo el objeto con el id buscado.
    async deleteById(paramId) {
        try {
            if (!fileExists(this.fileName)) {
                console.log(`    El archivo ${this.fileName} no existe.`);
                return null;
            }

            const fileData = await fs.promises.readFile(this.fileName, 'utf-8');
            if (fileData.length === 0) {
                sayDebug("::getAll() - File is empty. ");
                return null;
            } else {
                const objectInfo = JSON.parse(fileData);
                if (objectInfo && Object.keys(objectInfo).length === 0 &&
                    Object.getPrototypeOf(objectInfo) === Object.prototype) {
                    sayDebug("::deleteById() - no objects found, returning null");
                    return null;
                }
                const objSearch = objectInfo.filter(objSearch => objSearch.id !== paramId);
                await fs.promises.writeFile(
                    this.fileName,
                    JSON.stringify(objSearch, null, '\t')
                );
                return true;
            }
        } catch (err) {
            sayError(err);
        }
    }

    // deleteAll(): void - Elimina todos los objetos presentes en el archivo.
    async deleteAll() {
        try {
            await fs.promises.writeFile(this.fileName, '[]');
        } catch (err) {
            sayError(err);
        }
    }
}

function main() {
    doMenuStuff();
}

/// BEGIN PROGRAM
debug = false;
sayHi();
main();