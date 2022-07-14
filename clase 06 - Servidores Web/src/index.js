// Alumno : Juan Vidal - Comisión 31030
// Desafio Clase 6 - Servidores Web

const chalk = require("chalk");
const toolBox = require('./toolBox');
const products = require('./WrapperClase4');
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname + "/public")));

console.clear();

toolBox.sayHi();

const puerto = 8989;

const server = app.listen(puerto, () =>
  console.log(chalk.green(` Server Up en puerto ${server.address().port}`))
);

server.on('error', (err) => {
  toolBox.sayError(err);
});

products.createDefaultData("./src/productos.txt");

app.get('/', (request, response) => {
  const myfilePath = path.resolve(__dirname, './public/index.html');
  response.sendFile(myfilePath);
});

app.get('/productos', (request, response) => {

  const retval = products.getProductsAll("./src/productos.txt")
    .then(productList => (
      response.json({
        productList
      })
    ));
});

app.get('/productoRandom', (request, response) => {
  const retval = products.getProductsRandom("./src/productos.txt")
    .then(ProductoRandom => (
      response.json({
        ProductoRandom
      })
    ));
});
