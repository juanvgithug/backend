// Alumno : Juan Vidal - Comisión 31030
// Desafio Clase 10 - Motores de plantillas

const chalk = require("chalk");
const toolBox = require('../util/toolBox');
const datosEntregable = "Desafio: Clase Clase 10 - Motores de plantillas"
const express = require('express');
const Productos = require('../api/productos.js');
const productos = new Productos();
const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(express.static('public'));

//--------------------------------------------
const handlebars = require('express-handlebars')
app.engine(
  "hbs",
  handlebars({
    extname: ".hbs",
    defaultLayout: 'index.hbs',
  })
);
app.set("view engine", "hbs");
app.set("views", "./views");
//--------------------------------------------

app.post('/productos', (req, res) => {
  const producto = req.body
  productos.guardar(producto)
  res.redirect('/')
})
app.get('/productos', (req, res) => {
  const prods = productos.listarAll()
  res.render("vista", {
    productos: prods,
    hayProductos: prods.length,
    datosEntregable: datosEntregable
  });
});

console.clear();
toolBox.sayHi();

const PORT = 8989;
const server = app.listen(PORT, () => {
  console.log(chalk.green(`Server Up en puerto ${server.address().port}`));
});

server.on('error', (err) => {
  toolBox.sayError(err);
});

app.get("/about", (req, res) => {
  console.clear();
  toolBox.sayHi();
  console.log(chalk.yellow(`Request from: ${req.headers.host}${req.url} `));
  res.json({
    message: "Bienvenido a la api de Productos."
  });
  console.log(chalk.green(`-> Sent greeting.`));
});