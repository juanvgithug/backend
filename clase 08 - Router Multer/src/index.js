// Alumno : Juan Vidal - Comisión 31030
// Desafio Clase 8 - Router Multer

const chalk = require("chalk");
const toolBox = require('./toolBox');
const products = require('./WrapperClase4');
const express = require('express');
const path = require('path');
const app = express();
const mainRouter = require('./routes/be8.routes');

app.use(express.static(path.join(__dirname + "/public")));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

console.clear();
toolBox.sayHi();

const puerto = 8989;

const server = app.listen(puerto, () =>
  console.log(chalk.green(` Server Up en puerto ${server.address().port}`))
);

server.on('error', (err) => {
  toolBox.sayError(err);
});

products.createDefaultData("./productos.txt");

app.get("/api", (req, res) => {
  console.clear();
  toolBox.sayHi();
  console.log(` Request from: ${req.headers.host}${req.url} `);
  res.json({
    message: "Bienvenido a la api de Productos."
  });
  console.log(` -> Sent greeting.`);
});
app.use('/api', mainRouter);