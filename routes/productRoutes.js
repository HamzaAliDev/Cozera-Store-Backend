const express = require('express');
const { fetchProducts,
    fetchCompleteProducts,
    addProduct,
    fetchProductById,
    updateProduct,
    deleteProduct,
    searchProducts,
    searchProductByCategory
} = require('../controllers/productController');


const productRouter = express.Router();


productRouter.get('/', fetchProducts)
productRouter.get('/get-complete-products', fetchCompleteProducts)
productRouter.get('/search', searchProducts)
productRouter.get('/search-category', searchProductByCategory)
productRouter.get('/:id', fetchProductById)
productRouter.post('/add', addProduct)
productRouter.put('/update/:id', updateProduct)
productRouter.delete('/delete/:id', deleteProduct)
module.exports = productRouter;