const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController');

// GET all food items
router.get('/items', foodController.getAllFoodItems);

// POST a new food item
router.post('/items', foodController.addFoodItem);

// GET all ingredients
router.get('/ingredients', foodController.getAllIngredients);

// Debug route to check JWT configuration
router.get('/debug/jwt-config', (req, res) => {
  res.json({
    jwtSecret: process.env.JWT_SECRET ? `${process.env.JWT_SECRET.substring(0, 3)}...` : 'Not set',
    refreshSecret: process.env.REFRESH_SECRET ? `${process.env.REFRESH_SECRET.substring(0, 3)}...` : 'Not set',
    nodeEnv: process.env.NODE_ENV || 'Not set'
  });
});

module.exports = router; 