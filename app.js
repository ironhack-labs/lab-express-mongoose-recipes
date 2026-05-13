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

const MONGO_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log('Connected to Mongo!');
    })
    .catch((err) => {
        console.error("Error connecting to mongo: ", err);
    });


// ROUTES

const Recipe = require("./models/Recipe.model.js")
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route

app.post("recipes", (req, res) => {
    Recipe.create({
        title: req.body.title,
        instructions: req.body.instructions,
        level: req.body.level,
        ingredients: req.body.ingredients,
        image: req.body.image,
        duration: req.body.duration,
        isArchived: req.body.isArchived,
        created: req.body.created,
    })
    Recipe.create(newRecipe)
        .then(() => {
            res.send("recipe created")
        })
        .catch((error) => {
            console.log(error)
        })
})

//  Iteration 4 - Get All Recipes
//  GET  /recipes route

app.get("/recipes", async (req, res) => {
 try{
  const response = await Recipe.find()
  console.log(response)
 res.json(response)
 } catch (error) {
  console.log(error)
 }
})
//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:recipeId", async (req, res) => {
 try{
  const response = await Recipe.findById(req.params.recipeId)
  console.log(response)
 res.json(response)
 } catch (error) {
  console.log(error)
 }
})

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/api/recipes/:recipeId", async (req, res, next) => {

  console.log(req.params)
  console.log(req.body)

  try{

const updatedRecipe = {
    title: req.body.title,
        instructions: req.body.instructions,
        level: req.body.level,
        ingredients: req.body.ingredients,
        image: req.body.image,
        duration: req.body.duration,
        isArchived: req.body.isArchived,
 
}
const response = await Student.findByIdAndUpdate(req.params.recipeId, updatedRecipe)

  res.send("recipe updated")
  } catch (error) {
    console.log(error)
  }
})

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route

app.delete("/api/recipes", async (req, res) => {
 try{
  const response = await Cohort.findByIdAndDelete(req.params.recipeId)
  console.log(response)
 res.json(response)
 } catch (error) {
  console.log(error)
 }
})

// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
