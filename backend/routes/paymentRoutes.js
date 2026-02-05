const express = require("express");
const paymentRouter = express.Router();
const {createOrder} = require("../controllers/payment-controllers/paymentOrder");
const {verifyPayment} = require('../controllers/payment-controllers/paymentVerification')

// endpoint prefix: /customer
paymentRouter.post('/create-order',createOrder);
paymentRouter.post('/verify-payment',verifyPayment);

module.exports = {paymentRouter} ;