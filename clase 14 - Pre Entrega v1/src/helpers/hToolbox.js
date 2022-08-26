// Alumno : Juan Vidal - Comisión 31030

debug = require('debug');

require('dotenv').config();
const path = require('path');
const chalk = require("chalk");
const warning = chalk.hex('#FFA500'); // Orange color

//main debug flag
let zDebug = (process.env.ZDEBUG === 'true');
console.log(warning(" ", path.win32.basename(__filename), " | debug=", zDebug));


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
const coderEntrega = ANSI_Reset + " Desafio: " + ANSI_Bright + ANSI_FgMagenta + "Clase 14 - 1a Entrega Proy Final" + ANSI_Reset;
const coderPoweredBy = ANSI_Reset + ANSI_Bright + ANSI_FgBlue + "Powered by NodeJS / CoderHouse" + ANSI_Reset;
const NL = require('os').EOL;

const fs = require('fs');

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
    if (zDebug)
        console.log(warning("   >>> DEBUG:", message));
}

function fileExists(strFile) {
    return fs.existsSync(strFile);
};


function createEmptyFile(strFile) {
    try {
        fs.closeSync(fs.openSync(strFile, 'a'));
    } catch (error) {
        sayError("createEmptyFile() " + error);
    }
};

//get fibonacci Nth element
function fibonacci(num) {
    var a = 1,
        b = 0,
        temp;

    while (num >= 0) {
        temp = a;
        a = a + b;
        b = temp;
        num--;
    }

    return b;
};

//get code like "CODER-0000000000000-PROD" where 0000 is a random numbner
const getCoderCode = () => {
    const retVal = "CODER-" + String(zeroPad(String(randInt(1, 39) + fibonacci(randInt(5, 13) + (randInt(1, 26)))), 13)) + "-PROD";
    sayDebug (" ", path.win32.basename(__filename), "::getCoderCode() = ", retVal);
    return retVal;
};

//true type of object
const trueTypeOf = (obj) => {
    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
};

//rand
const randomString = () => Math.random().toString(39).slice(2);

const getRandomBoolean = () => Math.random() >= 0.5;


//dates
const isWeekend = (date) => [0, 6].indexOf(date.getDay()) !== -1;

const isEven = (num) => num % 2 === 0;

const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const daysDiff = (date, date2) => Math.ceil(Math.abs(date - date2) / 86400000);

const daysInMonth = (month, year) => new Date(year, month, 0).getDate();

//get custom string like "YY/MM/DD hh:mm:ss"
function getChatDateTime() {
    const strDateSep = "/";
    const strTimeSep = ":";
    const strDateTimeSep = " ";

    const date = new Date();
    const strDate =
        ("00" + (date.getDate() + 1)).slice(-2) +
        strDateSep +
        ("00" + date.getMonth()).slice(-2) +
        strDateSep +
        date.getFullYear() +
        strDateTimeSep +
        ("00" + date.getHours()).slice(-2) + strTimeSep +
        ("00" + date.getMinutes()).slice(-2) + strTimeSep +
        ("00" + date.getSeconds()).slice(-2);

    return strDate;
}

//arrays
const uniqueArr = (arr) => [...new Set(arr)];

const isArray = (arr) => Array.isArray(arr);

const flatten = (arr) => arr.reduce((a, b) => (Array.isArray(b) ? [...a, ...flatten(b)] : [...a, b]), []);

const sortRandom = (arr) => arr.sort(() => Math.random() - 0.5);

const getRandomItem = arr => arr[Math.floor(Math.random() * arr.length)];

const isEqualArray = (...objects) => objects.every(obj => JSON.stringify(obj) === JSON.stringify(objects[0]));

//strings

const zeroPad = (num, places) => String(num).padStart(places, '0');

const truncateString = (string, length) => {
    return string.length < length ? string : `${string.slice(0, length - 3)}...`;
};

const truncateStringMiddle = (string, length, start, end) => {
    return `${string.slice(0, start)}...${string.slice(string.length - end)}`;
};

const capitalizeString = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const replaceSpaces = (str) => str.replace(/\s\s+/g, ' ');

const killSpaces = (str) => str.replace(/\s+/g, '');

//strSlugify('The first post: What is going on?') // 'the-first-post-what-is-going-on'
const strSlugify = (str) => str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')

