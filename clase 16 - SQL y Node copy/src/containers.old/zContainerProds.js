// Alumno : Juan Vidal - Comisión 31030

//.env config
require('dotenv').config("/.env");
debug = require('debug');
const path = require('path');

const toolBox = require('../helpers/hToolbox');
const NL = "\n\r";

//main debug flag
let zDebug = !(process.env.ZDEBUG === 'true');
zDebug ? console.log(path.win32.basename(__filename), " | debug=", zDebug) : true;

const dbProds = require('../helpers/dbHelper');

class Product {
    constructor(id, timestamp, title, description, code, thumbnail, price, stock) {
        if (!(this instanceof Product)) return new Product(id, timestamp, title, description, code, thumbnail, price, stock);
        this.id = id;
        this.timestamp = timestamp;
        this.title = title;
        this.description = description;
        this.code = code;
        this.thumbnail = thumbnail;
        this.price = price;
        this.stock = stock;
    }
};

class containerProds {
    constructor(knexFile, dataTable) {
        if (!(this instanceof containerProds)) return new containerProds(knexFile, dataTable);

        this.dbConfig = knexFile;
        this.dataTable = dataTable;

        this.knex = require('knex');
        this.knexFile = require(this.dbConfig);

        this.db = this.knex(knexFile.database);
    }

    get(id) {
        this.db.from(this.dataTable)
            .select("*")
            .where('id', '=', id)
            .orderBy('id', 'asc')
            .then((rows) => {
                for (row of rows) {
                    let tmpProd = new Product(row['id'], '', row['title'], '', '', row['title'], row['price'], 0);
                    zDebug ? console.log(path.win32.basename(__filename), " | ::get( ", id, " ) = ", tmpProd) : true;
                    return tmpProd || {
                        error: `elemento no encontrado`
                    };
                }
            })
            .catch((err) => {
                toolBox.sayError(err);
            })
            .finally(() => {
                db.destroy();
            });
    }

    getAll() {
        this.db.from(this.dataTable)
            .select("*")
            .orderBy('id', 'asc')
            .then((rows) => {
                let prods = [];
                for (row of rows) {
                    let tmpProd = new Product(row['id'], '', row['title'], '', '', row['thumbnail'], row['price'], 0);
                    prods.push(tmpProd);
                }
                zDebug ? console.log(path.win32.basename(__filename), " | ::getAll() ", prods) : true;
                return prods;
            })
            .catch((err) => {
                toolBox.sayError(err);
            })
            .finally(() => {
                db.destroy();
            });
        return {
            error: `(no hay elementos)`
        };
    }

    save(elem) {
        const newProd = new Product('', 0, elem.title, '', '', elem.thumbnail, elem.price, 0);
        this.db(this.dataTable)
            .insert(newProd)
            .then(() => {
                zDebug ? console.log(path.win32.basename(__filename), " | ::save() ELEMENTO INSERTADO", newProd) : true;
            })
            .catch((err) => {
                toolBox.sayError(err);
            })
            .finally(() => {
                db.destroy();
            });
        return newProd;
    }

    update(elem, paramId) {
        const newProd = new Product('', 0, elem.title, '', '', elem.thumbnail, elem.price, 0);
        this.db(this.dataTable)
            .where({
                id: paramId
            })
            .update(newProd)
            .then(() => {
                zDebug ? console.log(path.win32.basename(__filename), " | ::update() ELEMENTO ACTUALIZADO", newProd) : true;
                return newProd;
            })
            .catch((err) => {
                toolBox.sayError(err);
            })
            .finally(() => {
                db.destroy();
            });
        return {
            error: `elemento no encontrado`
        }

    }

    delete(paramId) {
        this.db(this.dataTable)
            .where({
                id: paramId
            })
            .del()
            .then(() => {
                zDebug ? console.log(path.win32.basename(__filename), " | ::delete() ELEMENTO ELIMINADO", paramId) : true;
                return paramId;
            })
            .catch((err) => {
                toolBox.sayError(err);
            })
            .finally(() => {
                db.destroy();
            });
        return {
            error: `elemento no encontrado`
        }
    }

    deleteAll() {
        this.db(this.dataTable)
            .del()
            .then(() => {
                zDebug ? console.log(path.win32.basename(__filename), " | ::deleteAll() TODOS LOS ELEMENTOS ELIMINADOS") : true;
                return;
            })
            .catch((err) => {
                toolBox.sayError(err);
            })
            .finally(() => {
                db.destroy();
            });
        return {
            error: `tabla vacía`
        }

    }
}

module.exports = containerProds