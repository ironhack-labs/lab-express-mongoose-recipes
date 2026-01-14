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
  .catch((err) => console.error("Error connecting to mongo", err));

// ROUTES
//  GET  / route - This is just an example route
app.get("/", (req, res) => {
  res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipes", (req, res) => {
  RecipeModel.create(req.body)
    .then((data) => {
      console.log("recipe added", data);
      res.status(201).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errorMessage: err });
    });
});
//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", async (req, res) => {
  try {
    const data = await RecipeModel.find();
    console.log("recipes found", data);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: err });
  }
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/one-recipe/:recipeId", async (req, res) => {
  try {
    const foundOneRecipe = await RecipeModel.findById(req.params.recipeId);
    console.log("recipe found", foundOneRecipe);
    res.status(200).json(foundOneRecipe);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: err });
  }
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/update-recipe/:recipeId", (req, res) => {
  const { recipeId } = req.params;
  RecipeModel.findByIdAndUpdate(recipeId, req.body, { new: true })
    .then((updateRecipe) => {
      console.log("Recipe Updated", updateRecipe);
      res.status(200).json(updateRecipe);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errorMessage: err });
    });
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/delete-recipe/:recipeId", (req, res) => {
  RecipeModel.findByIdAndDelete(req.params.recipeId)
    .then((data) => {
      console.log("pet deleted", data);
      res.status(204).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errorMessage: err });
    });
});

// Start the server
app.listen(5005, () => console.log("My first app listening on port 5005!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
