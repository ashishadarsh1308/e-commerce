const Order = require('../models/orderModel');
const Product = require('../models/productModel');

//* Create a new order => /api/v1/order/new
exports.newOrder = async (req, res, next) => {

    try {
        const {
            orderItems,
            shippingInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paymentInfo
        } = req.body;

        const order = await Order.create({
            orderItems,
            shippingInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paymentInfo,
            paidAt: Date.now(),
            user: req.user.id
        })

        res.status(201).json({
            success: true,
            order
        })

    } catch (error) {
        // Handle any potential errors
        res.status(500).json({
            success: false,
            message: 'An error occurred',
            error: error.message,
        });
    }
}

//! Get single order => /api/v1/order/:id

exports.getSingleOrder = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id).populate('user', 'name email');

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            })
        }

        res.status(200).json({
            success: true,
            order
        })

    } catch (error) {
        // Handle any potential errors
        res.status(500).json({
            success: false,
            message: 'An error occurred',
            error: error.message,
        });
    }
}

//* Get logged in user orders => /api/v1/orders/me

exports.myOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({ user: req.user.id })
        res.status(200).json({
            success: true,
            orders
        })
    } catch (error) {
        // Handle any potential errors
        res.status(500).json({
            success: false,
            message: 'An error occurred',
            error: error.message,
        });
    }
}