# Food Service API

A standalone service for managing food items and ingredients data for Di-Twin.

## Features

- Uses Fooddetails from [@dtwin/ml-score-function](https://github.com/Di-Twin/ML-Score_function) package
- Dynamically generates ingredients list from food items
- Tracks added food items separately

## Endpoints

- `GET /api/food/items` - Get all food items from the ML-Score_function
- `POST /api/food/items` - Add a new food item to the added items list
- `GET /api/food/ingredients` - Get all ingredients

## Setup and Run

```bash
# Install dependencies
npm install

# Run the server
npm start

# Run in development mode with hot reload
npm run dev
```
 