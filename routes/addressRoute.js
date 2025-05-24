const express = require('express');
const { fetchAddressByUserId, fetchAllAddress, addAddress, updateAddress, deleteAddress } = require('../controllers/addressController');
const verifyAuth = require('../middlewares/auth');

const addressRouter = express.Router();

addressRouter.get('/', fetchAllAddress);
addressRouter.get('/user-address', verifyAuth, fetchAddressByUserId);
addressRouter.post('/add', verifyAuth, addAddress);
addressRouter.put('/update/:id', updateAddress);
addressRouter.delete('/delete/:id', verifyAuth, deleteAddress);

module.exports = addressRouter;