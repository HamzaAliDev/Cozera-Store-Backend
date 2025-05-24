const Order = require('../models/orderModal');

const fetchAllOrders = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const orders = await Order.find()
            .populate('userId', 'name email') // Make sure to use 'user' not 'userId'
            .populate('orderItems.productId', 'name price') // populate nested product
            .populate('shippingAddress', 'firstName lastName country city address postalCode email phone')
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 }); // latest orders first

        const total = await Order.countDocuments();

        res.status(200).json({
            data: orders,
            total,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            error: false,
            message: 'Orders fetched successfully'
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: 'Error fetching orders'
        });
    }
};


// fetch all orders by user id
const fetchOrdersByUserId = async (req, res) => {
    const { userId } = req.params;
    try {
        const orders = await Order.find({ userId })
            .populate('orderItems.productId', ' images')
            .populate('shippingAddress', 'firstName lastName country city address postalCode email phone')
            .sort({ createdAt: -1 }); // latest orders first
        if (!orders) {
            return res.status(404).json({
                data: null,
                error: true,
                message: 'No orders found for this user'
            });
        }

        // 🛠 Manually replace images array with first image only
        const updatedOrders = orders.map(order => {
            order = order.toObject(); // convert Mongoose document to plain object
            order.orderItems = order.orderItems.map(item => {
                if (item.productId?.images && item.productId.images.length > 0) {
                    item.productId.image = item.productId.images[0]; // create a new field 'image'
                }
                delete item.productId.images; // optional: remove the 'images' array
                return item;
            });
            return order;
        });
        res.status(200).json({
            data: updatedOrders,
            error: false,
            message: 'Orders fetched successfully'
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: 'Error fetching orders'
        });
    }
}

// fetch order by id
const fetchOrderById = async (req, res) => {
    const { orderId } = req.params;
    try {
        const order = await Order.findById(orderId).populate('userId', 'name email').populate('productId', 'name price');
        if (!order) {
            return res.status(404).json({
                data: null,
                error: true,
                message: 'Order not found'
            });
        }
        res.status(200).json({
            data: order,
            error: false,
            message: 'Order fetched successfully'
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: 'Error fetching order'
        });
    }
}

// create order
const createOrder = async (req, res) => {
    const { orderItems, shippingAddress, totalPrice } = req.body;
    const userId = req.user._id;
    try {
        const newOrder = new Order({
            userId,
            orderItems,
            shippingAddress,
            totalPrice
        });
        const data = await newOrder.save();
        res.status(201).json({
            data: data,
            error: false,
            message: 'Order created successfully'
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: 'Error creating order'
        });
    }
}

// update order by id
const updateOrderById = async (req, res) => {
    const { orderId } = req.params;
    const { deliverAt, status } = req.body;
    try {
        const updatedOrder = await Order.findByIdAndUpdate(orderId, {
            deliverAt,
            status
        }, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({
                data: null,
                error: true,
                message: 'Order not found'
            });
        }
        res.status(200).json({
            data: updatedOrder,
            error: false,
            message: 'Order updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: 'Error updating order'
        });
    }
}

// delete order 
const deleteOrderById = async (req, res) => {
    const { orderId } = req.params;
    try {
        const order = await Order.findByIdAndDelete(orderId);
        if (!order) {
            return res.status(404).json({
                data: null,
                error: true,
                message: 'Order not found'
            });
        }
        res.status(200).json({
            data: order,
            error: false,
            message: 'Order deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: 'Error deleting order'
        });
    }
}

module.exports = { fetchAllOrders, fetchOrdersByUserId, fetchOrderById, createOrder, updateOrderById, deleteOrderById };