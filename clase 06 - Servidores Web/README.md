# Clase 6 - Servidores Web

## Consigna:
1. Realizar un proyecto de servidor basado en node.js que utilice el módulo express e implemente los siguientes endpoints en el puerto 8080:

2. Ruta get `'/productos'` que devuelva un array con todos los productos disponibles en el servidor

3. Ruta get `'/productoRandom'` que devuelva un producto elegido al azar entre todos los productos disponibles
Incluir un archivo de texto 'productos.txt' y utilizar la clase Contenedor del desafío anterior para acceder a los datos persistidos del servidor.

Antes de iniciar el servidor, colocar en el archivo 'productos.txt' tres productos como en el ejemplo del desafío anterior.

```
[
 {
   "title": "Escuadra",
   "price": 123.45,
   "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
   "id": 1
 },
 {
   "title": "Calculadora",
   "price": 234.56,
   "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
   "id": 2
 },
 {
   "title": "Globo Terráqueo",
   "price": 345.67,
   "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
   "id": 3
 }
]

```

Cómo ejecutar:
```
npm run dev
```

Preview en
https://materialistic-meadow-snowshoe.glitch.me/
