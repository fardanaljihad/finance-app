// 3rd Party Modules
const express = require('express');
require('dotenv/config');

// Local Modules
const users = require('./routes/users');
const incomes = require('./routes/incomes');
const outcomes = require('./routes/outcomes');
const wallets = require('./routes/wallet');
const budgetRules = require('./routes/budgetRules');
const categories = require('./routes/categories');

// Server Initialization
const app = express();
const PORT = process.env.PORT;

// Middlewares
app.use(express.json());

app.use('/api/users', [users, incomes, outcomes, wallets, budgetRules, categories]);

app.listen(PORT, (error) => {
  if (!error) {
    console.log(`Server is listening on port ${PORT}`);
  }
  else {
    console.log(`Error occurred, server can't start ${error}`);
  }
})
