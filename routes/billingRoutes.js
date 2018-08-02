const router = require('express').Router();
const {stripeSecretKey} = require('../config/keys');
const stripe = require('stripe')(stripeSecretKey);
const isLoggedIn = require('../middlewares/isLoggedIn');

router.post('/api/stripe', isLoggedIn,async (req, res) => {
    
    await stripe.charges.create({
        amount: 500,
        currency: 'usd',
        description: '$5 for 5 credits',
        source: req.body.id
    });

    req.user.credits += 5;
    const user = await req.user.save();
    res.send(user);
    
});

module.exports = router;