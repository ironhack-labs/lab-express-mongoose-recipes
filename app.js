const express = require("express");
const logger = require("morgan");

const mongoose = require("mongoose");
const RecipeModel = require("./models/Recipe.model");

const app = express();

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
  .catch((err0r) => console.error("Error connecting to mongo", error));

// ROUTES
//  GET  / route - This is just an example route
app.get("/", (req, res) => {
  res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipes", async (req, res) => {
  try {
    const newRecipeInDB = await RecipeModel.create(req.body);
    console.log("recipe created", newRecipeInDB);
    res.status(201).json(newRecipeInDB);
  } catch (error) {
    console.log("error when creating a recipe", error);
    res.status(500).json({ error: "failed to create a recipe" });
  }
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", (req, res) => {
  RecipeModel.find()
    .then((data) => {
      console.log("all the recipes", data);
      res.status(200).json(data);
    })
    .catch((error) => {
      console.log("error when retrieving recipes", error);
      res.status(500).json({ error: "failed to retrieve all recipes" });
    });
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:id", async (req, res) => {
  try {
    const foundOneRecipe = await RecipeModel.findById(req.params.id);
    console.log("found the recipe", foundOneRecipe);
    res.status(200).json(foundOneRecipe);
  } catch (error) {
    console.log("error when retrieving this specific recipe", error);
    res.status(500).json({ error: "failed to retrieve this recipe" });
  }
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:id", (req, res) => {
  RecipeModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedRecipe) => {
      console.log("this recipe was updated", updatedRecipe);
      res.status(200).json(updatedRecipe);
    })
    .catch((error) => {
      console.log("error when updating this specific recipe", error);
      res.status(500).json({ error: "failed to update this recipe" });
    });
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:id", async (req, res) => {
  try {
    const deleteRecipe = await RecipeModel.findByIdAndDelete(req.params.id);
    console.log("this recipe has been deleted", deleteRecipe);
    res.status(204).json(deleteRecipe);
  } catch (error) {
    console.log("error when deleting this specific recipe", error);
    res.status(500).json({ error: "failed to delete this recipe" });
  }
});

// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
