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
const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";
mongoose
  .connect(MONGODB_URI)
  .then((x) =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((error) => console.error("Error connecting to mongo", error));

// ROUTES
//  GET  / route - This is just an example route
app.get("/", (req, res) => {
  res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipes", async (req, res) => {
  try {
    const newRecipe = await Recipe.create(req.body);
    res.status(201).json({
      status: "success",
      data: { recipe: newRecipe },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err,
    });
  }
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", async (req, res) => {
  try {
    const recipes = await Recipe.find(req.query);
    res.status(200).json({
      status: "success",
      data: { recipes },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err,
    });
  }
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: { recipe },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err,
    });
  }
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.patch("/recipes/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      status: "success",
      data: { recipe },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err,
    });
  }
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err,
    });
  }
});

// Start the server
app.listen(5005, () => console.log("My first app listening on port 5005!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
