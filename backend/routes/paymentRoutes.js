const express = require('express');
const router = express.Router();
const paymentController = require('../controller/paymentController');

// Route to process payment
router.post('/process', paymentController.processPayment);

module.exports = router;
