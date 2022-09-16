import express from "express";
import { ProductoDao } from "../dao/ProductoDao.js";
import { authMiddleware } from "../middlewares/Auth.js";
import { ProductMocker } from '../mocks/productMocker.js'
const router = express.Router();
const productoDao = new ProductoDao();


// GET api/productos-test
router.get('/', async(req,res) => {
    const productMocker = new ProductMocker(5);
    const products = productMocker.generateRandomProducts();
    res.status(200).json(products);
})

export default router;
