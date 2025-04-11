const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        orderItems: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },
                name: String,
                quantity: Number,
                price: Number,
            },
        ],
        shippingAddress: { type: mongoose.Schema.Types.ObjectId, ref: 'address', required: true },
        deliverAt: { type: Date, default: null },

    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Order', orderSchema);
