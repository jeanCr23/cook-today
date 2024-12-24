const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

const DATA_FILE = "./backend/data.json";

// Load data from JSON file
const loadData = () => {
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
};

// Save data to JSON file
const saveData = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// Route: Fetch all data
app.get("/data", (req, res) => {
  res.json(loadData());
});

// Route: Add a grocery
app.post("/add-grocery", (req, res) => {
  const { name } = req.body;
  const data = loadData();
  data.groceries.push(name);
  saveData(data);
  res.json({ message: "Grocery added successfully" });
});

// Route: Add a recipe
app.post("/add-recipe", (req, res) => {
  const newRecipe = req.body;
  const data = loadData();
  data.recipes.push(newRecipe);
  saveData(data);
  res.json({ message: "Recipe added successfully" });
});

// Route: Filter recipes
app.post("/find-recipe", (req, res) => {
  const { typeOfDish, centralIngredient, otherIngredients } = req.body;
  const data = loadData();

  // Filter recipes
  const filteredRecipes = data.recipes
    .filter(
      (recipe) =>
        recipe.typeOfDish === typeOfDish &&
        recipe.centralIngredient === centralIngredient
    )
    .sort((a, b) => {
      const aMatch = a.otherIngredients.filter((ing) =>
        otherIngredients.includes(ing)
      ).length;
      const bMatch = b.otherIngredients.filter((ing) =>
        otherIngredients.includes(ing)
      ).length;
      return bMatch - aMatch; // Descending order
    });

  res.json(filteredRecipes);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
