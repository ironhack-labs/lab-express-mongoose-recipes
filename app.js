const express = require("express");
const logger = require("morgan");

const mongoose = require("mongoose");
const Recipe  = require("./models/Recipe.model")
const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
const MONGODB_URL = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

mongoose.connect(MONGODB_URL)
.then((mongoDBConnect) => console.log(`MongoDB is connected! Database bame is ${mongoDBConnect.connections[0].name}`))
.catch((error) => console.log("Error connecting to mongo ", error))
// ROUTES
//  GET  / route - This is just an example route
app.get("/", (req, res) => {
  res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipes", (req, res) => {
    Recipe.create(req.body)
    .then((createdRecipe) => {
        console.log(`Recipe created =>`, createdRecipe)
        res.status(201).json({message: "The recipe is created"})
    }).catch((error) => {
        console.error('Error while creating the recipe', error)
        res.status(500).json({ message: 'Error while creating the recipe' })
    })
})

//  Iteration 4 - Get All Recipes
//  GET  /recipes route

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route

// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
