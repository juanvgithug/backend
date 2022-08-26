// Alumno : Juan Vidal - Comisión 31030

//.env config
require('dotenv').config("/.env");
debug = require('debug');
const path = require('path');

const toolBox = require('./hToolbox');
const NL = "\n\r";

//main debug flag
let zDebug = !(process.env.ZDEBUG === 'true');
zDebug ? console.log(path.win32.basename(__filename), " | debug=", zDebug) : true;

const knex = require('knex');
const knexfile = require('./knexfile');

const db = knex(knexfile.database);


async function getVersion() {
    await db.raw("SELECT VERSION()").then(
            (version) => {
                const strDBversion = toolBox.objToStringVal(version[0][0]);
                zDebug ? console.log(path.win32.basename(__filename), " :: getVersion () ", `DB : connected to ${knexfile.database.client} @ database = ${knexfile.database.connection.database} @ ${knexfile.database.connection.host} using [ ${knexfile.database.connection.user.toUpperCase()} ] ...`) : true;
                zDebug ? console.log(path.win32.basename(__filename), " :: getVersion () ", `DB : info = v${strDBversion} ...`) : true;
                return strDBversion;
            }
        ).catch((err) => {
            toolBox.sayError(err);
            throw err;
        })
        .finally(() => {
            //knex.destroy();
        });
};

module.exports = {
    db,
    getVersion
};