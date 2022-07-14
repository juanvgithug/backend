// Alumno : Juan Vidal - Comisión 31030
// Refactor de : Desafio Clase 4 - Manejo de Archivos

const fs = require('fs');

const toolBox = require('./toolBox');

class Product {
    constructor(title, price, thumbnail, id) {
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
        this.id = id;
    }
};

class Contenedor {
    constructor(fileName) {
        this.fileName = fileName;
        this.newId = 0;
    }
    //save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
    async save(paramProduct) {
        toolBox.sayDebug("begin save(); ");

        if (!toolBox.fileExists(this.fileName)) {
            toolBox.sayDebug(`${this.fileName} not found. creating empty file.`);
            toolBox.createEmptyFile(this.fileName);
        }

        try {
            let oProduct = new Product;

            oProduct.title = paramProduct.title;
            oProduct.price = paramProduct.price;
            oProduct.thumbnail = paramProduct.thumbnail;

            const fileData = await fs.promises.readFile(this.fileName, 'utf-8');

            if (fileData.length === 0) {
                let objectInfo = [];
                this.newId = oProduct.id = 1;
                objectInfo.push(oProduct);
                await fs.promises.writeFile(
                    this.fileName,
                    JSON.stringify(objectInfo, null, '\t')
                );
                toolBox.sayDebug("File is empty. Inserted ID=", this.newId);
                return this.newId;
            } else {

                let objectInfo = JSON.parse(fileData);
                if (objectInfo.length === 0) {
                    this.newId = oProduct.id = 1;
                    objectInfo.push(oProduct);
                    await fs.promises.writeFile(
                        this.fileName,
                        JSON.stringify(objectInfo, null, '\t')
                    );
                    toolBox.sayDebug("File is empty. Inserted ID=", this.newId);
                    return this.newId;
                } else {
                    let max = objectInfo.reduce((a, b) => a.id > b.id ? a : b).id;
                    toolBox.sayDebug('maxId: ', max)
                    this.newId = oProduct.id = max + 1;
                }
                objectInfo.push(oProduct);

                await fs.promises.writeFile(
                    this.fileName,
                    JSON.stringify(objectInfo, null, '\t')
                );
                toolBox.sayDebug("Inserted ID=", this.newId);
            }
            toolBox.sayDebug("exit save(); retval=", this.newId)
            return (this.newId);
        } catch (error) {
            toolBox.sayError(error);
        }
    }
    // getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
    async getById(paramId) {
        try {
            if (!toolBox.fileExists(this.fileName)) {
                console.log(`    El archivo ${this.fileName} no existe.`);
                return null;
            }

            const fileData = await fs.promises.readFile(this.fileName, 'utf-8');
            if (fileData.length === 0) {
                toolBox.sayDebug("::getById() - File is empty. ");
                return null;
            } else {
                const objectInfo = JSON.parse(fileData);
                const objSearch = objectInfo.find(objectInfo => objectInfo.id === paramId);
                if (objSearch && Object.keys(objSearch).length === 0 &&
                    Object.getPrototypeOf(objSearch) === Object.prototype) {
                    toolBox.sayDebug("::getById() - ID ", paramId, "not found, returning null");
                    return null;
                }
                toolBox.sayDebug("objSearch=", objSearch);
                return objSearch;
            }
        } catch (error) {
            toolBox.sayError(error);
        }
    }

    // getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.
    async getAll() {
        try {
            if (!toolBox.fileExists(this.fileName)) {
                console.log(`    El archivo ${this.fileName} no existe.`);
                return null;
            }

            const fileData = await fs.promises.readFile(this.fileName, 'utf-8');
            if (fileData.length === 0) {
                toolBox.sayDebug("::getAll() - File is empty. ");
                return null;
            } else {
                let objectInfo = JSON.parse(fileData);
                if (objectInfo && Object.keys(objectInfo).length === 0 &&
                    Object.getPrototypeOf(objectInfo) === Object.prototype) {
                    toolBox.sayDebug("::getAll() - no objects found, returning null");
                    return null;
                }
                toolBox.sayDebug("::getAll() - objects found, returning ...", objectInfo);
                return objectInfo;
            }
        } catch (err) {
            toolBox.sayError(err);
        }
    }
    //deleteById(Number): boolean - Elimina del archivo el objeto con el id buscado.
    async deleteById(paramId) {
        try {
            if (!toolBox.fileExists(this.fileName)) {
                console.log(`    El archivo ${this.fileName} no existe.`);
                return null;
            }

            const fileData = await fs.promises.readFile(this.fileName, 'utf-8');
            if (fileData.length === 0) {
                toolBox.sayDebug("::getAll() - File is empty. ");
                return null;
            } else {
                const objectInfo = JSON.parse(fileData);
                if (objectInfo && Object.keys(objectInfo).length === 0 &&
                    Object.getPrototypeOf(objectInfo) === Object.prototype) {
                    toolBox.sayDebug("::deleteById() - no objects found, returning null");
                    return null;
                }
                const objSearch = objectInfo.filter(objSearch => objSearch.id !== paramId);
                await fs.promises.writeFile(
                    this.fileName,
                    JSON.stringify(objSearch, null, '\t')
                );
                return true;
            }
        } catch (err) {
            toolBox.sayError(err);
        }
    }

    // deleteAll(): void - Elimina todos los objetos presentes en el archivo.
    async deleteAll() {
        try {
            await fs.promises.writeFile(this.fileName, '[]');
        } catch (err) {
            toolBox.sayError(err);
        }
    }
}

//exports
module.exports = {
    Contenedor: Contenedor,
    Product: Product

};