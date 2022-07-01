// Alumno : Juan Vidal - Comisión 31030
// Desafio Clase 4 - Manejo de Archivos
/**
 *  CLI MENU HELPER
 */


const eol = require('os').EOL;
const readline = require('readline');

const keyMap = new Map();
keyMap.set('1', 'save(Object)');
keyMap.set('2', 'getById(Number)');
keyMap.set('3', 'getAll(): Object[]');
keyMap.set('4', 'deleteById(Number): void');
keyMap.set('5', 'deleteAll(): void');


function doMenuStuff() {
    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);
    process.stdin.on('keypress', (str, key) => {
        if (key.ctrl && key.name === 'q') {
            process.exit(); // eslint-disable-line no-process-exit
        } else if (key && key.name === 'return') {
            console.clear();
            listKeys();
        } else {
            if (keyMap.has(str)) {
                doMenuOption(keyMap.get(str));
            } else {
                console.log(`Opción de menú para tecla ["${key.name}"] no asignada.`);
            }
        }
    });
    console.log('Seleccione una opción del menu');
    listKeys();
};


function doMenuOption(symbol) {
    console.log(">> Ejecutar ", symbol);
};


function listKeys() {
    let strMenu = "";
    console.log(`\x1b[0m${eol}Funciones disponibles:`);

    keyMap.forEach((value, key) => {
        strMenu += (` \x1b[1m\x1b[35m${key}\x1b[0m ->\x1b[1m ${value}\x1b[0m\t`);
    });
    console.log(`${strMenu}${eol} \x1b[1m\x1b[35mCTRL + Q\x1b[0m -> \x1b[1m para salir\x1b[0m`);
};
