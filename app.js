const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const Recipe = require('./models/Recipe.model')

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
app.post("/recipes", (req, res) => {

 Recipe.create({
    title: req.body.title,
    instructions: req.body.instructions,
    level: req.body.level,
    ingredients: req.body.ingredients, 
    image: req.body.image,
    duration: req.body.duration,
    isArchived: req.body.isArchived,
    created: req.body.created
})
.then((createdRecipe) => {
    res.status(201).json(createdRecipe)
    console.log("recipe created, congrats")
})
.catch((error) => {
    res.status(500).json({message: "error creating recipe", error})
})
})


//  Iteration 4 - Get All Recipes
app.get("/", (req, res) => {
Recipe.find()
.then((allRecipes) => {
    res.status(201).json(allRecipes)
})
.catch((error) => {
    res.status(500).json({ message: "Error fetching", error})
})
})


//  Iteration 5 - Get a Single Recipe
app.get('/recipes/:id', (req, res) => {
    Recipe.findById(req.params.id, req.body, {new: true})
    .then((recipe) => {
        res.status(201).json(recipe)
    })
    .catch((error) => {
        res.status(500).json({ message: "error getting specific recipe"})
    })
})

//  Iteration 6 - Update a Single Recipe
app.put('/recipes/:id', (req, res) => {
    Recipe.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then((updatedR) => {
        res.status(201).json(updatedR)
    })
    .catch((error) => {
        res.status(500).json({ message: "error updating recipe"})
    })
})


//  Iteration 7 - Delete a Single Recipe
app.delete('recipes/:id', (req, res) => {
    Recipe.delete(req.params.id)
    .then(() => {
        res.status(201).send()
    })
    .catch((error) => {
        res.status(500).json({message: "recipe not deleted.error.", error})
    })
})



// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
