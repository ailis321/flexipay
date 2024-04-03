

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const getTransactions = async (req, res) => {
  const { stripeAccountId } = req.user;

  try {
    const transactions = await stripe.balanceTransactions.list({
    
      limit: 200, 
      expand: ['data.source'], 
    }, {
      stripeAccount: stripeAccountId
    });

    if (transactions.data.length === 0) {
      return res.status(404).send('No transactions found');
    }
    
    console.log('Transactions:', transactions);
    res.status(200).send(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).send('Internal Server Error');
  }
};


module.exports = {
  getTransactions,
};
