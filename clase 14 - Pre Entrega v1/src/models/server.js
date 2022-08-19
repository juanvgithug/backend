// Alumno : Juan Vidal - Comisión 31030

debug = require('debug');

//.env config
require('dotenv').config();

//main debug flag
let zDebug = (process.env.ZDEBUG === 'true');

const PRODUCTFILE = process.env.DATA_DIR + "/" + process.env.FILE_PROD;
const MSGFILE = process.env.DATA_DIR + "/" + process.env.FILE_MSG;
const CARTFILE = process.env.DATA_DIR + "/" + process.env.FILE_CART;
const bResetDataProd = process.env.RESET_DATA_PROD === 'true';
const bCreateSampleDataProd = process.env.SAMPLE_DATA_PROD === 'true';
const bResetDataMsg = process.env.RESET_DATA_MSG === 'true';
const bResetDataCart = process.env.RESET_DATA_CART === 'true';


const express = require('express');
const cors = require('cors');
const compression = require('compression');
const path = require('path');
const chalk = require("chalk");

const {
    Server: HttpServer
} = require('http');
const {
    Server: Socket
} = require('socket.io');
const toolBox = require('../helpers/hToolbox');
const hGenericJSONHandler = require('../helpers/hGenericJSONHandler.js');
const messages = new hGenericJSONHandler(MSGFILE);
const products = require('../helpers/hProductos');
const prodRouter = require('../routes/productos.routes');
const cartRouter = require('../routes/carrito.routes');
const baseRouter = require('../routes/base.routes');



class eCommerceServer {
    constructor() {
        if (!(this instanceof eCommerceServer)) return new eCommerceServer();
        toolBox.sayDebug (" ", path.win32.basename(__filename), " eCommerceServer :: constructor() | debug=", zDebug);

        this.app = express();
        this.port = process.env.PORT || '8080';

        this.apiPaths = {
            products: '/api/productos',
            /* protected route */
            carrito: '/api/carrito',
            base: '/api'
        };

        //middlewarez
        this.middlewares();
        //routes
        this.routes();
        //views
        this.views();
        //unmatched routes
        this.defaultRoutes();
        //create default data
        this.createDefaultData();

        this.httpServer = new HttpServer(this.app);
        this.io = new Socket(this.httpServer);
        // Sockets
        this.sockets();

        //catch errors
        this.httpServer.on('error', (err) => {
            toolBox.sayError(err);
        });
    }

    defaultRoutes() {
        // this is default in case of unmatched routes
        this.app.use(function (req, res) {
            toolBox.sayDebug (" ", path.win32.basename(__filename), "::defaultRoutes()");
            // Invalid request
            res.status(404);
            res.json({
                error: {
                    'name': 'Error',
                    'status': 404,
                    'message': 'Invalid Request / ruta no implementada',
                    'statusCode': 404,
                },
                message: 'Invalid Request / Ruta no implementada'
            });
        });
    }

    createDefaultData() {
        toolBox.sayDebug (" ", path.win32.basename(__filename), "::createDefaultData() - bResetDataProd:", bResetDataProd);
        if (Boolean(bResetDataProd) === true) {
            toolBox.fileExists(PRODUCTFILE) ?
                toolBox.killFile(PRODUCTFILE) ?
                (toolBox.sayDebug(" ", path.win32.basename(__filename), "::createDefaultData() - Deleted:", PRODUCTFILE)) :
                (toolBox.sayDebug(" ", path.win32.basename(__filename), "::createDefaultData() - ERROR. Could not delete:", PRODUCTFILE)) :
                true;
            bCreateSampleDataProd ? products.createDefaultData(PRODUCTFILE) : true;
            bCreateSampleDataProd && toolBox.sayDebug (" ", path.win32.basename(__filename), "::createDefaultData() @", PRODUCTFILE);
        }

        toolBox.sayDebug (" ", path.win32.basename(__filename), "::createDefaultData() - bResetDataMsg:", bResetDataMsg);
        if (Boolean(bResetDataMsg) === true) {
            toolBox.fileExists(MSGFILE) ?
                toolBox.killFile(MSGFILE) ?
                (toolBox.sayDebug(" ", path.win32.basename(__filename), "::createDefaultData() - Deleted:", MSGFILE)) :
                (toolBox.sayDebug(" ", path.win32.basename(__filename), "::createDefaultData() - ERROR. Could not delete:", MSGFILE)) : true;
        }

        toolBox.sayDebug (" ", path.win32.basename(__filename), "::createDefaultData() - bResetDataCart:", bResetDataCart);
        if (Boolean(bResetDataCart) === true) {
            toolBox.fileExists(CARTFILE) ?
                toolBox.killFile(CARTFILE) ?
                (toolBox.sayDebug(" ", path.win32.basename(__filename), "::createDefaultData() - Deleted:", CARTFILE)) :
                (toolBox.sayDebug(" ", path.win32.basename(__filename), "::createDefaultData() - ERROR. Could not delete:", CARTFILE)) :
                true;
        }

    };


    propaganda() {
        toolBox.sayHi();
    };

