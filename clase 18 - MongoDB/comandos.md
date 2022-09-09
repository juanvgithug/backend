# Clase 18 - MongoDB

## Lista de comandos utilizados

- Para crear la base de datos

```javascript
use ecommerce;
```

- Para crear las colecciones

```javascript
db.createCollection('productos');
db.createCollection('carritos');
```

- Para insertar las rows a productos

```javascript
db.productos.insertMany([
    {
        "timestamp": ISODate(),
        "title": "Product 1",
        "price": 123,
        "description":"Sample description for product 1",
        "code": "Prod-1",
        "image": "www.apple.com/imagen/prod1.jpg",
        "stock": 100
    },
    {
        "timestamp": ISODate(),
        "title": "Product 2",
        "price": 234,
        "description":"Sample description for product 2",
        "code": "Prod-2",
        "image": "www.apple.com/imagen/prod2.jpg",
        "stock": 200
    },
    {
        "timestamp": ISODate(),
        "title": "Product 3",
        "price": 345,
        "description":"Sample description for product 3",
        "code": "Prod-3",
        "image": "www.apple.com/imagen/prod3.jpg",
        "stock": 300
    },
    {
        "timestamp": ISODate(),
        "title": "Product 4",
        "price": 456,
        "description":"Sample description for product 4",
        "code": "Prod-4",
        "image": "www.apple.com/imagen/prod4.jpg",
        "stock": 400
    },
    {
        "timestamp": ISODate(),
        "title": "Product 5",
        "price": 567,
        "description":"Sample description for product 5",
        "code": "Prod-5",
        "image": "www.apple.com/imagen/prod5.jpg",
        "stock": 500
    },
    {
        "timestamp": ISODate(),
        "title": "Product 6",
        "price": 678,
        "description":"Sample description for product 6",
        "code": "Prod-6",
        "image": "www.apple.com/imagen/prod6.jpg",
        "stock": 600
    },
    {
        "timestamp": ISODate(),
        "title": "Product 7",
        "price": 789,
        "description":"Sample description for product 7",
        "code": "Prod-7",
        "image": "www.apple.com/imagen/prod7.jpg",
        "stock": 700
    },
    {
        "timestamp": ISODate(),
        "title": "Product 8",
        "price": 890,
        "description":"Sample description for product 8",
        "code": "Prod-8",
        "image": "www.apple.com/imagen/prod8.jpg",
        "stock": 800
    },
    {
        "timestamp": ISODate(),
        "title": "Product 9",
        "price": 901,
        "description":"Sample description for product 9",
        "code": "Prod-9",
        "image": "www.apple.com/imagen/prod9.jpg",
        "stock": 900
    },
    {
        "timestamp": ISODate(),
        "title": "Product 10",
        "price": 1012,
        "description":"Sample description for product 10",
        "code": "Prod-10",
        "image": "www.apple.com/imagen/prod10.jpg",
        "stock": 1000
    }
]);
```

- Para insertar algunos carritos

```javascript
db.carritos.insertMany([{timestamp: ISODate()}, {timestamp: ISODate()}])
```

- Para listar todos los productos

```javascript
db.productos.find();
```

- Para contar la cantidad de documentos en productos

```javascript
db.productos.countDocuments();
```

- Agregar otro producto más a *productos*

```javascript
db.productos.insertOne({
        "timestamp": ISODate(),
        "title": "Product 11",
        "price": 3860,
        "description":"Sample description for product 11",
        "code": "Prod-11",
        "image": "www.apple.com/imagen/prod11.jpg",
        "stock": 1100
    });
```

- Devolver el **título** del producto que tiene código **Prod-11**

```javascript
db.productos.find({code: "Prod-11"}, {title: 1, _id:0});
```

- Listar productos con precio menor a 1000 pesos:

```javascript
db.productos.find({price: {$lt: 1000}});
```

- Listar los productos con precio entre los 1000 a 3000 pesos.

```javascript
db.productos.find ({price: {$gt: 1000, $lt: 3000 }});
```

- Listar los productos con precio mayor a 3000 pesos.

```javascript
db.productos.find({price: {$gt: 3000}});
```


- Realizar una consulta que traiga sólo el nombre del tercer producto más barato.

```javascript
db.productos.find({},{title:1, _id:0}).sort({price:1}).skip(2).limit(1);
```


- Hacer una actualización sobre todos los productos, agregando el campo stock a todos ellos con un valor de 100.

```javascript
db.productos.updateMany({}, {$inc: {stock: 100}});
```


- Cambiar el stock a cero de los productos con precios mayores a 4000 pesos. 

```javascript
db.productos.updateMany({price: {$gt: 4000}}, {$set: {stock: 0}});
```


- Borrar los productos con precio menor a 1000 pesos

```javascript
db.productos.deleteMany({price: {$lt: 1000}});
```


- Creación del usuario **pepe**, con contraseña: **asd456**. Permiso solo de lectura
  
```javascript
db.createUser({user: "pepe", pwd: "asd456", roles: [{role: "read", db: "ecommerce"}]});
```

- Login del usuario creado anteriormente

```javascript
mongo -u pepe -p --authenticationDatabase ecommerce 
```

- Vista de las DB que tiene acceso

```javascript
> show dbs
ecommerce  112.00 KiB
```

- Intenando agregar un *producto* a la colección **producto** en la db **ecommerce**

```javascript
> use ecommerce
switched to db ecommerce
> db.productos.insertOne({nombre: "deberiaDarError"})
MongoServerError: not authorized on ecommerce to execute command { insert: "productos", documents: [ { nombre: "deberiaDarError", _id: ObjectId('631add6e2c85e12b4a4807d0') } ], ordered: true, lsid: { id: UUID("41c6aa0e-ced3-4ca6-9146-a38fb2b063f4") }, $db: "ecommerce" }
```

### Aclaración 

1. Versiones de software:

- MongoDB server version: **6.0.1**
- MongoDB shell version **v1.5.4**

2. Para que la autorización tenga efecto, se debe tener la siguiente config en **mongod.conf**

```javascript
security:
  authorization: "enabled"
```
