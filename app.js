
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const recipeModel = require('./models/Recipe.model.js');

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
app.post('/recipes', async (req, res) => {
    
    const recipes = await recipeModel.create({
        title: req.body.title,
        instructions: req.body.instructions,
        level: req.body.level,
        ingredients: req.body.ingredients,
        image: req.body.image,
        duration: req.body.duration,
        isArchived: req.body.isArchived,
        created: req.body.created
    });

    if (!recipes) {
        res.status(500).json({error: 'Internal server error'});
        return;
    }

    res.status(201).json(recipes);
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get('/recipes', async (req, res) => {

    const recipes = await recipeModel.find();

    if (!recipes) {
        res.status(500).json({error: 'Internal server error'});
        return;
    }

    res.status(200).json(recipes);
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get('/recipes/:id', async (req, res) => {

    const recipe = await recipeModel.findById(req.params.id);

    if (!recipe) {
        res.status(500).json({error: 'Internal server error'});
    }

    res.status(200).json(recipe);
});


//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put('/recipes/:id', async (req, res) => {
    
    const recipe = await recipeModel.findByIdAndUpdate(req.params.id, req.body, { new: true});

    if (!recipe) {
        res.status(500).json({error: 'Internal server error'});
    }

    res.status(200).json(recipe);
});


//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete('/recipes/:id', async (req, res) => {

    const recipe = await recipeModel.findByIdAndDelete(req.params.id);

    if (!recipe) {
        res.status(500).json({error: 'Internal error server'});
    }

    res.status(204).send();
});



// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
