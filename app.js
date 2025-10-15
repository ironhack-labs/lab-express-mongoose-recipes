const express = require("express");
const { default: mongoose } = require("mongoose");
const logger = require("morgan");

const app = express();

const RecipeModel = require("./models/Recipe.model");

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

mongoose
  .connect(MONGODB_URI)
  .then((x) =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((err) => console.error("Error connecting to mongo", err));

// ROUTES
//  GET  / route - This is just an example route
app.get("/", (req, res) => {
  res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipes", async (req, res) => {
  try {
    const newRecipe = await RecipeModel.create(req.body);
    res.status(201).json(newRecipe);
    console.log("new user created successfully!", newRecipe);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Couldn't create a recipe." });
  }
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", async (req, res) => {
  try {
    const recipes = await RecipeModel.find();
    res.status(200).json(recipes);
    console.log("All recipes are here: ", recipes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Couldn't get all recipes." });
  }
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:id", async (req, res) => {
  try {
    const foundRecipe = await RecipeModel.findById(req.params.id);
    console.log("Here is your recipe: ", foundRecipe);
    res.status(200).json(foundRecipe);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Couldn't get the recipe." });
  }
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:id", async (req, res) => {
  try {
    const updatedRecipe = await RecipeModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    console.log("Updated recipe is: ", updatedRecipe);
    res.status(200).json(updatedRecipe);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Couldn't update the recipe." });
  }
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:id", async (req, res) => {
  try {
    const removedRecipe = await RecipeModel.findByIdAndDelete(req.params.id);
    res.status(204).json(removedRecipe);
    console.log("Removed recipe is: ", removedRecipe);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Couldn't delete the recipe." });
  }
});

// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
