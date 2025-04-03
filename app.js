const express = require("express");
const logger = require("morgan");
const mongoose = require('mongoose');
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
app.post('/recipes', (req, res) => {
  Recipe.create(req.body)
    .then((createdRecipe) => {
      console.log("Rafa it Works", createdRecipe);
      res.status(201).json(createdRecipe);
    })
    .catch((err) => {
      res.status(500).json({errorMessage:'Rafa it isnt working'});
    });
});
  

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
const Rec = require('./models/Recipe.model');

app.get('/recipes', (req, res) => {
  Recipes.find()
  .then((allRecipes) => {
    console.log("Rafa it works", allRecipes);
    res.status(200).json(allRecipes);
  })
  .catch ((err) => {
    res.status(500).json({errorMessage: 'Rafa it isnt working'});
  });
});


//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route

app.get('/recipes/:id', (req, res) => {
  Recipe.findById(req.params.id)
  .then((oneRecipe) => {
    console.log('OK', oneRecipe);
    res.status(200).json(oneRecipe);
  })
  .catch((error) => {
    console.log('NOT OK');
    res.status(500).json({Error: 'NOT OK'});
  });
});


//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route

app.put('/recipe/:id', (req, res)  => {
  Recipe.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then((updatedRecipe) => {
    
    console.log('Updated Ok', updatedRecipe);
    res.status(200).json(updatedRecipe);
  })
  .catch((Error) => {
    console.log('Not Ok');
    res.status(500).json({Alert: 'Not Ok'})
  });
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete('/recipes/:id', (req, res) => {
  Recipe.findByIdAndDelete(req.params.id)
  .then((deletedRecipe) => {
    console.log('Ok', deletedRecipe);
    res.status(204).json(deletedRecipe);
  })
  .catch((Error) => {
    console.log('Not OK');
    res.status(500).json({Alert: 'Not OK'});
  });
});


// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
