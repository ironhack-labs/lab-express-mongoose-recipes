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



// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//iteration 2

app.post("/recipes", (req, res) => {
  Recipe.create(req.body)
    .then((createdRecipe) => {
      res.status(201).json(createdRecipe);
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error creating recipe",
        error,
      });
    });
});





//  Iteration 3 - Create a Recipe route
//  POST  /recipes route


//  Iteration 4 - Get All Recipes
//  GET  /recipes route


//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route


//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route


//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route







const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";


mongoose
  .connect(MONGODB_URI)
  .then((x) =>
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    )
  )
  .catch((err) => console.error("Error connecting to mongo", err));






//get

app.get("/recipes", (req, res) => {
  Recipe.find()
    .then((recipes) => {
      res.status(200).json(recipes);
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error fetching recipes",
        error,
      });
    });
});



app.get("/recipes/:id", (req, res) => {
  const { id } = req.params;

  Recipe.findById(id)
    .then((recipe) => {
      res.status(200).json(recipe);
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error fetching recipe",
        error,
      });
    });
});


app.put("/recipes/:id", (req, res) => {
  const { id } = req.params;

  Recipe.findByIdAndUpdate(id, req.body, { new: true })
    .then((updatedRecipe) => {
      res.status(200).json(updatedRecipe);
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error updating recipe",
        error,
      });
    });
});



app.delete("/recipes/:id", (req, res) => {
  const { id } = req.params;

  Recipe.findByIdAndDelete(id)
    .then(() => {
      res.status(204).send();
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error deleting recipe",
        error,
      });
    });
});







// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
