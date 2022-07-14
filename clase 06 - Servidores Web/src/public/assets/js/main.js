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
            //window.location.href = '/productos';
            // JSON result in `data` variable
            fetch('/productos')
                .then(res => res.json(), {
                    mode: "no-cors"
                }) // the .json() method parses the JSON response into a JS object literal
                .then(
                    function (data) {
                        console.log(data);
                        let messages = '<div class="ResponseText">';
                        $.each(data, function (index, record) {
                            $.each(record, function (index, record) {
                                for (var property in record) {
                                    if (record.hasOwnProperty(property)) {
                                        messages += '<b>' + property + '</b>: ' + record[property] + '<br>';
                                    }

                                }
                                messages += '<br>';
                            })
                        })
                        messages += '</div>';
                        fswal("Respuesta de /productos", messages);
                    });
            break;

        case 2: //get random element
            //window.location.href = '/productoRandom';
            fetch('/productoRandom')
                .then(res => res.json(), {
                    mode: "no-cors"
                }) // the .json() method parses the JSON response into a JS object literal
                .then(
                    function (data) {
                        console.log(data);
                        let messages = '<div class="ResponseText">';
                        $.each(data, function (index, record) {
                            for (var property in record) {
                                if (record.hasOwnProperty(property)) {
                                    messages += '<b>' + property + '</b>: ' + record[property] + '<br>';
                                }
                            }
                        })
                        messages += '</div>';
                        fswal("Respuesta de /productoRandom", messages);
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