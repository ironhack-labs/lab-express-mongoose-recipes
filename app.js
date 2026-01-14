const express = require("express");
const logger = require("morgan");

const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model");
const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
const MONGODB_URL = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

mongoose
  .connect(MONGODB_URL)
  .then((mongoDBConnect) =>
    console.log(
      `MongoDB is connected! Database bame is ${mongoDBConnect.connections[0].name}`
    )
  )
  .catch((error) => console.log("Error connecting to mongo ", error));
// ROUTES
//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipes", (req, res) => {
  Recipe.create(req.body)
    .then((createdRecipe) => {
      console.log(`Recipe created =>`, createdRecipe);
      res.status(201).json({ message: "The recipe is created" });
    })
    .catch((error) => {
      console.error("Error while creating the recipe", error);
      res.status(500).json({ message: "Error while creating the recipe" });
    });
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route.

app.get("/recipes", (req, res) => {
  Recipe.find()
    .then((allRecipes) => {
      console.log("All the recipes are found" + allRecipes);
      res.status(200).json({ message: "All the recipes are retrieved" });
    })
    .catch((error) => {
      console.error("The recipes are not found", error);
      res.status(500).json({ message: "Error while retrieving the recipes" });
    });
});

app.get("/recipes/:id", (req, res) => {
  Recipe.findById(req.params.id);
  then((recipeId) => {
    console.log("The chosen recipe is found" + recipeId);
    res.status(200).json({ message: "The chosen recipe is found" });
  }).catch((error) => {
    console.error("Error while retrieving a chosen recipe", error);
    res.status(500).json({ message: "Error while retrieving a chosen recipe" });
  });
});

app.get("/recipes/:id", (req, res) => {
  Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
  then((recipeUpdated) => {
    console.log("The recipe is just updated" + recipeUpdated);
    res.status(200).json({ message: "The chosen recipe is found" });
  }).catch((error) => {
    console.error("Error while retrieving a chosen recipe", error);
    res.status(500).json({ message: "Error while updating the recipe" });
  });
});

app.get("/recipes/:id", (req, res) => {
  Recipe.findByIdAndDelete(req.params.id);
  then((recipeDelete) => {
    console.log("The recipe is just deleted" + recipeDelete);
    res.status(204).send();
  }).catch((error) => {
    console.error("Error while retrieving a chosen recipe", error);
    res.status(500).json({ message: "Error while deleting the recipe" });
  });
});

// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
