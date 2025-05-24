const Address = require('../models/addressModal');

const fetchAllAddress = async (req, res) => {
    try {
        const data = await Address.find();
        if (!data) {
            return res.status(404).json({
                data: null,
                error: true,
                message: 'Address not found'
            });
        }
        res.status(200).json({
            data: data,
            error: false,
            message: 'Address fetched successfully'
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: 'Internal Server Error'
        });
    }
}

// fetch address by userId
const fetchAddressByUserId = async (req, res) => {
    const userId = req.user._id;
    try {
        if (!userId) {
            return res.status(400).json({
                data: null,
                error: true,
                message: 'User ID is required'
            });
        }

        const data = await Address.find({ userId });
        if (!data || data.length === 0) {
            return res.status(404).json({
                data: null,
                error: true,
                message: 'Address not found'
            });
        }
        res.status(200).json({
            data: data,
            error: false,
            message: 'Address fetched successfully'
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: 'Internal Server Error'
        });

    }
}

// add address
const addAddress = async (req, res) => {
    const { firstName, lastName, country, city, address, postalCode, email, phone } = req.body;
    const userId = req.user._id;

    try {
        if (!userId || !firstName || !lastName || !country || !city || !address || !postalCode || !email || !phone) {
            return res.status(400).json({
                data: null,
                error: true,
                message: 'All fields are required'
            });
        }

        const newAddress = new Address({
            userId,
            firstName,
            lastName,
            country,
            city,
            address,
            postalCode,
            email,
            phone
        });

        const data = await newAddress.save();
        res.status(201).json({
            data: data,
            error: false,
            message: 'Address added successfully'
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: 'Internal Server Error'
        });
    }
}

// delete address
const deleteAddress = async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) {
            return res.status(400).json({
                data: null,
                error: true,
                message: 'Address ID is required'
            });
        }

        const data = await Address.findByIdAndDelete(id);
        if (!data) {
            return res.status(404).json({
                data: null,
                error: true,
                message: 'Address not found'
            });
        }
        res.status(200).json({
            data: null,
            error: false,
            message: 'Address deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: 'Internal Server Error'
        });
    }
}

// update address
const updateAddress = async (req, res) => {
    const { id } = req.params;
    const { userId, firstName, LastName, country, city, address, postalCode, email, phone } = req.body;
    try {
        if (!id) {
            return res.status(400).json({
                data: null,
                error: true,
                message: 'Address ID is required'
            });
        }

        const data = await Address.findByIdAndUpdate(id, {
            userId,
            firstName,
            LastName,
            country,
            city,
            address,
            postalCode,
            email,
            phone
        }, { new: true });

        if (!data) {
            return res.status(404).json({
                data: null,
                error: true,
                message: 'Address not found'
            });
        }
        res.status(200).json({
            data: data,
            error: false,
            message: 'Address updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: 'Internal Server Error'
        });
    }
}

module.exports = { fetchAllAddress, fetchAddressByUserId, addAddress, deleteAddress, updateAddress };