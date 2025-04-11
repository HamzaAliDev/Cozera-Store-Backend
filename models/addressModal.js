const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        country: { type: String, required: true },
        city: { type: String, required: true },
        address: { type: String, required: true },
        postalCode: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model('address', addressSchema);
