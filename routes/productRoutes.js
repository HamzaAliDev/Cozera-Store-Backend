const express = require('express');
const { fetchProducts, addProduct, fetchProductById, updateProduct, deleteProduct } = require('../controllers/productController');


const productRouter = express.Router();


productRouter.get('/', fetchProducts)
productRouter.get('/:id', fetchProductById)
productRouter.post('/add', addProduct)
productRouter.put('/update/:id', updateProduct)
productRouter.delete('/delete/:id', deleteProduct)

module.exports = productRouter;