const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({

    shippingInfo: {
        address: {
            type: String,
            required: [true, 'Please enter your address']
        },
        city: {
            type: String,
            required: [true, 'Please enter your city']
        },
        state: {
            type: String,
            required: [true, 'Please enter your state']
        },
        country: {
            type: String,
            required: [true, 'Please enter your country']
        },
        pinCode: {
            type: String,
            required: [true, 'Please enter your pinCode']
        },
        phoneNo: {
            type: Number,
            required: [true, 'Please enter your phoneNo']
        },
    },
    orderItems: [
        {
            name: {
                type: String,
                required: [true, 'Please enter product name'],
            },
            quantity: {
                type: Number,
                required: [true, 'Please enter product quantity'],
            },
            price: {
                type: Number,
                required: [true, 'Please enter product price'],
            },
            image: {
                type: String,
                required: [true, 'Please enter product image'],
            },
            product: {
                type: mongoose.Schema.ObjectId,
                ref: 'Product',
                required: true,
            },
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    paymentInfo: {
        id: {
            type: String,
        },
        status: {
            type: String,
        },
    },
    paidAt: {
        type: Date,
        required: true,
    },
    itemsPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    taxPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    orderStatus: {
        type: String,
        required: true,
        default: 'Processing',
    },
    deliveredAt: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Order', orderSchema);