    middlewares() {
        //disable x-powered-by
        toolBox.sayDebug (" ", path.win32.basename(__filename), "::middlewares() disable x-powered-by");
        this.app.disable('x-powered-by');

        //compression
        toolBox.sayDebug (" ", path.win32.basename(__filename), "::middlewares() using compression");
        this.app.use(compression());

        //cors
        toolBox.sayDebug (" ", path.win32.basename(__filename), "::middlewares() using CORS");
        this.app.use(cors());

        //body
        toolBox.sayDebug (" ", path.win32.basename(__filename), "::middlewares() using JSON");
        this.app.use(express.json());

        //body parsing
        toolBox.sayDebug (" ", path.win32.basename(__filename), "::middlewares() using urlencoding");
        this.app.use(express.urlencoded({
            extended: true
        }));

        //public folder
        const pubFolder = path.join(__dirname + "../../../public");
        toolBox.sayDebug (" ", path.win32.basename(__filename), "::middlewares() set public folder =", pubFolder);
        this.app.use(express.static(pubFolder));

        //trailing slashes
        toolBox.sayDebug (" ", path.win32.basename(__filename), "::middlewares() kill trailing slashes");
        this.killTrailingSlashes();

    };

    killTrailingSlashes() {
        this.app.use((req, res, next) => {
            toolBox.sayDebug (" ", path.win32.basename(__filename), "::killTrailingSlashes() path=", req.path);

            if (req.path.substr(-1) == '/' && req.path.length > 1) {
                const query = toolBox.removeAllTrailingSlashes(req.path);
                console.log(" ", path.win32.basename(__filename), "::killTrailingSlashes() query=", query);
                res.redirect(301, query);
            } else {
                next();
            }
        });
    };

    routes() {
        toolBox.sayDebug (" ", path.win32.basename(__filename), "::routes()");
        this.app.use(this.apiPaths.base, baseRouter);
        this.app.use(this.apiPaths.products, prodRouter);
        this.app.use(this.apiPaths.carrito, cartRouter);
    };

    sockets() {
        this.io.on('connection', async socket => {
            //new connection! ...do stuff
            let address = socket.handshake.address;
            console.log(" ", path.win32.basename(__filename), '::sockets() | Nuevo cliente conectado -> address =', chalk.yellowBright(address), " ID = ", chalk.yellowBright(socket.id));

            //handle disconnect
            socket.on('disconnect', () => {
                console.log(" ", path.win32.basename(__filename), '::sockets() | Cliente desconectado -> address =', chalk.yellowBright(address), " ID = ", chalk.yellowBright(socket.id));
            });

            // actualizacion de productos 
            socket.on('update', async producto => {
                toolBox.sayDebug (" ", path.win32.basename(__filename), `::sockets() |  actualizacion de productos via WEB desde ${socket.id} = `, producto);
                let newProd = products.createProduct(PRODUCTFILE, producto);
                let prods = await products.getProductsAll(PRODUCTFILE);
                this.io.sockets.emit('productos', prods);
            });

            // consulta de productos 
            socket.on('getProducts', async () => {
                toolBox.sayDebug (" ", path.win32.basename(__filename), `::sockets() |  refresh de productos via WEB desde ${socket.id} = `);
                let prods = await products.getProductsAll(PRODUCTFILE);
                this.io.sockets.emit('productos', prods);
            });

            // actualizacion de productos por insert desde API
            socket.on('updateInner', async producto => {
                toolBox.sayDebug (" ", path.win32.basename(__filename), `::sockets() |  actualizacion de productos via API desde ${socket.id} = `, producto);
                let prods = await products.getProductsAll(PRODUCTFILE);
                this.io.sockets.emit('productos', prods);
            });

            // actualizacion de mensajes
            socket.on('nuevoMensaje', async msg => {
                toolBox.sayDebug (" ", path.win32.basename(__filename), `::sockets() |  Nuevo mensaje de ${socket.id} [ ${msg.sender} ] data = ${msg.text}`);
                msg.timestamp = toolBox.getChatDateTime();
                await messages.save(msg);
                //refresh messages
                toolBox.sayDebug (" ", path.win32.basename(__filename), `::sockets() |  Refresh mensajes!`);
                this.io.sockets.emit('mensajes', await messages.getAll());
            });

            // carga inicial de productos
            toolBox.sayDebug (" ", path.win32.basename(__filename), "::sockets() |  carga inicial de productos / PRODUCTFILE=", PRODUCTFILE);
            let prods = await products.getProductsAll(PRODUCTFILE);
            this.io.sockets.emit('productos', prods);

            // carga inicial de mensajes
            toolBox.sayDebug (" ", path.win32.basename(__filename), "::sockets() |  carga inicial de mensajes / MSGFILE=", MSGFILE);
            this.io.sockets.emit('mensajes', await messages.getAll());


        });

    };

    views() {
        //motores de plantillas
        this.app.set('views', path.join(__dirname, '../../public/templates'))
        this.app.set("view engine", "hbs");
    };

    listen() {
        this.httpServer.listen(this.port, () => {
            console.log(chalk.green(` Servidor UP en el puerto ${this.port}`));
        });

    };
}

module.exports = eCommerceServer;