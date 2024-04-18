const Payment = require('../models/paymentModel');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Controller function to process payment
exports.processPayment = async (req, res) => {
    const { amount } = req.body;
    
    try {
        // Create a payment intent with Stripe
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // Stripe requires amount in cents
            currency: 'usd',
            metadata: { integration_check: 'accept_a_payment' }
        });

        // Save payment details to the database
        const payment = new Payment({
            amount: amount,
        });
        await payment.save();

        // Return client secret to complete payment on the client side
        res.status(200).json({ clientSecret: paymentIntent.client_secret, message: 'Payment process initiated successfully' });
    } catch (error) {
        console.error('Error processing payment:', error);
        res.status(500).json({ error: 'Error processing payment' });
    }
};
