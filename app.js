const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
//import Recipe from "./models/Recipe.model.js";

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
  .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to mongo", err));

// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route

async function createRecipes(req, res){
  try {
    const {
    title,
    instructions,
    level,
    ingredients,
    image,
    duration,
    created,
    isArchived,
    } = req.body
  
    
    res.status(201).json(created)
  } catch (error) {
    console.log(error)
  } 
}




//  Iteration 4 - Get All Recipes
//  GET  /recipes route

async function getAllRecipes(req, res){
  try {
    const recipes = await Recipe.find()
    res.status(200).json(recipes)
  } catch (error) {
    console.log(error)
  }
}
//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route

async function getRecipeById(req, res){
  try {
    const { id } = req.params
    const recipe = await Recipe.findById(id)

    if (!recipe) {
        res.status(500).json({ message: "Recipe not found" })
    }

    res.status(200).json(recipe)
  } catch (error) {
    console.log(error)
  }
}

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route

async function updateRecipeById(req, res){
  try {
    const { id } = req.params
    const updatedRecipe = await Recipe.findByIdAndUpdate(id, req.body, { new: true })

    if (!updatedRecipe) {
        res.status(500).json({ message: "Recipe not found" })
    }

    res.status(200).json(updatedRecipe)
  } catch (error) {
    console.log(error)
  }
}

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route

async function deleteRecipeById(req, res){
  try {
    const { id } = req.params
    const deletedRecipe = await Recipe.findByIdAndDelete(id)

    if (!deletedRecipe) {
        res.status(500).json({ message: "Recipe not found" })
    }

    res.status(200).json({ message: "Recipe deleted successfully" })
  } catch (error) {
    console.log(error)
  }
} 

 //export { createRecipes, getAllRecipes, getRecipeById, updateRecipeById, deleteRecipeById };


// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
