const express = require('express');
const verifyAuth = require('../middlewares/auth');

const { fetchAllOrders, fetchOrdersByUserId, fetchOrderById, createOrder, updateOrderById, deleteOrderById } = require('../controllers/orderController');

const orderRouter = express.Router();

orderRouter.get('/get', fetchAllOrders);
orderRouter.get('/get/:userId', fetchOrdersByUserId);
orderRouter.get('/get/:orderId', fetchOrderById);
orderRouter.post('/add', verifyAuth, createOrder);
orderRouter.put('/update/:orderId', updateOrderById);
orderRouter.delete('/delete/:orderId', deleteOrderById);

module.exports = orderRouter;