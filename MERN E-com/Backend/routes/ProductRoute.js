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
router.route("/product/:id").get(getProductDetails);

router.route("/admin/product/new").post(isAuthenticatedUser, authrorizeRoles('admin'), createProduct);
router.route("/admin/product/:id")
    .put(isAuthenticatedUser, authrorizeRoles('admin'), updateProduct)
    .delete(isAuthenticatedUser, authrorizeRoles('admin'), deleteProduct)

module.exports = router;