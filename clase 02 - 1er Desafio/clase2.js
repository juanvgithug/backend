// Alumno : Juan Vidal - Comisión 31030
// Desafio Clase 2 - Clases
let coderPropaganda = "Alumno : Juan Vidal - Comisión: 31030"
let coderEntrega = "Desafio: Clase 2 - Clases"
let coderPoweredBy = "Powered by NodeJS / CoderHouse"

function sayHi() {
    console.clear();
    console.log(coderPropaganda);
    console.log(coderEntrega);
    console.log("");
    return;
}

function sayBye() {
    console.log("");
    console.log(coderPoweredBy);
    console.log("");
    return;
}


class userLibro {
    constructor(nombre, autor) {
        this.nombre = nombre;
        this.autor = autor;
    }
};

class Usuario {
    constructor(nombre, apellido, libros = [], mascotas = []) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName() {
        return `${this.nombre} ${this.apellido}`;
    }

    addMascota(strMascota) {
        this.mascotas.push(strMascota);
        return;
    }

    countMascotas() {
        return this.mascotas.length;
    }

    showMascotasTypes() {
        this.mascotas.forEach(mascota => {
            console.log("       * ", mascota)
        });
    }

    addBook(paramNombre, paramAutor) {
        const newLibro = new userLibro(paramNombre, paramAutor);
        return this.libros.push(newLibro);
    }

    countLibros() {
        return this.libros.length;
    }

    getBookNames() {
        return this.libros;
    }
}


sayHi();

let johnDoe = new Usuario("Elon", "Musk");

console.log(johnDoe.getFullName());

johnDoe.addMascota("Gato");
johnDoe.addMascota("Perro");
johnDoe.addMascota("Conejo");

console.log("   Tiene", `${johnDoe.countMascotas()}`, "mascotas:");
johnDoe.showMascotasTypes();

console.log("");

johnDoe.addBook("El señor de las moscas", "William Golding");
johnDoe.addBook("Fundacion", "Isaac Asimov");
console.log("   Tiene", `${johnDoe.countLibros()}`, "libros:");

let bookArr = johnDoe.getBookNames();
bookArr.forEach(book => {
    console.log(`       * "${ book.nombre }" escrito por: ${ book.autor }`);
});

sayBye();