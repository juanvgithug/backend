# Clase 10 - Motores de Plantillas

## Consigna:
1. Utilizando la misma API de productos del proyecto entregable de la clase anterior, construir un web server (no REST) que incorpore:

a. Un formulario de carga de productos en la ruta raíz (configurar la ruta `'/productos'` para recibir el POST, y redirigir al mismo formulario).


b. Una vista de los productos cargados (utilizando plantillas de handlebars) en la ruta GET `'/productos'`.


c. Ambas páginas contarán con un botón que redirija a la otra.

2. Manteniendo la misma funcionalidad reemplazar el motor de plantillas handlebars por ejs.

3. Por escrito, indicar cuál de los tres motores de plantillas prefieres para tu proyecto y por qué.

### Consideraciones:

- Realizar las plantillas correspondientes que permitan recorrer el array de productos y representarlo en forma de tabla dinámica, siendo sus cabeceras el nombre de producto, el precio y su foto (la foto se mostrará como un imágen en la tabla)

- En el caso de no encontrarse datos, mostrar el mensaje: 'No hay productos'.

### Sugerencias:

- Utilizar iconfinder (https://www.iconfinder.com/free_icons) para obtener la url de las imágenes de los productos (click derecho sobre la imagen -> copiar dirección de la imagen)

### Opcional:

- Utilizar bootstrap para maquetar la vista creada por dicho motor de plantillas y el formulario de ingreso de productos
