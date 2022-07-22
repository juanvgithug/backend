/*
Curso : BackEnd
Alumno : Juan Vidal 
Comisión:  31030
*/

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

// DOM Ready
document.addEventListener("DOMContentLoaded", function (event) {
    console.log("DOM Loaded: OK");

});