const express = require("express");
const logger = require("morgan");

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION

const mongoose = require("mongoose");

const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Conectados a MongoDB.");
  })
  .catch((error) => {
    console.log(error);
  });

const Recipe = require("./models/Recipe.model");

// ROUTES
//  GET  / route - This is just an example route
app.get("/", (req, res) => {
  res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route

app.post("/recipes", async (req, res) => {
  console.log("ruta funcionando");

  const recipe = await Recipe.create({
    title: req.body.title,
    instructions: req.body.instructions,
    level: req.body.level,
    ingredients: req.body.ingredients,
    image: req.body.image,
    duration: req.body.duration,
    isArchived: req.body.isArchived,
    created: req.body.created,
  });

  try {
    res.send("Receta creada correctamente.", recipe);
  } catch (error) {
    console.log(error);
  }
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route

app.get("/recipes", async (req, res) => {
  //console.log("ruta get funcionando")
  try {
    const response = await Recipe.find();
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route

app.get("/recipes/:recipeId", async (req, res) => {
  // console.log("viendo receta")
  try {
    const response = await Recipe.findById(req.params.recipeId);
    res.send("todo ok, viendo receta", response);
  } catch (error) {
    console.log(error);
  }
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route

app.put("/recipes/:recipeId", async (req, res) => {
  try {
    const updated = await Recipe.findByIdAndUpdate(
      req.params.recipeId,
      req.body,
      { new: true }
    );
    res.status(200).json(updated);
  } catch (error) {
    console.log(error);
  }
});
//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route

app.delete("recipes/:recipeId", async (req, res) => {
  try {
    const deleted = await Recipe.findByIdAndDelete(req.params.recipeId);
    res.send("todo ok, eliminando documento", deleted);
  } catch (error) {
    console.log(error);
  }
});
// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
