const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    // studentId: {
    //     type: String,
    //     required: true
    // },
    // courseId: {
    //     type: String,
    //     required: true
    // },
    amount: {
        type: Number,
        required: true
    },
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
