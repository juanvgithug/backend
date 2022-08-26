// Alumno : Juan Vidal - Comisión 31030
// Desafio Clase 14 - Pre Entrega v1

debug = require('debug');
require('dotenv').config("/.env");
toolBox = require('./helpers/hToolbox');

let eCommerceServer = require('./models/server');
const server = new eCommerceServer();
server.propaganda();
server.listen();

process.on('SIGTERM', () => {
    toolBox.sayBye();
    debug(' SIGTERM signal received: closing HTTP server');
    server.close(() => {
        debug(' HTTP server closed');
        return true;
    });
});
