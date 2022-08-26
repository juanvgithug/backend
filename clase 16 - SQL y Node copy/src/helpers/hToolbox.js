// Alumno : Juan Vidal - Comisión 31030

debug = require('debug');
//.env config
require('dotenv').config();
const path = require('path');

//main debug flag
let zDebug = (process.env.ZDEBUG === 'true');
zDebug ? console.log(path.win32.basename(__filename), " | debug=", zDebug) : true;


// General 
const coderPropaganda = "Alumno : Juan Vidal - Comisión: 31030"
const coderEntrega = "Desafio: Clase Clase 16 - SQL y Node"
const coderPoweredBy = "Powered by NodeJS / CoderHouse"
const NL = "\r\n";

//SayError to Console.
function sayError(err) {
    console.error(">> ERROR! ", `[${err.name}] (${err.code}) - ${err.message}.`);
    console.error(">>> Stack: ", err.stack);
};

//propaganda stuff
function sayPropaganda() {
    !zDebug ? console.clear() : true;
    console.log(`${coderPropaganda}\n${coderEntrega}\n${coderPoweredBy}\n`);
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
    zDebug ? console.log(path.win32.basename(__filename), "::getCoderCode() = ", retVal) : true;
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

function objToString(obj) {
    return Object.entries(obj).reduce((str, [p, val]) => {
        return `${str}${p}::${val}`;
    }, '');
};

function objToStringVal(obj) {
    return Object.entries(obj).reduce((str, [p, val]) => {
        return `${str}${val}`;
    }, '');
}


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
        zDebug ? console.log(path.win32.basename(__filename), `::ensureAuthenticated() | req to [${req.path}] admin = ${isAdmin}`) : true;
        return next();
    } else {
        zDebug ? console.log(path.win32.basename(__filename), `::ensureAuthenticated() | req to [${req.path}] admin = ${isAdmin}`) : true;
        return res.status(401).json({
            error: -1,
            descripcion: `ruta ${req.path}${isAdmin ? "admin = true " : ""}`,
            metodo: `${req.method} no autorizado`
        })
    }
};

//Create socket client and send update msg
async function sendSocketUpdate(paramData) {
    zDebug ? console.log(path.win32.basename(__filename), `::sendSocketUpdate() - BEGIN`) : true;
    zDebug ? console.log(path.win32.basename(__filename), `::sendSocketUpdate() | try connection to ${process.env.URL + ":" + process.env.PORT}`) : true;
    const io = require("socket.io-client");
    const socket = await io(`${process.env.URL + ":" + process.env.PORT}`, {
        reconnectionDelayMax: 5000,
    });
    if (socket.connected) {
        zDebug ? console.log(path.win32.basename(__filename), `::sendSocketUpdate() | socket connected=${socket.connected} to ${process.env.URL + ":" + process.env.PORT} ID=${socket.id}`, ) : true;
    } else {
        zDebug ? console.log(path.win32.basename(__filename), "::sendSocketUpdate() | connecting...") : true;
        socket.timeout(100).connect(), (err) => {
            zDebug ? console.log(path.win32.basename(__filename), `::sendSocketUpdate() | ERROR! Could not connect in 100ms`, err) : true;
        };
    }

    socket.on('connect', async () => {
        zDebug ? console.log(path.win32.basename(__filename), `::sendSocketUpdate() | ${socket.connected?`socket connected to ${process.env.URL + ":" + process.env.PORT} ID=${socket.id}`:" socket NOT connected"}`) : true;
        socket.on('disconnect', function (data) {
            zDebug ? console.log(path.win32.basename(__filename), `::sendSocketUpdate() | disconnect from ${process.env.URL + ":" + process.env.PORT}` /*, data*/ ) : true;
        });

        zDebug ? console.log(path.win32.basename(__filename), `::sendSocketUpdate() | send UPDATE EVENT`) : true;
        socket.emit('updateInner', paramData);
    });
    zDebug ? console.log(path.win32.basename(__filename), `::sendSocketUpdate() - END`) : true;
}

//delete file in strPath
function killFile(strPath) {
    const fs = require('fs');
    fs.unlink(strPath, (err) => {
        if (err) {
            sayError(err);
            return false;
        }
        return true;
    })
}

//check ig file in strPath exists 
function fileExists(strPath) {
    const fs = require('fs');
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
    const fs = require('fs');
    await fs.promises.writeFile(
        strPath,
        JSON.stringify([], null, '\t')
    );

}

function ensureFileEx(strPath) {
    const Fs = require('fs-extra');
    Fs.ensureFile(strPath);
}

module.exports = {
    sayError,
    sayPropaganda,
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
    fileExists,
    ensureFile,
    ensureFileEx,
    objToString,
    objToStringVal
};