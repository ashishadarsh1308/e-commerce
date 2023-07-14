const express = require('express');
const {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductDetails } = require('../controllers/productController');
const { isAuthenticatedUser, authrorizeRoles } = require('../middleware/auth');

const router = express.Router();

router.route("/product").get(getAllProducts);
router.route("/product/new").post(isAuthenticatedUser, authrorizeRoles('admin'), createProduct);
router.route("/product/:id")
    .put(isAuthenticatedUser, authrorizeRoles('admin'), updateProduct)
    .delete(isAuthenticatedUser, authrorizeRoles('admin'), deleteProduct)
    .get(getProductDetails);

module.exports = router;