function removeAllTrailingSlashes(str) {
    let i = str.length;
    while (str[--i] === '/');
    return str.slice(0, i + 1);
}

//make sure header has admin flag
function ensureAuthenticated(req, res, next) {
    //check for admin flag on req header for protected routes
    let isAdmin = false;
    let reqAdmin = String(req.headers.admin);
    reqAdmin.toLowerCase() === 'true' ? isAdmin = true : false;

    if (isAdmin) {
        sayDebug (" ", path.win32.basename(__filename), `::ensureAuthenticated() | req to [${req.path}] admin = ${isAdmin}`);
        return next();
    } else {
        sayDebug (" ", path.win32.basename(__filename), `::ensureAuthenticated() | req to [${req.path}] admin = ${isAdmin}`);
        return res.status(401).json({
            error: -1,
            descripcion: `ruta ${req.path}${isAdmin ? "admin = true " : ""}`,
            metodo: `${req.method} no autorizado`
        })
    }
};

//Create socket client and send update msg
async function sendSocketUpdate(paramData) {
    sayDebug (" ", path.win32.basename(__filename), `::sendSocketUpdate() - BEGIN`);
    sayDebug (" ", path.win32.basename(__filename), `::sendSocketUpdate() | try connection to ${process.env.URL + ":" + process.env.PORT}`);
    const io = require("socket.io-client");
    const socket = await io(`${process.env.URL + ":" + process.env.PORT}`, {
        reconnectionDelayMax: 5000,
    });
    if (socket.connected) {
        sayDebug (" ", path.win32.basename(__filename), `::sendSocketUpdate() | socket connected=${socket.connected} to ${process.env.URL + ":" + process.env.PORT} ID=${socket.id}`, );
    } else {
        sayDebug (" ", path.win32.basename(__filename), "::sendSocketUpdate() | connecting...");
        socket.timeout(100).connect(), (err) => {
            sayDebug (" ", path.win32.basename(__filename), `::sendSocketUpdate() | ERROR! Could not connect in 100ms`, err);
        };
    }

    socket.on('connect', async () => {
        sayDebug (" ", path.win32.basename(__filename), `::sendSocketUpdate() | ${socket.connected?`socket connected to ${process.env.URL + ":" + process.env.PORT} ID=${socket.id}`:" socket NOT connected"}`);
        socket.on('disconnect', function (data) {
            sayDebug (" ", path.win32.basename(__filename), `::sendSocketUpdate() | disconnect from ${process.env.URL + ":" + process.env.PORT}` /*, data*/ );
        });

        sayDebug (" ", path.win32.basename(__filename), `::sendSocketUpdate() | send UPDATE EVENT`);
        socket.emit('updateInner', paramData);
    });
    sayDebug (" ", path.win32.basename(__filename), `::sendSocketUpdate() - END`);
}

//delete file in strPath
function killFile(strPath) {
    let retVal = false;
    fs.unlink(strPath, (err) => {
        if (err) {
            sayError(err);
        }
        retVal = true;
    });
    return retVal;
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



//check ig file in strPath exists 
function fileExists(strPath) {
    try {
        if (fs.existsSync(strPath)) {
            return true; //file exists
        }
    } catch (err) {
        sayError(err)

    }
    return false;
}

//create file in strPath * async mode
async function ensureFile(strPath) {
    await fs.promises.writeFile(
        strPath,
        JSON.stringify([], null, '\t')
    );

}

//using fs-extra lib
function ensureFileEx(strPath) {
    const Fs = require('fs-extra');
    Fs.ensureFile(strPath);
}

module.exports = {
    sayHi,
    sayBye,
    sayError,
    sayDebug,
    zeroPad,
    fibonacci,
    getCoderCode,
    randInt,
    getRandomBoolean,
    isWeekend,
    isEven,
    uniqueArr,
    isArray,
    randomString,
    daysDiff,
    trueTypeOf,
    truncateString,
    truncateStringMiddle,
    capitalizeString,
    daysInMonth,
    flatten,
    replaceSpaces,
    sortRandom,
    isEqualArray,
    getRandomItem,
    strSlugify,
    getChatDateTime,
    killSpaces,
    ensureAuthenticated,
    removeAllTrailingSlashes,
    sendSocketUpdate,
    killFile,
    fileDelete,
    fileExists,
    ensureFile,
    createEmptyFile,
    ensureFileEx
};