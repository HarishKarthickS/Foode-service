const express = require('express');
const cors = require('cors');
const foodRoutes = require('./routes/foodRoutes');
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/food', foodRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Food Service API',
    endpoints: {
      getAllFoodItems: 'GET /api/food/items',
      addFoodItem: 'POST /api/food/items',
      getAllIngredients: 'GET /api/food/ingredients'
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Food service running on port ${PORT}`);
}); 