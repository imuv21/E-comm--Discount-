const express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReviews, deleteReview } = require('../controllers/productCon');
const { isAuthedUser, authRoles } = require('../middleware/auth');
const router = express.Router();

router.route("/products").get(getAllProducts);  //get all product
router.route("/admin/product/new").post(isAuthedUser, authRoles("admin"), createProduct); //create a product --admin
router.route("/admin/product/:id").put(isAuthedUser, authRoles("admin"), updateProduct)  //update a product --admin
    .delete(isAuthedUser, authRoles("admin"), deleteProduct) //update, delete a product  --admin
router.route("/product/:id") .get(getProductDetails); //get product details
router.route("/review").put(isAuthedUser,  createProductReview); //add and update review
router.route("/reviews").get(getProductReviews).delete(isAuthedUser, deleteReview); //get product reviews and delete review

module.exports = router
