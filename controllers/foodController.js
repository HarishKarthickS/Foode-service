const fs = require('fs');
const path = require('path');
// const { Fooddetails } = require('@dtwin/ml-score-function');

const Fooddetails = path.join(__dirname, '../data/foodItems.json');
const addedFoodItemsPath = path.join(__dirname, '../data/addedFoodItems.json');
const ingredientsPath = path.join(__dirname, '../data/ingredients.json');

// Get all food items from Fooddetails and addedFoodItems
exports.getAllFoodItems = (req, res) => {
  try {
    // Read added food items from JSON file
    let addedFoodItems = [];
    try {
      addedFoodItems = JSON.parse(fs.readFileSync(addedFoodItemsPath, 'utf8'));
    } catch (readError) {
      console.warn('Could not read addedFoodItems.json, using empty array instead:', readError.message);
    }
    
    // Combine Fooddetails and added food items
    const allFoodItems = [...Fooddetails, ...addedFoodItems];
    
    res.status(200).json(allFoodItems);
  } catch (error) {
    console.error('Error reading food items:', error);
    res.status(500).json({ message: 'Failed to fetch food items', error: error.message });
  }
};

// Add a new food item
exports.addFoodItem = (req, res) => {
  try {
    // Read existing added food items
    const addedFoodItems = JSON.parse(fs.readFileSync(addedFoodItemsPath, 'utf8'));
    
    // Get the new food item from request body
    const newFoodItem = req.body;
    
    // Validate the food item structure based on Fooddetails format
    if (!newFoodItem.food_name) {
      return res.status(400).json({ 
        message: 'Missing required field: food_name'
      });
    }

    // Validate macronutrients structure
    if (!newFoodItem.macronutrients) {
      return res.status(400).json({ 
        message: 'Missing required field: macronutrients'
      });
    }

    // Check macronutrients have the required properties
    const requiredMacroFields = ['energy_kcal', 'protein_g', 'fat_g', 'carbohydrates_g', 'fiber_g'];
    const missingMacroFields = requiredMacroFields.filter(
      field => !newFoodItem.macronutrients.hasOwnProperty(field)
    );
    
    if (missingMacroFields.length > 0) {
      return res.status(400).json({ 
        message: `Missing required macronutrient fields: ${missingMacroFields.join(', ')}`
      });
    }

    // Check if micronutrients exists and has proper structure if included
    if (newFoodItem.micronutrients) {
      const requiredMicroFields = [
        'calcium_mg', 'iron_mg', 'magnesium_mg', 'phosphorus_mg', 
        'potassium_mg', 'sodium_mg', 'zinc_mg', 'vitamin_c_mg',
        'thiamin_mg', 'riboflavin_mg', 'niacin_mg', 'vitamin_b6_mg',
        'folate_ug', 'vitamin_a_ug', 'vitamin_e_mg', 'vitamin_d_ug'
      ];
      
      const missingMicroFields = requiredMicroFields.filter(
        field => !newFoodItem.micronutrients.hasOwnProperty(field)
      );
      
      if (missingMicroFields.length > 0) {
        return res.status(400).json({ 
          message: `Missing micronutrient fields: ${missingMicroFields.join(', ')}`
        });
      }
    }

    // Check if ingredients is an array if included
    if (newFoodItem.ingredients && !Array.isArray(newFoodItem.ingredients)) {
      return res.status(400).json({ 
        message: 'Ingredients must be an array'
      });
    }
    
    // Check image_url exists if included
    if (newFoodItem.hasOwnProperty('image_url') && typeof newFoodItem.image_url !== 'string') {
      return res.status(400).json({ 
        message: 'image_url must be a string'
      });
    }
    
    // Add the item to the added items array
    addedFoodItems.push(newFoodItem);
    
    // Write the updated array back to the file
    fs.writeFileSync(addedFoodItemsPath, JSON.stringify(addedFoodItems, null, 2));
    
    res.status(201).json({ message: 'Food item added successfully', foodItem: newFoodItem });
  } catch (error) {
    console.error('Error adding food item:', error);
    res.status(500).json({ message: 'Failed to add food item', error: error.message });
  }
};

// Get all food ingredients lists from ingredients.json
exports.getAllIngredients = (req, res) => {
  try {
    // Read food ingredients directly from the JSON file
    const foodIngredients = JSON.parse(fs.readFileSync(ingredientsPath, 'utf8'));
    res.status(200).json(foodIngredients);
  } catch (error) {
    console.error('Error reading food ingredients:', error);
    res.status(500).json({ message: 'Failed to fetch food ingredients', error: error.message });
  }
}; 