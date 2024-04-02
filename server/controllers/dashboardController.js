

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


const getTransactions = async (req, res) => {
  const { stripeAccountId } = req.user;
  const oneWeekAgo = Math.floor(Date.now() / 1000) - 7 * 24 * 60 * 60;

  try {
    const transactions = await stripe.balanceTransactions.list({
      created: {
        gte: oneWeekAgo,
      },
      limit: 50, 
      expand: ['data.source'], 
    }, {
      stripeAccount: stripeAccountId
    });

    res.json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).send('Internal Server Error');
  }
};


module.exports = {
  getTransactions,
};
