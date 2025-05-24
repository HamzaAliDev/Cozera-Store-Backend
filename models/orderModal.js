const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        orderItems: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },
                name: String,
                quantity: Number,
                price: Number,
                color: String,
                size: String,
                isReviewed: { type: Boolean, default: false },
            },
        ],
        shippingAddress: { type: mongoose.Schema.Types.ObjectId, ref: 'Address', required: true },
        deliverAt: { type: Date, default: null },
        status: {
            type: String,
            enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
            default: 'Pending',
        },
        totalPrice: { type: Number, required: true },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Order', orderSchema);
