// Alumno : Juan Vidal - Comisión 31030

require('dotenv').config();
const path = require('path');
const toolBox = require('../helpers/hToolbox');

//main debug flag
let zDebug = (process.env.ZDEBUG === 'true');
toolBox.sayDebug (" ", path.win32.basename(__filename), " | debug=", zDebug);

module.exports.defaultGreeting = async (req, res) => {
    toolBox.sayDebug (" ", path.win32.basename(__filename), " defaultGreeting() | debug=", zDebug);
    
    console.log(`Request from: ${req.headers.host}${req.url} `);
    console.log(`-> Sent greeting.`);
    res.header("Access-Control-Allow-Origin", "*");
    return res.status(200).json({
        message: "Bienvenido a la API de eCommerce Server."
    });
};