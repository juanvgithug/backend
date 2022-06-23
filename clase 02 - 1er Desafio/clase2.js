// Alumno : Juan Vidal - Comisión 31030
// Desafio Clase 2 - Clases
let coderPropaganda = "Alumno : Juan Vidal - Comisión: 31030"
let coderEntrega = "Desafio: Clase 2 - Clases"
let coderPoweredBy = "Powered by NodeJS / CoderHouse"

function beginProgram() {
    console.clear();
    console.log(coderPropaganda);
    console.log(coderEntrega);
    console.log("");
    return;
}

function endProgram() {
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
        if (!(this instanceof Usuario)) return new Usuario(nombre, apellido, libros = [], mascotas = []);

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
        //console.log("addMascota() Param=",`${strMascota}`, "count=",`${this.mascotas.length}`);
        return;
    }

    countMascotas() {
        return this.mascotas.length;
    }

    getMascotasTypes() {
        this.mascotas.forEach(mascota => {
            console.log("       ", mascota)
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
        this.libros.forEach(libro => {
            console.log("       ", libro.nombre)
        });
    }
}


beginProgram();

let johnDoe = new Usuario("Elon", "Musk");

console.log(johnDoe.getFullName());

johnDoe.addMascota("Gato");
johnDoe.addMascota("Perro");
johnDoe.addMascota("Conejo");

console.log("   Tiene", `${johnDoe.countMascotas()}`, "mascotas:");
johnDoe.getMascotasTypes();

console.log("");

johnDoe.addBook("El señor de las moscas", "William Golding");
johnDoe.addBook("Fundacion", "Isaac Asimov");
console.log("   Tiene", `${johnDoe.countLibros()}`, "libros:");

johnDoe.getBookNames();

endProgram();