const Product = require('../models/productModel');
const ApiFeatures = require('../utils/apiFeatures');

// Create new product => /api/v1/product/new

// creaote the product --Admin
exports.createProduct = async (req, res) => {
    try {

        req.body.user = req.user.id;

        const product = await Product.create(req.body);

        res.status(201).json({
            success: true,
            product,
        });
    } catch (error) {
        // Handle any potential errors
        res.status(500).json({
            success: false,
            message: 'An error occurred',
            error: error.message,
        });
    }
};


// Get all products => /api/v1/products
exports.getAllProducts = async (req, res) => {
    try {
        const productsCount = await Product.countDocuments();
        const apiFeature = new ApiFeatures(Product.find(), req.query).search().filter().pagination(5);
        const productsData = await apiFeature.query;
        res.status(200).json({
            success: true,
            productsCount,
            products: productsData,
        });
    } catch (error) {
        // Handle any potential errors
        res.status(500).json({
            success: false,
            message: 'An error occurred',
            error: error.message,
        });
    }
};

// Get single product details => /api/v1/product/:id
exports.getProductDetails = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(500).json({
                success: false,
                message: 'Product not found'
            })
        }
        res.status(200).json({
            success: true,
            product
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred',
            error: error.message,
        });
    }
}

// update product --Admin
exports.updateProduct = async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(500).json({
            success: false,
            message: 'Product not found'
        })
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        product
    })
}

//delete product --Admin
exports.deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }

        await product.deleteOne(); // Use deleteOne() instead of remove()

        res.status(200).json({
            success: true,
            message: 'Product deleted',
        });
    } catch (error) {
        // Handle any potential errors
        res.status(500).json({
            success: false,
            message: 'An error occurred',
            error: error.message,
        });
    }
};