import express from "express";
import productRouter from './routes/product.js';
import cartRouter from './routes/cart.js';
import testRouter from './routes/testProd.js';
import dotenv from "dotenv";

dotenv.config();

const PORT = 8990;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/productos', productRouter);
app.use('/api/carrito', cartRouter);
app.use('/api/productos-test', testRouter)

const server = app.listen(process.env.PORT || PORT, () => {
    console.log(` > Server UP en http://localhost:${PORT}`)
    })
    
server.on('error', (err) => console.log(err));