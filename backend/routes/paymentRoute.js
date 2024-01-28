const express = require("express");
const { isAuthedUser } = require('../middleware/auth');
const { processPayment, sendStripeApiKey } = require("../controllers/paymentCon");
const router = express.Router();

router.route("/payment/process").post(isAuthedUser, processPayment);
router.route("/stripeapikey").get(isAuthedUser, sendStripeApiKey);

module.exports = router;