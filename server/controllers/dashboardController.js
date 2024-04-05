

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
    
    console.log('Transactions listed are :', transactions.data);
    console.log('There are this many : ', transactions.data.length);
    res.status(200).send(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).send('Internal Server Error');
  }
};

const getIntents = async (req, res) => {
  const { stripeAccountId } = req.user;

  try {
    const paymentIntents = await stripe.paymentIntents.list({
      limit: 200,
    }, {
      stripeAccount: stripeAccountId
    });

    if (paymentIntents.data.length === 0) {
      return res.status(404).send('No payment intents found');
    }

    console.log('Payment Intents:', paymentIntents);
    res.status(200).send(paymentIntents);
  } catch (error) {
    console.error('Error fetching payment intents:', error);
    res.status(500).send('Internal Server Error');
  }
};



module.exports = {
  getTransactions,
  getIntents,
};
