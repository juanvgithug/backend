// Alumno : Juan Vidal - Comisión 31030

//main debug flag
let debug = false;

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

//exports
module.exports = {
    sayError,
    sayHi,
    sayBye,
    sayDebug,
    createEmptyFile,
    fileExists,
    fileDelete
};