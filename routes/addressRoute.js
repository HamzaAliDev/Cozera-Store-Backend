const express = require('express');
const { fetchAddressByUserId, fetchAllAddress, addAddress, updateAddress, deleteAddress } = require('../controllers/addressController');

const addressRouter = express.Router();

addressRouter.get('/', fetchAllAddress );
addressRouter.get('/:userId', fetchAddressByUserId );
addressRouter.post('/add', addAddress);
addressRouter.put('/update/:id', updateAddress);
addressRouter.delete('/delete/:id', deleteAddress);

module.exports = addressRouter;