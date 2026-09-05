# Foode-service

**Archive / learning repo.** This is a small JSON file API for food items and ingredients, not a meal planner. The meal product is [Plately](https://github.com/HarishKarthickS/Plately). `POST /api/food/items` has no authentication — anyone who can reach the server can append to the local JSON store.

A standalone service for managing food items and ingredients data (originally for Di-Twin).

## Features

- Serves food items from local JSON (a Di-Twin ML package was referenced earlier; the controller reads `data/*.json`)
- Dynamically generates ingredients list from food items
- Tracks added food items separately

## Endpoints

- `GET /api/food/items` - Get all food items
- `POST /api/food/items` - Add a new food item to the added items list (unauthenticated write)
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
