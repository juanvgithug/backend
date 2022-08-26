/*

Curso : BackEnd
Alumno : Juan Vidal 
Comisión:  31030

*/
const socket = io();

const inputUsr = document.getElementById('inputUsername');
const inputMsg = document.getElementById('inputMensaje');
const inputProdThumb = document.getElementById('imagen');
const btnSend = document.getElementById('btnEnviar');


// General 
function fswal(title, text) {
    Swal.fire(title, text, "info");
}

//fButtonHandler
function fButtonHandler(nButton) {
    console.log("boton", nButton)
    switch (nButton) {

        case 1: //get all elements
            // JSON result in `data` variable
            fetch('/api/productos')
                .then(res => res.json(), {
                    mode: "no-cors"
                }) // the .json() method parses the JSON response into a JS object literal
                .then(
                    function (data) {
                        console.log(data);
                        let messages = '<div class="ResponseText">';
                        $.each(data, function (index, record) {
                            // $.each(record, function (index, record) {
                                for (var property in record) {
                                    if (record.hasOwnProperty(property)) {
                                        messages += '<b>' + property + '</b>: ' + record[property] + '<br>';
                                    }
                                }
                                messages += '<br>';
                            // })
                        })
                        messages += '</div>';
                        fswal("Respuesta de /api/productos", messages);
                    });
            break;

        case 2: //POST new product
            //window.location.href = '/productoRandom';
            Swal.fire({
            title: 'Alta de Producto',
                html: `
                    <input type="text" id="title" class="swal2-input" placeholder="Mi Producto">
                    <input type="text" id="price" class="swal2-input" placeholder="123.45">
                    <input type="text" id="thumbnail" class="swal2-input" placeholder="http://imagenes.com/miImagen.jpg">
                  `,
            confirmButtonText: 'Enviar',
            focusConfirm: false,
            preConfirm: () => {
                const title = Swal.getPopup().querySelector('#title').value
                const price = Swal.getPopup().querySelector('#price').value
                const thumbnail = Swal.getPopup().querySelector('#thumbnail').value
                if (!title || !price || !thumbnail) {
                Swal.showValidationMessage(`Debe completar todos los datos`)
                }
                return { title: title, price: price, thumbnail: thumbnail }
            }
            })
                .then((result) => {
                    let prod = {
                        title: result.value.title,
                        price: result.value.price,
                        thumbnail: result.value.thumbnail,
                    };
                    /*let response = */
                    fetch('/api/productos/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8'
                        },
                        body: JSON.stringify(prod)
                    })
                    .then(res => res.json(), {
                        mode: "no-cors"
                    }) // the .json() method parses the JSON response into a JS object literal
                    .then(
                        function (data) {
                            let messages = '<div class="ResponseText">';
                            messages += '<b>' + "Title" + '</b>: ' + data.title + '<br>';
                            messages += '<b>' + "Price" + '</b>: ' + data.price + '<br>';
                            messages += '<b>' + "Thumbnail" + '</b>: ' + data.thumbnail + '<br>';
                            messages += '<b>' + "ID" + '</b>: ' + data.id + '<br>';
                            messages += '</div>';
                            fswal("Respuesta obtenida", messages);
                    })                    
                });
            break;
        default:
            break;
    }
}

const formAddProduct = document.getElementById('formAddProduct')
formAddProduct.addEventListener('submit', e => {
    e.preventDefault()
    const producto = {
        title: formAddProduct[0].value,
        price: formAddProduct[1].value,
        thumbnail: formAddProduct[2].value
    }
    socket.emit('update', producto);
    formAddProduct.reset()
})

socket.on('productos', productos => {
    console.log(productos);
    makeHtmlTable(productos).then(html => {
        document.getElementById('tblProductos').innerHTML = html;
    })
});

function makeHtmlTable(productos) {
    return fetch('templates/tblProducts.hbs')
        .then(respuesta => respuesta.text())
        .then(plantilla => {
            const template = Handlebars.compile(plantilla);
            const html = template({
                productos
            })
            return html
        })
}


const formPublicarMensaje = document.getElementById('formPublicarMensaje');
formPublicarMensaje.addEventListener('submit', e => {
    e.preventDefault();

    const mensaje = {
        sender: inputUsername.value,
        text: inputMensaje.value
    }
    socket.emit('nuevoMensaje', mensaje);
    formPublicarMensaje.reset();
    inputMensaje.focus();
})

socket.on('connect', data => {
    //console.log(data);
    document.getElementById('socketID').text = `(socket: ID = ${socket.id})`;
})

socket.on('mensajes', mensajes => {
    //console.log(mensajes);
    const html = makeHtmlList(mensajes);
    document.getElementById('mensajes').innerHTML = html;
})

function makeHtmlList(mensajes) {
    return mensajes.map(mensaje => {
        return (`
            <div style="background-color: rgba(230,230,230,.52); border-radius: 5px; font-size: smaller; text-align: left">
                &nbsp;
                <b style="color:blue;"  >${mensaje.sender}</b>
                [<span style="color:brown;" >${mensaje.timestamp}</span>] :
                <i style="color:green;" class="font-monospace" >${mensaje.text}</i>
            </div>
        `)
    }).join(" ");
}

inputUsr.addEventListener('input', () => {
    const hayEmail = inputUsr.value.length;
    const hayTexto = inputMsg.value.length;

    inputMsg.disabled = !hayEmail;
    btnSend.disabled = !hayEmail || !hayTexto;
})

// inputMsg.addEventListener('input', () => {
//     const hayTexto = inputMsg.value.length;
//     btnSend.disabled = !hayTexto;
// })

function toggleEjemplos() {
  var x = document.getElementById("dropdownEjemplos");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function setProdEsc() {
    inputProdThumb.value = "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png";
    toggleEjemplos();
}

function setProdCalc() {
    inputProdThumb.value = "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png";
    toggleEjemplos();
}

function setProdGlobe() {
    inputProdThumb.value = "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png";
    toggleEjemplos();
}

function setProdIphone() {
    inputProdThumb.value = "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pro-max-graphite-select?wid=470&hei=556&fmt=png-alpha&.v=1645552346288";
    toggleEjemplos();
}

// DOM Ready
document.addEventListener("DOMContentLoaded", function (event) {
    console.log("DOM Loaded: OK");

});