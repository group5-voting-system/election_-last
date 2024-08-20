const express = require('express');
const router = express.Router();
const knex = require('../knexfile'); // Adjust the path to your Knex configuration

router.get('/api/incomes', async (req, res) => {
  try {
    // Test database connection
    await knex.raw('SELECT 1');
    console.log('Database connection successful');

    // Attempt to query the payments table
    const incomes = await knex('payments')
      .select('id', 'amount', 'currency', 'status', 'created_at')
      .orderBy('created_at', 'desc');
    
    console.log('Query successful, number of records:', incomes.length);
    
    res.json(incomes);
  } catch (error) {
    console.error('Detailed error in /api/incomes route:', error);
    res.status(500).json({ 
      error: 'An error occurred while fetching incomes', 
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

module.exports = router;