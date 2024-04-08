const dotenv = require('dotenv').config({ path: './config.env' });
const app = require('./app');
const mongoose = require('mongoose');


mongoose.connect(process.env.DB_URI)
  .then(() => {
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => {
    console.log('Listening on port ' + PORT);
  })
}).catch(err => console.log(err));


// Handle MongoDB connection events
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');

  // Start the server only if the database connection is successful
  
});
