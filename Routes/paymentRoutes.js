const router = require('express').Router();
const Stripe = require('stripe');
const stripe = Stripe(
  'sk_test_51Ib2kWSEw6FAIm6XCdgACg4POrw5qG0wocT1K59WHb47SM4Djd1WNiOh8SXlrsbgGdpiE99iG0sfi2YVikcO0sfE00Sf3YPqGJ'
);

router.post('/payment', (req, res) => {
  try {
    stripe.charges.create(
      {
        source: req.body.tokenId,
        amount: req.body.amount,
        description: 'test description',
        shipping: {
          name: 'Jenny Rosen',
          address: {
            line1: '510 Townsend St',
            postal_code: '98140',
            city: 'San Francisco',
            state: 'CA',
            country: 'US',
          },
        },

        currency: 'usd',
      },
      (stripeErr, stripeRes) => {
        if (stripeErr) {
          res.status(500).send(stripeErr);
        } else res.status(200).send(stripeRes);
      }
    );
  } catch (error) {}
});
module.exports = router;
