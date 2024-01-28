const express = require('express');
const { isAuthedUser, authRoles } = require('../middleware/auth');
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder } = require('../controllers/orderCon');
const router = express.Router();

router.route("/order/new").post(isAuthedUser, newOrder);
router.route("/order/:id").get(isAuthedUser, getSingleOrder);
router.route("/orders/me").get(isAuthedUser, myOrders);
router.route("/admin/orders").get(isAuthedUser, authRoles("admin"), getAllOrders);
router.route("/admin/order/:id").put(isAuthedUser, authRoles("admin"), updateOrder).delete(isAuthedUser, authRoles("admin"), deleteOrder);

module.exports = router