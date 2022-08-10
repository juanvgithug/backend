// Alumno : Juan Vidal - Comisión 31030
// Desafio Clase 12 - webSockets

const chalk = require("chalk");
const toolBox = require('../util/toolBox');
const datosEntregable = "Desafio: Clase Clase 12 - webSockets"

const {  Server: HttpServer } = require('http');
const {  Server: Socket } = require('socket.io');
const express = require('express');

const helperProds = require('../api/helperProds');
const helperFile = require('../api/helperFile');
const productosApi = new helperProds();
const mensajesApi = new helperFile('data/mensajes.json');

const app = express();
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(express.static('public'));

io.on('connection', async socket => {
  var address = socket.handshake.address;
  console.log(' Nuevo cliente conectado -> ID = ', socket.client.id);
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

console.clear();
toolBox.sayHi();

const PORT = 8989;
const server = httpServer.listen(PORT, () => {
  console.log(chalk.green(` Server Up en puerto ${server.address().port}`));
});

server.on('error', (err) => {
  toolBox.sayError(err);
});