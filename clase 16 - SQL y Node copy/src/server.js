// Alumno : Juan Vidal - Comisión 31030
// Desafio Clase 16 - SQL y Node

// General 
const coderPropaganda = "Alumno : Juan Vidal - Comisión: 31030"
const coderEntrega = "Desafio: Clase Clase 16 - SQL y Node"
const coderPoweredBy = "Powered by NodeJS / CoderHouse"
const NL = "\r\n";

//main debug flag
let zDebug = !(process.env.ZDEBUG === 'true');

//path stuff
var path = require('path');
var fs = require('fs');

const ROOT_DIR = path.join(path.dirname(fs.realpathSync(process.argv[1])), '/');

zDebug ? console.log(path.win32.basename(__filename), " | current dir=", ROOT_DIR) : true;

//WebSockets
const {
  Server: HttpServer
} = require('http');
const {
  Server: Socket
} = require('socket.io');


//import product data functions
const containerProds = require(ROOT_DIR + 'containers.old/zContainerProds.js');
const containerFile = require(ROOT_DIR + 'containers.old/zContainerFile.js');
const productosApi = new containerProds(ROOT_DIR + 'helpers/knexfile.js', 'products');
const mensajesApi = new containerFile(ROOT_DIR+'../data/mensajes.js');

//import express
const express = require('express');
const db = require(ROOT_DIR+'helpers/dbHelper.js');

const app = express();
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);


//socket config
io.on('connection', async socket => {
  let address = socket.handshake.address;
  console.log('Nuevo cliente conectado -> ID = ', socket.client.id);

  // carga inicial de productos
  socket.emit('productos', productosApi.getAll());

  // actualizacion de productos
  socket.on('update', producto => {
    productosApi.save(producto);
    io.sockets.emit('productos', productosApi.getAll());

  })

  // carga inicial de mensajes
  socket.emit('mensajes', await mensajesApi.getAll());

  // actualizacion de mensajes
  socket.on('nuevoMensaje', async msg => {
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

    msg.timestamp = strDate;

    await mensajesApi.save(msg);
    io.sockets.emit('mensajes', await mensajesApi.getAll());
  })
});

//middlewarez
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(express.static('public'));



//Routes
const PORT = 8989;
const server = httpServer.listen(PORT, () => {
  console.log(`Server Up en puerto ${server.address().port}`)
});

server.on('error', (err) => {
  console.log('ERROR =>', err);
});